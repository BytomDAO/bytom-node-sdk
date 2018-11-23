/* eslint-env mocha */

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect

const {
  client
} = require('./testHelpers')

describe('Balance', () => {

  describe('list by specific account', () => {
    it('simple example', () =>
      client.balances.list({
        account_alias: 'default',
      }).then(items =>
        expect(items[0].amount).not.to.be.empty
      )
    )
  })

  describe('listAll', () => {
    it('simple example', () => {
      return client.balances.listAll().then((resp) => {
        expect(resp.find(b => b.account_alias == 'default').amount).not.to.be.empty
      })
    })
  })

})