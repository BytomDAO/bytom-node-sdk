/**
 * @typedef {Object} BlockInfo
 *
 * @property {String} hash hash of block.
 * @property {Integer} size size of block.
 * @property {Integer} version version of block.
 * @property {Integer} height height of block.
 * @property {String} previous_block_hash previous block hash.
 * @property {Integer} timestamp timestamp of block.
 * @property {Integer} nonce nonce value.
 * @property {Integer} bits bits of difficulty.
 * @property {String} difficulty difficulty value(String type).
 * @property {String} transaction_merkle_root merkle root of transaction.
 * @property {String} transaction_status_hash merkle root of transaction status.
 * @property {Object[]} transactions transaction object:
 * @property {String} transactions.id transaction id, hash of the transaction.
 * @property {Integer} transactions.version version of transaction.
 * @property {Integer} transactions.size size of transaction.
 * @property {Integer} transactions.time_range the unix timestamp for when the requst was responsed.
 * @property {Boolean} transactions.status_fail whether the state of the request has failed.
 * @property {String} transactions.mux_id the previous transaction mux id(source id of utxo).
 * @property {Object[]} inputs object of inputs for the transaction.
 * @property {String} inputs.type the type of input action, available option include: 'spend', 'issue', 'coinbase'.
 * @property {String} inputs.asset_id asset id.
 * @property {String} inputs.asset_alias name of asset.
 * @property {Object} inputs.asset_definition definition of asset(json object).
 * @property {Integer} inputs.amount amount of asset.
 * @property {Object} inputs.issuance_program issuance program, it only exist when type is 'issue'.
 * @property {Object} inputs.control_program control program of account, it only exist when type is 'spend'.
 * @property {String} inputs.address address of account, it only exist when type is 'spend'.
 * @property {String} inputs.spent_output_id the front of outputID to be spent in this input, it only exist when type is 'spend'.
 * @property {String} inputs.account_id account id.
 * @property {String} inputs.account_alias name of account.
 * @property {Object} inputs.arbitrary arbitrary infomation can be set by miner, it only exist when type is 'coinbase'.
 * @property {String} inputs.input_id hash of input action.
 * @property {String[]} inputs.witness_arguments witness arguments.
 * @property {Object[]} outputs object of outputs for the transaction.
 * @property {String} outputs.type the type of output action, available option include: 'retire', 'control'.
 * @property {String} outputs.id outputid related to utxo.
 * @property {Integer} outputs.position position of outputs.
 * @property {String} outputs.asset_id asset id.
 * @property {String} outputs.asset_alias name of asset.
 * @property {Object} outputs.asset_definition definition of asset(json object).
 * @property {Integer} outputs.amount amount of asset.
 * @property {String} outputs.account_id account id.
 * @property {String} outputs.account_alias name of account.
 * @property {Object} outputs.control_program control program of account.
 * @property {String} outputs.address address of account.
 */


/**
 * API for interacting with {@link Block blocks}.
 *
 * @module BlockAPI
 */

const blockAPI = (connection) => {
  return {
    /**
     * Returns the current block height for blockchain.
     *
     * @returns {Promise<Object>} Promise resolved on success with block_count returned.
     */
    getBlockCount: () => connection.request('/get-block-count', {}),


    /**
     * Returns the current block hash for blockchain.
     *
     * @returns {Promise<Object>} Requested info of specified Bytom Core with block_hash returned.
     */
    getBlockHash: () => connection.request('/get-block-hash', {} ),

    /**
     * Returns the detail block by block height or block hash.
     *
     * @param {Object} params
     * @param {String} params.block_hash hash of block.
     * @param {Integer} params.block_height height of block.
     * @returns {Promise<BlockInfo>}
     */
    getBlock: (params) => connection.request('/get-block', params),

    /**
     * Returns the detail block header by block height or block hash.
     *
     * @param {Object} params
     * @param {String} params.block_hash hash of block.
     * @param {Integer} params.block_height height of block.
     * @returns {Promise<Object>}
     */
    getBlockHeader: (params) => connection.request('/get-block-header', params),

    /**
     * Returns the block difficulty by block height or block hash.
     *
     * @param {Object} params
     * @param {String} params.block_hash hash of block.
     * @param {Integer} params.block_height height of block.
     * @returns {Promise<Object>}
     */
    getDifficulty: (params) => connection.request('/get-difficulty', params),

    /**
     * Returns the block hash rate by block height or block hash,
     * it returns the current block hash rate when request is empty.
     *
     * @param {Object} params
     * @param {String} params.block_hash hash of block.
     * @param {Integer} params.block_height height of block.
     * @returns {Promise<Object>}
     */
    getHashRate: (params) => connection.request('/get-hash-rate', params)
  }
}

module.exports = blockAPI