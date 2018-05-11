import ApiBase from './base'

/**
 * An account is an object in Bytom that tracks ownership of assets on a
 * blockchain.
 *
 * @typedef {Object} Account
 * @global
 *
 * @property {String} id
 * Unique account identifier in one Bytom node.
 *
 * @property {String} alias
 * User specified, unique identifier in one Bytom node.
 *
 * @property {Key[]} keys
 * The list of keys used to create control programs under the account.
 * Signatures from these keys are required for spending funds held in the account.
 *
 * @property {Number} quorum
 * The number of keys required to sign transactions for the account.
 *
 */

/**
 * API for interacting with {@link Account accounts}.
 *
 * @module AccountsApi
 */
class AccountsApi {
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

export default AccountsApi
