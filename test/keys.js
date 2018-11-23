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

const keyAlias = `key-${uuid.v4()}`
const password = '12345'

let keyXpub

before('set up API objects', () => {

  // Key creation
  return client.keys.create({
    alias: keyAlias,
    password: password,
  })
    .then((resp)=>{
      keyXpub = resp.xpub
    })
})

describe('key', () => {

  it('successfully creates key', () => {
    return client.keys.create({
      alias: `key-${uuid.v4()}`,
      password: password,
    })
      .then((resp) => expect(resp).not.to.be.empty)
  })

  it('rejects key creation due to duplicate alias', () => {
    return expect(client.keys.create({ alias: keyAlias, password: password })).to.be.rejectedWith('BTM800')
  })

  it('returns key in list after key creation, listAll', () => {
    let keyAlias
    return client.keys.create({ alias: `key-${uuid.v4()}` , password: password })
      .then((key) => {
        keyAlias = key.alias
        return client.keys.listAll()
      })
      .then(resp => {
        return expect(resp.map(item => item.alias)).to.contain(keyAlias)
      })
  })

  describe('password', () => {
    it('successfully check correct password', () => {
      return client.keys.checkPassword({
          xpub: keyXpub,
          password:password
        })
      .then((resp) => {
        expect(resp.check_result).to.be.true
      })
    })

    it('successfully check password wrong', () => {
      return client.keys.checkPassword({
        xpub: keyXpub,
        password:'random'
      })
        .then((resp) => {
          expect(resp.check_result).to.be.false
        })
    })

    it('successfully reset password', () => {
      const newPassword = '11111'
      return client.keys.resetPassword({
        xpub: keyXpub,
        old_password: password,
        new_password: newPassword
      })
        .then((resp) => {
          expect(resp.changed).to.be.true
        })
    })



  })

})