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
 */

/**
 * API for interacting with {@link Account accounts}.
 *
 * @module AccountsApi
 */
const Accounts = (connection) => {
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

  return {
    /**
     * Create a new account.
     *
     * @param {module:AccountsApi~xpubs} xpubs - Keys for account creation.
     * @param {module:AccountsApi~quorum} quorum - The number of keys required to sign transactions for the account.
     * @param {module:AccountsApi~alias} alias - Account alias.
     * @returns {Promise<Response>} Newly created account response.
     */
    create: (xpubs, quorum, alias) => connection.request('/create-account', {
      root_xpubs: xpubs,
      quorum,
      alias
    }),

    /**
     * List accounts whose id starts with the given id.
     *
     * @param {module:AccountsApi~id} id - Account id prefix.
     * @return {Promise<Response>} target accounts response.
     */
    listAccounts: (id) => connection.request('/list-accounts', {id}),

    /**
     * Create account receiver.
     *
     * @param {module:AccountsApi~id} accountId - Id for the target account.
     * @return {Promise<Response>} target receiver response.
     */
    createReceiverById: (accountId) => connection.request('/create-account-receiver', {account_id: accountId}),

    /**
     * List all addresses for one account.
     * @param {module:AccountsApi~id} accountId - Id for the target account.
     * @return {Promise<Response>} target addresses response.
     */
    listAddressesById: (accountId) => connection.request('/list-addresses', {account_id: accountId}),

    /**
     * Delete account.
     * @param {module:AccountsApi~id} id - Target account id.
     */
    deleteById: (id) => connection.request('/delete-account', {account_info: id})
  }
}

export default Accounts
