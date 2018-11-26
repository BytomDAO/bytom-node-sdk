const bytom = require('../dist/index.js')
const uuid = require('uuid')
const url = 'http://localhost:9888'
const accessToken = ''

const client = new bytom.Client(url, accessToken)

const balanceByAssetAlias = (balances) => {
  let res = {}
  return Promise.resolve(balances)
    .then((balance) => {
      balance.forEach((item) => {
        res[item.sumBy.assetAlias] = item.amount
      })
      return res
    })
}

const createAccount = (account = 'account') => {
  return client.keys.listAll()
    .then((keys) => {
      return client.accounts.create({
        alias: `${account}-${uuid.v4()}`,
        root_xpubs: [keys[0].xpub],
        quorum: 1
      })
    })
}

const createAccountReciever = (accountAlias = 'account') => {
  return client.accounts.createReceiver({
    account_alias: accountAlias
  })
}

const createAsset = (asset = 'asset') => {
  return client.keys.listAll()
    .then((keys) => {
      return client.assets.create({
        alias: `${asset}-${uuid.v4()}`,
        definition: {
          decimals: 8,
          description: {},
          name: `${asset}-${uuid.v4()}`,
          symbol: `${asset}-${uuid.v4()}`
        },
        root_xpubs: [keys[0].xpub],
        quorum: 1
      })
    })
}

const buildSignSubmit = (buildFunc, optClient, password) => {
  const c = optClient || client
  return c.transactions.build(buildFunc)
    .then(tpl => c.transactions.sign({
      transaction: tpl,
      password
    }))
    .then(tpl => c.transactions.submit(tpl.transaction.raw_transaction))
}

module.exports = {
  // balanceByAssetAlias,
  client,
  createAccount,
  createAsset,
  createAccountReciever,
  buildSignSubmit,
}