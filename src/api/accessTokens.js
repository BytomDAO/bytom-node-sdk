/**
 * Access tokens are `name:secret-token` pairs that are granted authorization for accessing Bytom Core features.
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
     * @param {Object} params - Access Token Object.
     * @param {String} params.id - User specified, unique identifier.
     * @param {String} params.type - type of token.
     * @returns {Promise<AccessToken>} Newly created access token.
     */
    create: (params) => connection.request('/create-access-token', params),

    /**
     * Get all access tokens.
     *
     * @returns {Promise<Array<AccessToken>>} All access tokens.
     */
    listAll: () => connection.request('/list-access-tokens', {}),

    /**
     * Delete the target access token.
     *
     * @param {String} id The to be deleted token id.
     */
    delete: (id) => connection.request('/delete-access-token', {id}),

    /**
     * Check the target access token.
     *
     * @param {Object} params - Parameters for access token check.
     * @param {String} params.id - The to be deleted token id.
     * @param {String} params.secret secret of token, the second part of the colon division for token.
     */
    check: (params) => connection.request('/check-access-token', params),
  }
}

export default accessTokensApi
