/* eslint-env mocha */

const bytom = require('../dist/index.js')
const uuid = require('uuid')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
const expect = chai.expect

const url = 'http://localhost:9888'
const accessToken = ''

const client = new bytom.Client(url, accessToken)

function createToken() {
  return client.accessTokens.create({
    id: `token-${uuid.v4()}`
  })
}

describe('Access token', () => {

  it('creation successful', () => {
    return client.accessTokens.create({
      id: `another-${uuid.v4()}`
    }).then(resp => expect(resp.token).not.to.be.empty)
  })

  it('creation rejected due to duplicate ID', () => {
    return createToken()
      .then((token) => expect(client.accessTokens.create({
        id: token.id
      })).to.be.rejectedWith('BTM000'))
  })

  it('returned in list after creation', () => {
    let tokenId
    return createToken()
      .then((token) => {
        tokenId = token.id
        return client.accessTokens.listAll()
      })
      .then(resp => expect(resp.map(item => item.id)).to.contain(tokenId))
  })

  it('deletion successful', () => {
    return createToken()
      .then((token) => client.accessTokens.delete(token.id))
      .then(resp => expect(resp).to.be.empty)
  })

  it('deletion rejected due to missing ID', () => {
    return createToken()
      .then(() => expect(client.accessTokens.delete())
        .to.be.rejectedWith('BTM000'))
  })

  it('removed from list after deletion', () => {
    let tokenId
    return createToken()
      .then((token) => {
        tokenId = token.id
        return client.accessTokens.delete(tokenId)
      })
      .then(() => client.accessTokens.listAll())
      .then(resp => expect(resp.map(item => item.id)).to.not.contain(tokenId))
  })

})