/**
 * A blockchain consists of an immutable set of cryptographically linked
 * transactions. Each transaction contains one or more actions.
 *
 * @typedef {Object} Transaction
 * @global
 *
 * @property {String} tx_id
 * Unique transaction identifier.
 *
 * @property {String} block_time
 * Time of transaction.
 *
 * @property {TransactionInput[]} inputs
 * List of specified inputs for a transaction.
 *
 * @property {TransactionOutput[]} outputs
 * List of specified outputs for a transaction.
 */

/**
 * @typedef {Object} TransactionInput
 * @global
 *
 * @property {String} type
 * The type of the input. Possible values are "issue", "spend".
 *
 * @property {String} asset_id
 * The id of the asset being issued or spent.
 *
 * @property {String} asset_alias
 * The alias of the asset being issued or spent (possibly null).
 *
 * @property {Hash} asset_definition
 * The definition of the asset being issued or spent (possibly null).
 *
 * @property {Integer} amount
 * The number of units of the asset being issued or spent.
 *
 * @property {String} spentOutputId
 * The id of the output consumed by this input. ID is nil if this is an issuance input.
 *
 * @property {String} account_id
 * The id of the account transferring the asset (possibly null if the
 * input is an issuance or an unspent output is specified).
 *
 * @property {String} account_alias
 * The alias of the account transferring the asset (possibly null if the
 * input is an issuance or an unspent output is specified).
 *
 * @property {String} issuance_program
 * A program specifying a predicate for issuing an asset (possibly null
 * if input is not an issuance).
 *
 * @property {String} control_program
 * A UTXO control program.
 *
 * @property {String} address
 * The UTXO address.
 */

/**
 * Each new transaction in the blockchain consumes some unspent outputs and
 * creates others. An output is considered unspent when it has not yet been used
 * as an input to a new transaction. All asset units on a blockchain exist in
 * the unspent output set.
 *
 * @typedef {Object} TransactionOutput
 * @global
 *
 * @property {String} id
 * The id of the output.
 *
 * @property {String} type
 * The type of the output. Possible values are "control" and "retire".
 *
 * @property {String} transaction_id
 * Id of the transaction.
 *
 * @property {Number} position
 * The output's position in a transaction's list of outputs.
 *
 * @property {String} asset_id
 * The id of the asset being issued or spent.
 *
 * @property {String} asset_alias
 * The alias of the asset being issued or spent (possibly null).
 *
 * @property {Hash} asset_definition
 * The definition of the asset being issued or spent (possibly null).
 *
 * @property {Integer} amount
 * The number of units of the asset being issued or spent.
 *
 * @property {String} account_id
 * The id of the account transferring the asset (possibly null).
 *
 * @property {String} account_alias
 * The alias of the account transferring the asset (possibly null).
 *
 * @property {String} control_program
 * The control program which must be satisfied to transfer this output.
 */

/**
 * @class
 * A convenience class for building transaction template objects.
 */
class TransactionBuilder {
  /**
   * constructor - return a new object used for constructing a transaction.
   */
  constructor() {
    this.actions = []


    /**
     * Integer of the time to live in milliseconds, it means utxo will be reserved(locked) for
     * builded transaction in this time range, if the transaction will not to be submitted into block,
     * it will be auto unlocked for build transaction again after this ttl time. it will be set to
     * 5 minutes(300 seconds) defaultly when ttl is 0.
     * @type {Integer}
     */
    this.ttl = 0

    /**
     * Base data for the transaction, default is null.
     * @type {Object}
     */
    this.baseTransaction = null
  }

  /**
   * Add an action that issues assets.
   *
   * @param {Object} params - Action parameters.
   * @param {String} params.assetId - Asset ID specifying the asset to be issued.
   *                                   You must specify either an ID or an alias.
   * @param {String} params.assetAlias - Asset alias specifying the asset to be issued.
   *                                      You must specify either an ID or an alias.
   * @param {String} params.amount - Amount of the asset to be issued.
   */
  issue(params) {
    this.actions.push(Object.assign({}, params, {type: 'issue'}))
  }

  /**
   * Add an action that controls assets with an account specified by identifier.
   *
   * @param {Object} params - Action parameters.
   *
   * @param {String} params.asset_alias - Asset alias specifying the asset to be controlled.
   *                                   You must specify either an ID or an alias.
   * @param {String} params.asset_id - Asset ID specifying the account controlling the asset.
   *                                   You must specify either an ID or an alias.
   * @param {String} params.address - Account address specifying the account controlling the asset.
   *                                   You must specify either an ID or an alias.
   * @param {Number} params.amount - Amount of the asset to be controlled.
   */
  controlWithAddress(params) {
    this.actions.push(Object.assign({}, params, {type: 'control_address'}))
  }

  /**
   * Add an action that controls assets with a receiver.
   *
   * @param {Object} params - Action parameters.
   *
   * @param {Object} params.control_program - The receiver object in which assets will be controlled.
   *
   * @param {String} params.asset_id - Asset ID specifying the asset to be controlled.
   *                                   You must specify either an ID or an alias.
   * @param {String} params.asset_alias - Asset alias specifying the asset to be controlled.
   *                                   You must specify either an ID or an alias.
   * @param {Number} params.amount - Amount of the asset to be controlled.
   */
  controlWithControlProgram(params) {
    this.actions.push(Object.assign({}, params, {type: 'control_program"'}))
  }

