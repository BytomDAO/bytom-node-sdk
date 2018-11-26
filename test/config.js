/* eslint-env mocha */

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect

const {
  client
} = require('./testHelpers')

describe('Core Status', () => {

  describe('gasRate', () => {
    it('simple example', () =>
      client.status.gasRate()
        .then(items =>
        expect(items.gas_rate).not.to.be.empty
      )
    )
  })

  describe('netInfo', () => {
    it('simple example', () => {
      return client.status.netInfo()
        .then((resp) => {
        expect(resp).not.to.be.empty
      })
    })
  })

})