/**
 * Cryptographic private keys are the primary authorization mechanism on a
 * blockchain.
 *
 * @typedef {Object} Key
 * @global
 *
 * @property {String} alias
 * User specified, unique identifier of the key.
 *
 * @property {String} xpub
 * Hex-encoded string representation of the key.
 */

/**
 * API for interacting with {@link Key keys}.
 *
 * @module KeysApi
 */
const keysApi = connection => {
  /**
   * @typedef {Object} createRequest
   *
   * @property {String} [alias]
   * User specified, unique identifier.
   *
   * @property {String} [password]
   * password of the key.
   *
   * @property {String} [language]
   * mnemonic language of the key.
   *
   * @option params [String] mnemonic
   * mnemonic of the key, create key by specified mnemonic.
   */

  return {
    /**
     * Create a new key.
     *
     * @param {module:KeysApi~createRequest} params - Parameters for asset creation.
     * @returns {Promise<Key>} Newly created key.
     */
    create: (params) => connection.request('/create-key', params),

    /**
     * Got all the keys in one Bytom node.
     * @returns {Promise<Array<Key>>} All keys.
     */
    listAll: () => connection.request('/list-keys'),

    /**
     * @param {Object} params - Deletion information.
     * @param {String} params.xpub - Hex-encoded string representation of the key.
     * @param {String} params.password - Key password.
     */
    delete: (params) => connection.request('/delete-key', params),

    /**
     * Reset key password.
     *
     * @param {Object} params - Password checking information.
     * @param {String} params.xpub - Hex-encoded string representation of the key.
     * @param {String} params.password - password.
     */
    checkPassword: (params) => connection.request('/check-key-password', params),

    /**
     * Reset key password.
     *
     * @param {Object} params - Key password reset information.
     * @param {String} params.xpub - Hex-encoded string representation of the key.
     * @param {String} params.oldPassword - Old password.
     * @param {String} params.newPassword - New password.
     */
    resetPassword: (params) => connection.request('/reset-key-password', params)
  }
}

export default keysApi
