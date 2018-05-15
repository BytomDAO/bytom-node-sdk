import Connection from './connection'
import accountsApi from './api/accounts'
import assetApi from './api/assets'
import keysApi from './api/keys'
import transactionApi from './api/transactions'
import balancesApi from './api/balances'
import unspentOutputsAPI from './api/unspentOutputs'
import accessTokensApi from './api/accessTokens'

class Client {
  constructor(baseUrl, token) {
    this.connection = new Connection(baseUrl, token)

    this.accounts = new accountsApi(this.connection)
    this.assets = new assetApi(this.connection)
    this.keys = new keysApi(this.connection)
    this.transactions = new transactionApi(this.connection)
    this.balances = new balancesApi(this.connection)
    this.unspentOutputs = new unspentOutputsAPI(this.connection)
    this.accessTokensApi = new accessTokensApi(this.connection)
  }
}

export default Client
