import ApiBase from './base'

class Account {
  constructor(connection) {
    this.connection = connection
  }

  create(xpubs, quorum, alias) {
    this.connection.request('/create-account', {
      root_xpubs: xpubs,
      quorum,
      alias
    })
  }

  listAccounts(id) {
    this.connection.request('/list-accounts', {id})
  }

  createReceiverById(accountId) {
    this.connection.request('/create-account-receiver', {
      account_id: accountId
    })
  }

  listAddressesById(accountId) {
    this.connection.request('/list-addresses', {
      account_id: accountId
    })
  }

  deleteById(id) {
    this.connection.request('/delete-account', {
      account_info: id
    })
  }
}

export default Account
