/**
 * Basic information about the configuration of Bytom Core, as well as any
 * errors encountered when updating the local state of the blockchain
 *
 * More info: {}
 * @typedef {Object} CoreInfo
 *
 * @property {Boolean} listening, whether the node is listening.
 * @property {Boolean} syncing, whether the node is syncing.
 * @property {Boolean} mining, whether the node is mining.
 * @property {Integer} peer_count, current count of connected peers.
 * @property {Integer} current_block, current block height in the node's blockchain.
 * @property {Integer} highest_block, current highest block of the connected peers.
 * @property {String} network_id, network id.
 * @property {Object} version_info, bytomd version information:
 * @property {String} version, current version of the running bytomd.
 * @property {uint16} update, whether there exists an update.
 *                      0: no update;
 *                      1: small update;
 *                      2: significant update.
 * @property {String} new_version, the newest version of bytomd if there is one.
 */

/**
 * Bytom Core can be configured as a new blockchain network, or as a node in an
 * existing blockchain network.
 *
 * More info: {}
 * @module ConfigApi
 */
const configAPI = (connection) => {
  return {
    /**
     * get gas rate
     * @returns {Promise} Promise resolved with gas rate on success.
     */
    gasRate: () => connection.request('/gas-rate', {}),


    /**
     * Get info on specified Bytom Core.
     *
     * @param {objectCallback} [callback] - Optional callback. Use instead of Promise return value as desired.
     * @returns {Promise<CoreInfo>} Requested info of specified Bytom Core.
     */
    netInfo: () => connection.request('/net-info',{}),

    /**
     *
     * @param params
     * @param {String} params.address, address for account.
     * @param {String} params.derived_xpub, derived xpub.
     * @param {String} params.message, message for signature by derived_xpub.
     * @param {String} params.signature, signature for message.
     * @returns {*|AxiosPromise<any>}
     */
    verifyMessage: (params) => connection.request('verify-message', params)
  }
}

module.exports = configAPI