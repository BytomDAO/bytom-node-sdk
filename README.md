# Bytom Node.js SDK

## Terminology

### [Keys](https://bytom.github.io/bytom-node-sdk/global.html#Key__anchor)

Cryptographic keys are the primary authorization mechanism on a blockchain.

To create accounts or assets, xpub of keys are required. With this sdk, we can
`create/delete/listAll/resetPassword/checkPassword` the key. Please check the 
[API doc](https://bytom.github.io/bytom-node-sdk/module-KeysApi.html) if you want
to operate with keys.

### [Account](https://bytom.github.io/bytom-node-sdk/global.html#Account__anchor)

An account is an object in Bytom that tracks ownership of assets on a blockchain. 
It's defined under one Bytom node created with one or serveral keys.  

[Related API](https://bytom.github.io/bytom-node-sdk/module-AccountsApi.html)

### [Asset](https://bytom.github.io/bytom-node-sdk/global.html#Asset__anchor)

An asset is a type of value that can be issued on a blockchain. All units of
a given asset are fungible. Units of an asset can be transacted directly
between parties without the involvement of the issuer.

[Related API](https://bytom.github.io/bytom-node-sdk/module-AssetsApi.html)

### [Transaction](https://bytom.github.io/bytom-node-sdk/global.html#Transaction__anchor)

Blockchain is chain of blocks, while block consists of numbers of transactions.

[Related API](https://bytom.github.io/bytom-node-sdk/module-TransactionsApi.html)

### [Unspent Output(UTXO)](https://bytom.github.io/bytom-node-sdk/global.html#UnspentOutput__anchor)

Bytom is UTXO based blockchain. One transaction spend some UTXOs, and produces new UTXOs.

[Related API](https://bytom.github.io/bytom-node-sdk/module-UnspentOutputsApi.html)

### [Balance](https://bytom.github.io/bytom-node-sdk/global.html#Balance__anchor)

Any balance on the blockchain is simply a summation of UTXOs. In one bytomd, balance means
summation of UTXOs of one account.

[Related API](https://bytom.github.io/bytom-node-sdk/module-BalancesApi.html)

### [Block](https://bytom.github.io/bytom-node-sdk/global.html#Block__anchor)

​	A block is a container data structure that aggregates transactions for inclusion in the public ledger, the blockchain.
 It is made of a header, containing metadata, followed by a long list of transactions that make up the bulk of its size.
  Each block references to the previous block, and all the blocks are linked from the back to the front to grow a blockchain.

[Related API](https://bytom.github.io/bytom-node-sdk/module-BlockApi.html)

### [Config](https://bytom.github.io/bytom-node-sdk/global.html#Config__anchor)

Config contain the network information that you wanted to know.  

[Related API](https://bytom.github.io/bytom-node-sdk/module-ConfigApi.html)

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
const keyPromise = client.keys.create({ 
          alias:'key', 
          password: 'password'
         })
```

It will create a key whose alias is 'alias' while password is 'password'.

### Step 2: create a account

```javascript
const accountPromise = keyPromise.then(key => {
 client.accounts.create({
     alias: 'account', 
     root_xpubs: [key.xpub], 
     quorum: 1 
 })
})
```

### Step 3: create account address

```javascript
const addressPromise = accountPromise.then(account => {
  return client.accounts.createReceiver({
    account_alias: account.alias
  })
})
```

### Step 4: create asset

```javascript
const definition = {
  name: "GOLD",
  symbol: "GOLD",
  decimals: 8,
  description: {}
}

const assetPromise = keyPromise.then(key => {
  return client.assets.create(
    {
     alias: 'asset',
     definition,
     root_xpubs: [key.xpub],
     quorum: 1
    })
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
    amount: 100000000,
    asset_alias: asset.alias,
  }

  const gasAction = {
    account_alias: account.alias,
    asset_alias: 'BTM',
    amount: 50000000
  }

  const controlAction = {
    amount: 100000000,
    asset_alias: asset.alias,
    address: address.address
  }
  
  return client.transactions.build(builder => {
      builder.issue(issueAction)
      builder.spendFromAccount(gasAction)
      builder.controlWithAddress(controlAction)
  })
})

```

#### Second, sign the transaction

```javascript
const signPromise = buildPromise.then(transactionTemplate => {
  return client.transactions.sign({
    transaction: transactionTemplate, 
    password: 'password'
  })
})
```

#### Finally, submit the signed transaction to the bytom network

```javascript
signPromise.then(signed => {
  return client.transactions.submit(signed.transaction.raw_transaction)
})
```
