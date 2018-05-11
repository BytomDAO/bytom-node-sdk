import Connection from 'connection'
import Account from 'api/account'

class Client {
  constructor(baseUrl, token) {
    this.connection = new Connection(baseUrl, token)

    this.account = new Account(this.connection)
  }
}

export default Client
