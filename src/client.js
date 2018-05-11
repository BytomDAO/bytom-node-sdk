import Connection from 'connection'
import AccountsApi from 'api/account'

class Client {
  constructor(baseUrl, token) {
    this.connection = new Connection(baseUrl, token)

    this.account = new AccountsApi(this.connection)
  }
}

export default Client
