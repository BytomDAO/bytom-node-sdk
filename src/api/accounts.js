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
     * @param {module:AccountsApi~xpubs} xpubs - Keys for account creation.
     * @param {module:AccountsApi~quorum} quorum - The number of keys required to sign transactions for the account.
     * @param {module:AccountsApi~alias} alias - Account alias.
     * @returns {Promise<Account>} Newly created account response.
     */
    create: (xpubs, quorum, alias) => connection.request('/create-account', {
      root_xpubs: xpubs,
      quorum,
      alias
    }),

    /**
     * List all accounts in the target Bytom node.
     *
     * @returns {Promise<Array<Account>>} All accounts promise.
     */
    listAll: () => connection.request('/list-accounts', {}),

    /**
     * List accounts whose id is the given one.
     *
     * @param {module:AccountsApi~id} id - Account id.
     * @return {Promise<Array<Account>>} Target accounts promise.
     */
    listById: (id) => connection.request('/list-accounts', {id}),

    /**
     * Create account receiver.
     *
     * @param {module:AccountsApi~id} accountId - Id for the target account.
     * @return {Promise<Receiver>} Target receiver.
     */
    createReceiverById: (accountId) => connection.request('/create-account-receiver', {account_id: accountId}),

    /**
     * List all addresses for one account.
     * @param {module:AccountsApi~id} accountId - Id for the target account.
     * @return {Promise<module:AccountApi~AddressInfo>} target addresses response.
     */
    listAddressesById: (accountId) => connection.request('/list-addresses', {account_id: accountId}),

    /**
     * Delete account.
     * @param {module:AccountsApi~id} id - Target account id.
     */
    deleteById: (id) => connection.request('/delete-account', {account_info: id})
  }
}

export default accountsApi
