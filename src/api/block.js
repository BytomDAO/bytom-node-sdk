/**
 * @typedef {Object} BlockInfo
 *
 * @property {String} - hash, hash of block.
 * @property {Integer} - size, size of block.
 * @property {Integer} - version, version of block.
 * @property {Integer} - height, height of block.
 * @property {String} - previous_block_hash, previous block hash.
 * @property {Integer} - timestamp, timestamp of block.
 * @property {Integer} - nonce, nonce value.
 * @property {Integer} - bits, bits of difficulty.
 * @property {String} - difficulty, difficulty value(String type).
 * @property {String} - transaction_merkle_root, merkle root of transaction.
 * @property {String} - transaction_status_hash, merkle root of transaction status.
 * @property {Object[]} - transactions, transaction object:
 *                     {String} - id, transaction id, hash of the transaction.
 *                     {Integer} - version, version of transaction.
 *                     {Integer} - size, size of transaction.
 *                     {Integer} - time_range, the unix timestamp for when the requst was responsed.
 *                     {Boolean} - status_fail, whether the state of the request has failed.
 *                     {String} - mux_id, the previous transaction mux id(source id of utxo).
 * @property {Object[]} - inputs, object of inputs for the transaction.
 *                     {String} - type, the type of input action, available option include: 'spend', 'issue', 'coinbase'.
 *                     {String} - asset_id, asset id.
 *                     {String} - asset_alias, name of asset.
 *                     {Object} - asset_definition, definition of asset(json object).
 *                     {Integer} - amount, amount of asset.
 *                     {Object} - issuance_program, issuance program, it only exist when type is 'issue'.
 *                     {Object} - control_program, control program of account, it only exist when type is 'spend'.
 *                     {String} - address, address of account, it only exist when type is 'spend'.
 *                     {String} - spent_output_id, the front of outputID to be spent in this input, it only exist when type is 'spend'.
 *                     {String} - account_id, account id.
 *                     {String} - account_alias, name of account.
 *                     {Object} - arbitrary, arbitrary infomation can be set by miner, it only exist when type is 'coinbase'.
 *                     {String} - input_id, hash of input action.
 *                     {String[]} - witness_arguments, witness arguments.
 * @property {Object[]} - outputs, object of outputs for the transaction.
 *                     {String} - type, the type of output action, available option include: 'retire', 'control'.
 *                     {String} - id, outputid related to utxo.
 *                     {Integer} - position, position of outputs.
 *                     {String} - asset_id, asset id.
 *                     {String} - asset_alias, name of asset.
 *                     {Object} - asset_definition, definition of asset(json object).
 *                     {Integer} - amount, amount of asset.
 *                     {String} - account_id, account id.
 *                     {String} - account_alias, name of account.
 *                     {Object} - control_program, control program of account.
 *                     {String} - address, address of account.

 */



const blockAPI = (connection) => {
  return {
    /**
     * Returns the current block height for blockchain.
     *
     * @returns {Promise} Promise resolved on success with block_count returned.
     */
    getBlockCount: () => connection.request('/get-block-count', {}),


    /**
     * Returns the current block hash for blockchain.
     *
     * @returns {Promise} Requested info of specified Chain Core with block_hash returned.
     */
    getBlockHash: () => connection.request('/get-block-hash', {} ),

    /**
     * Returns the detail block by block height or block hash.
     *
     * @param params
     * @param {String} params.block_hash, hash of block.
     * @param {Integer} params.block_height, height of block.
     * @returns {Promise<BlockInfo>}
     */
    getBlock: (params) => connection.request('/get-block', params),

    /**
     * Returns the detail block header by block height or block hash.
     *
     * @param params
     * @param {String} params.block_hash, hash of block.
     * @param {Integer} params.block_height, height of block.
     * @returns {Promise}
     */
    getBlockHeader: (params) => connection.request('/get-block-header', params),

    /**
     * Returns the block difficulty by block height or block hash.
     *
     * @param params
     * @param {String} params.block_hash, hash of block.
     * @param {Integer} params.block_height, height of block.
     * @returns {Promise}
     */
    getDifficulty: (params) => connection.request('/get-difficulty', params),

    /**
     * Returns the block hash rate by block height or block hash,
     * it returns the current block hash rate when request is empty.
     *
     * @param params
     * @param {String} params.block_hash, hash of block.
     * @param {Integer} params.block_height, height of block.
     * @returns {Promise}
     */
    getHashRate: (params) => connection.request('/get-hash-rate', params)
  }
}

module.exports = blockAPI