  /**
   * Add an action that spends assets from an account specified by identifier.
   *
   * @param {Object} params - Action parameters.
   * @param {String} params.asset_id - Asset ID specifying the asset to be spent.
   *                                   You must specify either an ID or an alias.
   * @param {String} params.asset_alias - Asset alias specifying the asset to be spent.
   *                                   You must specify either an ID or an alias.
   * @param {String} params.account_id - Account ID specifying the account spending the asset.
   *                                   You must specify either an ID or an alias.
   * @param {String} params.account_alias - Account alias specifying the account spending the asset.
   *                                   You must specify either an ID or an alias.
   * @param {Number} params.amount - Amount of the asset to be spent.
   */
  spendFromAccount(params) {
    this.actions.push(Object.assign({}, params, {type: 'spend_account'}))
  }

  /**
   * Add an action that spends an account unspent output.
   *
   * @param {Object} params - Action parameters.
   * @param {String} params.output_id - ID of the transaction output to be spent.
   */
  spendAccountUnspentOutput(params) {
    this.actions.push(Object.assign({}, params, {type: 'spend_account_unspent_output'}))
  }

  /**
   * Add an action that retires units of an asset.
   *
   * @param {Object} params - Action parameters.
   * @param {String} params.asset_id - Asset ID specifying the asset to be retired.
   *                                   You must specify either an ID or an alias.
   * @param {String} params.asset_alias - Asset alias specifying the asset to be retired.
   *                                   You must specify either an ID or an alias.
   * @param {Number} params.amount - Amount of the asset to be retired.
   *
   * @option params [String] - arbitrary Any message string, can be empty.
   */
  retire(params) {
    this.actions.push(Object.assign({}, params, {type: 'retire'}))
  }
}

/**
 * API for interacting with {@link Transaction transactions}.
 *
 * @module TransactionsApi
 */
const transactionsApi = connection => {

  /**
   * @callback builderCallback
   * @param {TransactionBuilder} builder
   */

  /**
   * @typedef {Object} Action
   * Basic unit to build a transaction.
   * For spend transaction, either account_id or account_alias is required to specify account info.
   * Asset info(either asset_id or asset_alias ) is required for all kinds of action.
   *
   * @property {String} type
   * Currently 4 types of action is supported:
   * - spend_account: action to spend UTXO from account.
   * - issue: action to issue asset.
   * - retire: action to retire asset.
   * - control_address: action to receive asset with address.
   *
   * @property {String} account_alias
   * The alias of the account transferring the asset (possibly null).
   *
   * @property {String} account_id
   * The id of the account transferring the asset (possibly null).
   *
   * @property {String} asset_id
   * The id of the asset being issued or spent (possibly null).
   *
   * @property {String} asset_alias
   * The alias of the asset being issued or spent (possibly null).
   *
   * @property {String} address
   * Address to receive the transfered asset(possibly null, required for control_address action).
   */

  /**
   * @typedef {Object} SignResult
   * Data structure `/sign-transaction` api will return.
   *
   * @property {Transaction} transaction
   * The signed transaction if sign success.
   *
   * @property {Boolean} sign_complete
   * Whether all input actions are signed. It means this transaction can be submit if true, else not.
   */

  return {
    /**
     * Build an unsigned transaction from a set of actions.
     *
     * @param {module:TransactionsApi~builderCallback} builderBlock - Function that adds desired actions
     *                                         to a given builder object.
     * @returns {Promise<Object>} Unsigned transaction template, or error.
     */
    build: (builderBlock) => {
      const builder = new TransactionBuilder()

      try {
        builderBlock(builder)
      } catch (err) {
        return Promise.reject(err)
      }

      return connection.request('/build-transaction', builder)
    },


    /**
     * Sign transaction.
     *
     * @param {Object} params - The built transaction template.
     * @param {String} params.password signature of the password.
     * @param {Object} params.transaction builded transaction.
     * @returns {Promise<module:TransactionsApi~SignResult>} - Sign result.
     */
    sign: (params) => connection.request('/sign-transaction', params),

    /**
     * Submit a signed transaction to the blockchain.
     *
     * @param {String} raw_transaction - Encoded fully signed transaction.
     * @returns {Promise<Object>} Submit result. It will return tx_id if submit successfully else error.
     */
    submit: (rawTransaction) => connection.request('/submit-transaction', {raw_transaction: rawTransaction}),

    /**
     * Estimate how much gas one trasaction may use.
     * @param {Object} transaction - The transaction template to estimate.
     * @returns {Object} Estimation result.
     */
    estimateGas: (transaction) => connection.request('/estimate-transaction-gas', {
      transaction_template: transaction
    }),

    /**
     * List all local transactions.
     *
     * @returns {Promise<Transaction[]>} All local transactions.
     */
    listAll: () => connection.request('/list-transactions', {unconfirmed: true}),

    /**
     * List local transactions by id or filter condition.
     *
     * @param {Object} params - Transaction filter params.
     * @param {String} params.id - transaction id, hash of transaction.
     * @param {String} params.account_id - id of account.
     * @param {Boolean} params.detail -  flag of detail transactions, default false (only return transaction summary).
     * @param {Boolean} params.unconfirmed -  flag of unconfirmed transactions(query result include all confirmed
     *                  and unconfirmed transactions), default false.
     * @param {Integer} params.from - The start position of first transaction.
     * @param {Integer} params.count - The number of returned.
     * @returns {Promise<Transaction[]>} The result transactions.
     */
    list: (params) => connection.request('/list-transactions', params),
  }
}

export default transactionsApi
