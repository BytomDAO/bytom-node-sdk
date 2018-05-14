import Connection from 'connection'
import accountsApi from 'api/account'
import assetApi from 'api/assets'
import keysApi from 'api/keys'
import transactionApi from 'api/transactions'
import balancesApi from 'api/balances'
import unspentOutputsAPI from 'api/unspentOutputs'

class Client {
  constructor(baseUrl, token) {
    this.connection = new Connection(baseUrl, token)

    this.accounts = new accountsApi(this.connection)
    this.assets = new assetApi(this.connection)
    this.keys = new keysApi(this.connection)
    this.transactions = new transactionApi(this.connection)
    this.balances = new balancesApi(this.connection)
    this.unspentOutputs = new unspentOutputsAPI(this.connection)
  }
}

export default Client
