# Bytom Node.js SDK

## Terminology

### [Keys](https://bytom.github.io/node-sdk/global.html#Key__anchor)

Cryptographic keys are the primary authorization mechanism on a blockchain.

To create accounts or assets, xpub of keys are required. With this sdk, we can
`create/delete/list/resetPassword` the key. Please check the 
[API doc](https://bytom.github.io/node-sdk/module-KeysApi.html) if you want
to operate with keys.

### [Account](https://bytom.github.io/node-sdk/global.html#Account__anchor)

An account is an object in Bytom that tracks ownership of assets on a blockchain. 
It's defined under one Bytom node created with one or serveral keys.  

[Related API](https://bytom.github.io/node-sdk/module-AccountsApi.html)

### [Asset](https://bytom.github.io/node-sdk/global.html#Asset__anchor)

An asset is a type of value that can be issued on a blockchain. All units of
a given asset are fungible. Units of an asset can be transacted directly
between parties without the involvement of the issuer.

[Related API](https://bytom.github.io/node-sdk/module-AssetsApi.html)

### [Transaction](https://bytom.github.io/node-sdk/global.html#Transaction__anchor)

Blockchain is chain of blocks, while block consists of numbers of transactions.

[Related API](https://bytom.github.io/node-sdk/module-TransactionsApi.html)

### [Unspent Output(UTXO)](https://bytom.github.io/node-sdk/global.html#UnspentOutput__anchor)

Bytom is UTXO based blockchain. One transaction spend some UTXOs, and produces new UTXOs.

[Related API](https://bytom.github.io/node-sdk/module-UnspentOutputsApi.html)

### [Balance](https://bytom.github.io/node-sdk/global.html#Balance__anchor)

Any balance on the blockchain is simply a summation of UTXOs. In one bytomd, balance means
summation of UTXOs of one account.

[Related API](https://bytom.github.io/node-sdk/module-BalancesApi.html)

## Usage

### In your code

```javascript
const bytom = require('bytom-sdk')
const url = 'http://localhost:9888'

// access token is required when client is not in same origin
// with the request bytom node
const accessToken = ''

const client = new bytom.Client(url, accessToken)
```

## Interaction with bytom

We will walk you through the process to issue some assets.

### Step 1: create a key

```javascript
const keyPromise = client.keys.create('alias', 'password')
```

It will create a key whose alias is 'alias' while password is 'password'.

### Step 2: create a account

```javascript
const accountPromise = keyPromise.then(key => {
 client.accounts.create([key.xpub], 1, 'account')
})
```

### Step 3: create account address

const addressPromise = accountPromise.then(account => {
  return client.accounts.createReceiverById(account.id)
})

### Step 4: create asset

```javascript
const definition = {
  name: "GOLD",
  symobol: "GOLD",
  decimals: 8,
  description: {}
}
const assetPromise = keyPromise.then(key => {
  return client.assets.create([key.xpub], 1, 'asset', definition)
})
```

### Step 5: issue asset

#### First, build the transaction

```javascript
const buildPromise = Promise.all([
  accountPromise,
  addressPromise,
  assetPromise]
  ).then(([account, address, asset]) => {
  const issueAction = {
    amount: 10000000000,
    asset_alias: asset.alias,
    type: 'issue'
  }

  const gasAction = {
    type: 'spend_account',
    account_alias: account.alias,
    asset_alias: 'BTM',
    amount: 50000000
  }

  const controlAction = {
    type: 'control_address',
    amount: 10000000000,
    asset_alias: asset.alias,
    address: address.address
  }
  
  return client.transactions.build(null,
  [issueAction, gasAction, controlAction])
})

```

#### Second, sign the transaction

```javascript
const signPromise = buildPromise.then(transactionTemplate => {
  return client.transactions.sign(transactionTemplate, 'password')
})
```

#### Finally, submit the signed transaction to the bytom network

```javascript
signPromise.then(signed => {
  return client.transactions.submit(signed.transaction.raw_transaction)
})
```
