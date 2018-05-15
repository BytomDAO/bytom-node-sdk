/**
 * Access tokens are `name:secret-token` pairs that are granted authorization for accessing Chain Core features.
 *
 * @typedef {Object} AccessToken
 * @global
 *
 * @property {String} id
 * User specified, unique identifier.
 *
 * @property {String} token
 * Only returned in the response from {@link AccessTokensApi~create}.
 *
 * @property {String} created_at
 * Timestamp of token creation, RFC3339 formatted.
 */

/**
 * API for interacting with {@link AccessToken access tokens}.
 *
 * @module AccessTokensApi
 */
const accessTokensApi = (connection) => {
  return {
    /**
     * Create a new access token.
     *
     * @param {String} id - User specified, unique identifier.
     * @returns {Promise<AccessToken>} Newly created access token.
     */
    create: (id) => connection.request('/create-access-token', {id}),

    /**
     * Get all access tokens.
     *
     * @returns {Promise<Array<AccessToken>>} All access tokens.
     */
    list: () => connection.request('/list-access-tokens', {}),

    /**
     * Delete the target access token.
     *
     * @param {String} id - The to be deleted token id.
     */
    delete: (id) => connection.request('/delete-access-token', {id})
  }
}

export default accessTokensApi
