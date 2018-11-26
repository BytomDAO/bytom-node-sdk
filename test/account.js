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

const xAccountAlias = `x-${uuid.v4()}`
const yAccountAlias = `y-${uuid.v4()}`

let mockHsmKey

describe('Account', () => {

  before('set up API objects', () => {

    // Key and account creation
    return client.keys.listAll()
      .then(keys => { mockHsmKey = keys[0] })
      .then(() => {
        return client.accounts.create({alias: xAccountAlias, root_xpubs: [mockHsmKey.xpub], quorum: 1 })
      })
      .then(() => {
        return client.accounts.create({alias: yAccountAlias, root_xpubs: [mockHsmKey.xpub], quorum: 1})
      })
  })

  describe('Single account creation', () => {

    it('successful', () => {
      return client.accounts.create({alias: `alice-${uuid.v4()}`, root_xpubs: [mockHsmKey.xpub], quorum: 1})
        .then(resp => expect(resp.id).not.to.be.empty)
    })

    it('rejected due to missing key fields', () => {
      return expect(client.accounts.create({alias: 'david'})).to.be.rejectedWith('BTM202')
    })
  })

  describe('Single account alias update', () => {

    it('successful', () => {
      const newAlias = `alice-${uuid.v4()}`
      return client.accounts.updateAlias({
        account_alias: xAccountAlias,
        new_alias: newAlias
      })
        .then(() => {
          return client.accounts.list({
            alias: newAlias
          })
        })
        .then(resp => expect(resp[0].alias).to.include(newAlias))
    })

    it('rejected due to missing ID/Alias', () => {
      return expect(
        client.accounts.updateAlias({
          // ID/Alias intentionally omitted
          new_alias: 'new'
        })
      ).to.be.rejectedWith('BTM709')
    })
  })


  describe('Delete Account', () => {

    it('successful', () => {
      const alias = `alice-${uuid.v4()}`
      return client.accounts.create({alias: alias, root_xpubs: [mockHsmKey.xpub], quorum: 1})
        .then(() =>{
          return client.accounts.delete({
            account_alias: alias
          })
        })
        .then(resp => expect(resp).to.be.empty)
    })
  })

  describe('Account Receiver', () => {

    it('created Account Reciever', () => {
      return client.accounts.create({alias: xAccountAlias, root_xpubs: [mockHsmKey.xpub], quorum: 1})
        .then(() =>{
          return client.accounts.createReceiver({account_alias: xAccountAlias})
        })
        .then(resp => expect(resp.address).to.not.be.empty)
    })

    it('list Account Reciever by alias', () => {
      let address
      const alias = `connie-${uuid.v4()}`

      return client.accounts.create({alias: alias, root_xpubs: [mockHsmKey.xpub], quorum: 1})
        .then(() =>{
          return client.accounts.createReceiver({account_alias: alias})
        })
        .then((resp) =>{
          address = resp.address
          return client.accounts.listAddresses({
            account_alias: alias
          })
        })
        .then(resp =>
          expect(resp.map(item => item.address)).to.include(address)
        )
    })

    it('list Account Reciever by Id', () => {
      let address, id
      const alias = `connie-${uuid.v4()}`

      return client.accounts.create({alias: alias, root_xpubs: [mockHsmKey.xpub], quorum: 1})
        .then((resp) =>{
          id = resp.id
          return client.accounts.createReceiver({account_id: id})
        })
        .then((resp) =>{
          address = resp.address
          return client.accounts.listAddresses({
            account_id: id
          })
        })
        .then(resp =>
          expect(resp.map(item => item.address)).to.include(address)
        )
    })

  })

  describe('list All Account', () => {
    it('success example', () => {
      let created

      return client.accounts.create({
        alias: `bob-${uuid.v4()}`,
        root_xpubs: [mockHsmKey.xpub],
        quorum: 1
      }).then(account =>
        created = account.id
      ).then(() =>
        client.accounts.listAll()
      ).then((resp) =>
        expect(resp.map(item => item.id)).to.include(created)
      )
    })
  })

})