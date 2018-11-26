
/* eslint-env mocha */

const assert = require('assert')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
const expect = chai.expect

const { balanceByAssetAlias, client, createAccount, createAsset, createAccountReciever } = require('./testHelpers')

const btmAlias = 'BTM'

describe('Transaction', () => {
  describe('Transfer btm', () => {
    let aliceAlias, bobAlias, aliceAddress, bobAddress, txId

    before(() => {
      return Promise.all([
        createAccount('alice'),
        createAccount('bob')
      ])
        .then((objects) => {
          aliceAlias = objects[0].alias
          bobAlias = objects[1].alias
          return Promise.all([
            createAccountReciever(aliceAlias),
            createAccountReciever(bobAlias)
          ])
        })
        .then((objects) => {
          aliceAddress = objects[0].address
          bobAddress = objects[1].address
        })
        .then(() => client.transactions.build(builder => {
          builder.spendFromAccount({
            account_alias: 'default',
            asset_alias: btmAlias,
            amount: 310000000
          })
          builder.controlWithAddress({
            address: aliceAddress,
            asset_alias: btmAlias,
            amount: 100000000
          })
          builder.controlWithAddress({
            address: bobAddress,
            asset_alias: btmAlias,
            amount: 200000000
          })
        }))
        .then((issuance) =>{
          return client.transactions.sign({transaction: issuance, password: '12345'})})
        .then((signed) => {
          return client.transactions.submit(signed.transaction.raw_transaction)
        })
        .then((tx) => txId= tx.tx_id)
    })

    it('transfer 1 BTM to alice', () => {
      return client.transactions.list({id: txId, unconfirmed:true})
        .then((resp) => {
          expect(resp[0].outputs.map(item => item.account_alias)).include(aliceAlias)
        })
    })

    it('transfer 1 BTM to bob', () => {
      return client.transactions.list({id: txId, unconfirmed:true})
        .then((resp) => {
          expect(resp[0].outputs.map(item => item.account_alias)).include(bobAlias)
        })
    })
  })

  describe('Issuance', () => {
    let goldAlias, silverAlias, aliceAlias, bobAlias,
      aliceAddress, bobAddress, txId

    before(() => {
      return Promise.all([
        createAsset('gold'),
        createAsset('silver'),
        createAccount('alice'),
        createAccount('bob')
      ])
        .then((objects) => {
          goldAlias = objects[0].alias
          silverAlias = objects[1].alias
          aliceAlias = objects[2].alias
          bobAlias = objects[3].alias
          return Promise.all([
            createAccountReciever(aliceAlias),
            createAccountReciever(bobAlias)
          ])
        })
        .then((objects) => {
          aliceAddress = objects[0].address
          bobAddress = objects[1].address
        })
        .then(() => client.transactions.build(builder => {
          builder.spendFromAccount({
            account_alias: 'default',
            asset_alias: btmAlias,
            amount: 10000000
          })
          builder.issue({
            asset_alias: goldAlias,
            amount: 1000000
          })
          builder.issue({
            asset_alias: silverAlias,
            amount: 2000000
          })
          builder.controlWithAddress({
            address: aliceAddress,
            asset_alias: goldAlias,
            amount: 1000000
          })
          builder.controlWithAddress({
            address: bobAddress,
            asset_alias: silverAlias,
            amount: 2000000
          })
        }))
        .then((issuance) => client.transactions.sign({transaction: issuance, password: '12345'}))
        .then((signed) => client.transactions.submit(signed.transaction.raw_transaction))
        .then((tx) => txId= tx.tx_id)
    })

    it('issues 100 units of gold to alice', () => {
      return client.transactions.list({id: txId, unconfirmed:true})
        .then((resp) => {
          expect(resp[0].outputs.map(item => item.account_alias)).include(aliceAlias)
        })
    })

    it('issues 200 units of silver to bob', () => {
      return client.transactions.list({id: txId, unconfirmed:true})
        .then((resp) => {
          expect(resp[0].outputs.map(item => item.account_alias)).include(bobAlias)
        })
    })
  })



  describe('listAll', () => {
    it('success example', () => {
      let created, accountAlias

      return createAccount().then((account) => {
          accountAlias = account.alias
          return createAccountReciever(accountAlias)
        }
      ).then((resp) =>
        client.transactions.build(builder => {
          builder.spendFromAccount({
            account_alias: 'default',
            asset_alias: btmAlias,
            amount: 100000000
          })
          builder.controlWithAddress({
            address: resp.address,
            asset_alias: btmAlias,
            amount: 90000000
          })
        })
      ).then(txtpl =>
        client.transactions.sign({
          transaction: txtpl,
          password: '12345'
        })
      ).then(signed =>
        client.transactions.submit(signed.transaction.raw_transaction)
      ).then(tx =>
        created = tx.tx_id
      ).then(() =>
        client.transactions.listAll()
      ).then(resp =>{
        expect(resp.map(item => item.tx_id)).to.include(created)
      }
      )
    })
  })

  describe('Builder function errors', () => {
    it('rejects via promise', () =>
      expect(
        client.transactions.build(() => {
          throw new Error("test error")
        })
      ).to.be.rejectedWith("test error")
    )
  })

})