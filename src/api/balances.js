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
     * Get asset balances by account.
     *
     * @param {Object} params={} - Filter and pagination information.
     * @param {String} params.account_id, account id.
     * @param {String} params.account_alias, name of account.
     * @returns {Promise<Array<Balance>>} The result balances.
     */
    list: (params) => connection.request('/list-balances', params),

    /**
     * List all assets Balances in one Bytom node.
     *
     * @returns {Promise<Array<Balance>>} The result balances.
     */
    listAll: () => connection.request('/list-balances', {})
  }
}

export default balancesApi
