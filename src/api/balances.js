/**
 * Any balance on the blockchain is simply a summation of unspent outputs.
 *
 * @typedef {Object} Balance
 * @global
 *
 * @property {Number} amount
 * Sum of the unspent outputs.
 *
 * @property {String} account_alias
 * Account alias.
 *
 * @property {String} account_id
 * Account id.
 *
 * @property {String} asset_id
 * Asset id.
 *
 * @property {String} asset_alias
 * Asset alias.
 *
 * @property {Object} asset_definition
 * Asset definition
 */

/**
 * API for interacting with {@link Balance balances}.
 *
 * @module BalancesApi
 */
const balancesApi = (connection) => {
  return {
    /**
     * Get all asset balances of all accounts.
     *
     * @returns {Promise<Array<Balance>>} The result balances.
     */
    list: () => connection.request('/list-balances', {})
  }
}

export default balancesApi
