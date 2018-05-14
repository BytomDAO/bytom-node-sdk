/**
 * An asset is a type of value that can be issued on a blockchain. All units of
 * a given asset are fungible. Units of an asset can be transacted directly
 * between parties without the involvement of the issuer.
 *
 * @typedef {Object} Asset
 * @global
 *
 * @property {String} id
 * Globally unique identifier of the asset.
 * Asset specifies the asset id as the hash of:
 * - the asset's issuance program
 * - the core's VM version
 * - the hash of asset definition
 *
 * @property {String} alias
 * User specified, unique identifier in one Bytom node.
 *
 * @property {String} issuanceProgram
 *
 * @property {Key[]} keys
 * The list of keys used to issue units of the asset.
 *
 * @property {Number} quorum
 * The number of signatures required to issue new units of the asset.
 *
 * @property {Object} defintion
 * User-specified, arbitrary/unstructured data visible across Bytom
 * blockchain networks. assets specify the definition in their
 * issuance programs, rendering the definition immutable.
 */

/**
 * API for interacting with {@link Asset assets}.
 *
 * @module AssetsApi
 */
const assetsApi = (connection) => {
  /**
   * @typedef {String[]} xpubs
   * The list of keys used to issue units of the asset.
   */

  /**
   * @typedef {String} [alias]
   * User specified, unique identifier.
   */

  /**
   * @typedef {Number} quorum
   * The number of signatures required to issue new units of the asset.
   */

  /**
   * @typedef {String} id
   * Unique account identifier in one Bytom node.
   */

  /**
   * @typedef {Object} definition
   * User-specified, asset attributes accross Bytom blockchain network.
   */

  return {
    /**
     * Create a new asset.
     *
     * @param {module:AssetsApi~xpubs} xpubs - Keys for asseet creation.
     * @param {module:AssetsApi~quorum} quorum - The number of keys required to sign transactions for the account.
     * @param {module:AssetsApi~alias} alias - Asset alias.
     * @param {module:AssetsApi~definition} definition - Asset definition.
     * @returns {Promise<Response>} Newly created asset response.
     */
    create: (xpubs, quorum, alias, definition) => connection.request('/create-asset', {
      alias,
      quorum,
      definition,
      root_xpubs: xpubs
    }),

    /**
     * List all assets in one Bytom node.
     *
     * @returns {Promise<Response>} target assets response.
     */
    listAssets: () => connection.request('/list-assets', {}),

    /**
     * Get asset by the asset id.
     *
     * @param {module:AssetsApi~id} id - Asset id.
     * @returns {Promise<Response>} target asset response.
     */
    getAsset: (id) => connection.request('/get-asset', {id}),

    /**
     * Update asset alias.
     *
     * @param {module:AssetsApi~id} id - Asset id.
     * @param {String} newAlias - new alias.
     * @returns {Promise<Response>} update response.
     */
    updateAssetAlias: (id, newAlias) => connection.request('/update-asset-alias', {id, alias: newAlias})
  }
}

export default assetsApi
