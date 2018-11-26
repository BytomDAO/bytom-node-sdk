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
 * @property {Number} key_index
 * The index of keys.
 *
 * @property {Number} quorum
 * The number of keys required to sign transactions for the account.
 */

/**
 * A receiver is an object that wraps an account control program with the corresponding address.
 *
 * @typedef {Object} Receiver
 *
 * @property {String} control_program
 * The underlying control program that will be used in transactions paying to the address.
 *
 * @property {String} address
 * The target address one transaction can pay UTXO to.
 */

/**
 * API for interacting with {@link Account accounts}.
 *
 * @module AccountsApi
 */
const accountsApi = (connection) => {
  /**
   * @typedef {Object} createRequest
   *
   * @property {String} [alias]
   * User specified, unique identifier.
   *
   * @property {String[]} root_xpubs
   * The list of keys used to create control programs under the account.
   *
   * @property {Number} quorum
   * The number of keys required to sign transactions for the account.
   */


  /**
   * @typedef {Object} createReceiverRequest
   *
   * @property {String} [account_alias]
   * The unique alias of the account. accountAlias or accountId must be
   * provided.
   *
   * @property {String} [account_id]
   * The unique ID of the account. accountAlias or accountId must be
   * provided.
   */


  /**
   * @typedef {String[]} xpubs
   * The list of keys used to create control programs under the account.
   */

  /**
   * @typedef {String} [alias]
   * User specified, unique identifier.
   */

  /**
   * @typedef {Number} quorum
   * The number of keys required to sign transactions for the account.
   */

  /**
   * @typedef {String} id
   * Unique account identifier in one Bytom node.
   */

  /**
   * @typedef {Object} AddressInfo
   *
   * @property {String} account_alias
   * @property {String} account_id
   * @property {String} adddress
   * @property {Boolean} change
   * Indicate whether this address is for change UTXO.
   */

  return {
    /**
     * Create a new account.
     *
     * @param {module:AccountsApi~createRequest} params - Parameters for account creation.
     * @returns {Promise<Account>} Newly created account response.
     */
    create: (params) => connection.request('/create-account', params),

    /**
     * List all accounts in the target Bytom node.
     *
     * @returns {Promise<Array<Account>>} All accounts promise.
     */
    listAll: () => connection.request('/list-accounts', {}),

    /**
     * List accounts whose id is the given one.
     *
     * @param {Object} params - Filter and pagination information.
     * @param {String} params.id - Account id.
     * @param {String} params.alias - Account alias.
     * @return {Promise<Array<Account>>} Target accounts promise.
     */
    list: (params) => connection.request('/list-accounts', params),

    /**
     * Create account receiver.
     *
     * @param {module:AccountsApi~createReceiverRequest} params - Parameters for receiver creation.
     * @return {Promise<Receiver>} Target receiver.
     */
    createReceiver: (params) => connection.request('/create-account-receiver', params),

    /**
     * List all addresses for one account.
     *
     * @param {Object} params - Filter and pagination information.
     * @param {String} params.account_alias alias of account.
     * @param {String} params.account_id id of account.
     * @param {Number} params.from the start position of first address
     * @param {Number} params.count the number of returned.
     * @return {Promise<module:AccountApi~AddressInfo>} target addresses response.
     *
     */
    listAddresses: (params) => connection.request('/list-addresses', params),

    /**
     * Validate an address for one account.
     *
     * @param {string} address - Filter and pagination information.
     * @return {Promise<Object>} weather the address is local and is valid.
     *
     */
    validateAddresses: (address) => connection.request('/validate-addresses', {address: address}),

    /**
     * Delete account.
     * @param {Object} params - Deletion information.
     * @param {String} params.account_id - Account id.
     * @param {String} params.account_alias - Account alias.
     */
    delete: (params) => connection.request('/delete-account', params),

    /**
     * Update account alias.
     *
     * @param {object} params - Parameters for account update.
     * @param {String} params.account_id - id of account.
     * @param {String} params.account_alias - alias of account.
     * @param {String} params.new_alias - new alias of account.
     */
    updateAlias: (params) => connection.request('/update-account-alias', params)
  }
}

export default accountsApi
