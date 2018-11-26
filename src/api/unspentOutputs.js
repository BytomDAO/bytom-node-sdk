/**
 * Each new transaction in the blockchain consumes some unspent outputs and
 * creates others. An output is considered unspent when it has not yet been used
 * as an input to a new transaction. All asset units on a blockchain exist in
 * the unspent output set.
 *
 * @typedef {Object} UnspentOutput
 * @global
 *
 * @property {String} account_alias
 * The alias of the account transferring the asset (possibly null).
 *
 * @property {String} account_id
 * The id of the account transferring the asset (possibly null).
 *
 * @property {String} address
 * The output address.
 *
 * @property {String} id
 * Unique transaction identifier.
 *
 * @property {Number} amount
 * The number of units of the asset being issued or spent.
 *
 * @property {String} asset_alias
 * The alias of the asset being issued or spent (possibly null).
 *
 * @property {String} asset_id
 * The id of the asset being issued or spent.
 *
 * @property {Number} source_pos
 * The output's position in a transaction's list of outputs.
 *
 * @property {Boolean} change
 * Whether this output is asset change of one spend.
 *
 * @property {Number} control_program_index
 * Control program index.
 *
 * @property {String} program
 * The control program which must be satisfied to transfer this output.
 *
 * @property {String} source_id
 * The source unspent output id.
 *
 * @property {Number} valid_height
 * It means coinbase utxo if valid_height > 0.
 */

/**
 * API for interacting with {@link UnspentOutput unspent outputs}.
 *
 * @module UnspentOutputsApi
 */
const unspentOutputsAPI = (connection) => {
  return {
    /**
     * Get all unspent outputs.
     * @returns {Promise<Array<UnspentOutput>>} Target unspent outputs.
     */
    listAll: () => connection.request('/list-unspent-outputs', {}),

    /**
     * Get target unspent outputs.
     *
     * @param {Object} params - Filter and pagination information.
     * @param {String} params.id - Unspent output id.
     * @param {Boolean} params.unconfirmed is include unconfirmed utxo
     * @param {Boolean} params.smart_contract is contract utxo
     * @param {Integer} params.from the start position of first utxo
     * @param {Integer} params.count the number of returned
     * @param {String} params.account_id account id.
     * @param {String} params.account_alias name of account.
     * @returns {Promise<Array<UnspentOutput>>} Target unspent outputs.
     */
    list: (params) => connection.request('list-unspent-outputs', params)
  }
}

export default unspentOutputsAPI
