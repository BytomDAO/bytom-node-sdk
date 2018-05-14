import Connection from 'connection'
import AccountsApi from 'api/account'
import AssetApi from 'api/assets'
import KeysApi from 'api/keys'
import TransactionApi from 'api/transactions'
import BalancesApi from 'api/balances'
import unspentOutputsAPI from 'api/unspentOutputs'

class Client {
  constructor(baseUrl, token) {
    this.connection = new Connection(baseUrl, token)

    this.accounts = new AccountsApi(this.connection)
    this.assets = new AssetApi(this.connection)
    this.keys = new KeysApi(this.connection)
    this.transactions = new TransactionApi(this.connection)
    this.balances = new BalancesApi(this.connection)
    this.unspentOutputs = new unspentOutputsAPI(this.connection)
  }
}

export default Client
