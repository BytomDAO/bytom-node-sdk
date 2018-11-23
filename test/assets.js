/* eslint-env mocha */

const bytom = require('../dist/index.js')
const uuid = require('uuid')
const chai = require('chai')
const assert = require('assert')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
const expect = chai.expect

const url = 'http://localhost:9888'
const accessToken = ''

const client = new bytom.Client(url, accessToken)

const xAssetAlias = `x-${uuid.v4()}`
const yAssetAlias = `y-${uuid.v4()}`

let mockHsmKey, xAssetId, yAssetId

describe('Asset', () => {

  before('set up API objects', () => {

    // Key and asset creation
    return client.keys.listAll()
      .then(keys => { mockHsmKey = keys[0] })
      .then(() => {
        return client.assets.create(
          {
            alias: xAssetAlias,
            definition: {
              decimals: 8,
              description: {},
              name: "TESTASSET1",
              symbol: "TESTASSET1"
            },
            root_xpubs: [mockHsmKey.xpub],
            quorum: 1}
            )
          .then((resp)=>{
            xAssetId = resp.id
          })
      })
      .then(() => {
        return client.assets.create({
          alias: yAssetAlias,
          definition: {
            decimals: 8,
            description: {},
            name: "TESTASSET2",
            symbol: "TESTASSET2"
          },
          root_xpubs: [mockHsmKey.xpub],
          quorum: 1})
          .then((resp)=>{
            yAssetId = resp.id
          })
      })
  })

  describe('Single asset creation', () => {

    it('successful', () => {
      return client.assets.create({
        alias: `asset-${uuid.v4()}`,
        definition: {
          decimals: 8,
          description: {},
          name: `TESTASSET-${uuid.v4()}`,
          symbol: `TESTASSET-${uuid.v4()}`
        },
        root_xpubs: [mockHsmKey.xpub],
        quorum: 1})
        .then(resp => expect(resp.id).not.to.be.empty)
    })

    it('rejected due to missing key fields', () => {
      return expect(client.assets.create({alias: 'asset'})).to.be.rejectedWith('BTM202')
    })
  })


  describe('Single asset alias update', () => {

    it('successful', () => {
      const alias = `asset-${uuid.v4()}`
      return client.assets.updateAlias({
        id: xAssetId,
        alias: alias
      })
        .then(() => {
          return client.assets.list(xAssetId)
        })
        .then(page => {
          assert.deepEqual(page.alias, alias.toUpperCase())
        })
    })

    it('rejected due to missing ID/Alias', () => {
      return expect(
        client.assets.updateAlias({
          // ID/Alias intentionally omitted
          alias: `asset-${uuid.v4()}`,
        })
      ).to.be.rejectedWith('BTM000')
    })
  })

  describe('listAll', () => {
    it('success example', () => {
      return client.assets.listAll()
      .then((resp) => {
        expect(resp.map(item => item.alias)).to.be.an('array').that.include(yAssetAlias.toUpperCase())
      })
    })

    it('list success', () => {
      return client.assets.list(xAssetId)
      .then(page => {
        assert.deepEqual(page.id, xAssetId)
      })
    })
  })
})