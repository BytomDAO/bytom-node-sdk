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
  return {
    /**
     * Create a new key.
     *
     * @param {String} alias - User specified, unique identifier.
     * @param {String} password - User specified, key password.
     * @returns {Promise<Key>} Newly created key.
     */
    create: (alias, password) => connection.request('/create-key', {alias, password}),

    /**
     * Got all the keys in one Bytom node.
     * @returns {Promise<Array<Key>>} All keys.
     */
    list: () => connection.request('/list-keys'),

    /**
     *
     * @param {String} xpub - Hex-encoded string representation of the key.
     * @param {String} password - Key password.
     */
    delete: (xpub, password) => connection.request('/delete-key', {xpub, password}),

    /**
     * Reset key password.
     *
     * @param {String} xpub - Hex-encoded string representation of the key.
     * @param {String} oldPassword - Old password.
     * @param {String} newPassword - New password.
     */
    resetPassword: (xpub, oldPassword, newPassword) => connection.request('/reset-key-password', {
      xpub,
      old_password: oldPassword,
      new_password: newPassword
    })
  }
}

export default keysApi
