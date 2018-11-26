/* eslint-env mocha */

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect

const {
  client,
} = require('./testHelpers')

describe('Unspent output', () => {

  describe('listAll', () => {
    it('simple example', () => {
      return client.unspentOutputs.listAll().then((resp) => {
        expect(resp).not.to.be.empty
      })
    })
  })

})