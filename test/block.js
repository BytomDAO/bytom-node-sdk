/* eslint-env mocha */

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect

const {
  client
} = require('./testHelpers')

describe('Block', () => {

  describe('block count', () => {
    it('simple example', () =>
      client.block.getBlockCount()
        .then(items =>
          expect(items.block_count).not.to.be.empty
        )
    )
  })

  describe('block hash', () => {
    it('simple example', () => {
      return client.block.getBlockHash()
        .then((resp) => {
          expect(resp.block_hash).not.to.be.empty
        })
    })
  })

  describe('get Block', () => {
    it('simple example', () => {
      let blockHash
      return client.block.getBlockHash()
        .then((resp) => {
          blockHash = resp.block_hash
          return client.block.getBlock({block_hash: resp.block_hash})
        })
        .then((resp) =>
          expect(resp.hash).to.equal(blockHash)
        )
    })
  })

  describe('get Block Header', () => {
    it('simple example', () => {
      let blockHash
      return client.block.getBlockHash()
        .then((resp) => {
          blockHash = resp.block_hash
          return client.block.getBlockHeader({block_hash: resp.block_hash})
        })
        .then((resp) =>
          expect(resp.block_header).not.to.be.empty
        )
    })
  })

  describe('get Difficulty', () => {
    it('simple example', () => {
      let blockHash
      return client.block.getBlockHash()
        .then((resp) => {
          blockHash = resp.block_hash
          return client.block.getDifficulty({block_hash: resp.block_hash})
        })
        .then((resp) =>
          expect(resp.hash).to.equal(blockHash)
        )
    })
  })

  describe('get Hash Rate', () => {
    it('simple example', () => {
      let blockHash
      return client.block.getBlockHash()
        .then((resp) => {
          blockHash = resp.block_hash
          return client.block.getHashRate({block_hash: resp.block_hash})
        })
        .then((resp) =>
          expect(resp.hash).to.equal(blockHash)
        )
    })
  })
})