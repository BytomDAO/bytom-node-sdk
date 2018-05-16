# Bytom Node.js SDK

## Terminology

### Keys

Cryptographic keys are the primary authorization mechanism on a blockchain.

### Account

An account is an object in Bytom that tracks ownership of assets on a blockchain. 
It's defined under one Bytom node created with one or serveral keys.

### Asset

An asset is a type of value that can be issued on a blockchain. All units of
a given asset are fungible. Units of an asset can be transacted directly
between parties without the involvement of the issuer.

### Transaction

Blockchain is chain of blocks, while block consists of numbers of transactions.

### Unspent Output(UTXO)

Bytom is UTXO based blockchain. One transaction spend some UTXOs, and produces new UTXOs.

### Balance

Any balance on the blockchain is simply a summation of UTXOs. In one bytomd, balance means
summation of UTXOs of one account.

## Usage

### In your code

```
const bytom = require('bytom-sdk')
const url = 'http://localhost:9888'

const client = new bytom.Client(url)
```

## Interaction with bytom

### Acount

```javascript
client.account.listAccounts().then(resp => {
  console.log(resp.data)
})
```
