import Connection from 'connection'

class Client {
  constructor(baseUrl, token) {
    this.connection = new Connection(baseUrl, token)
  }
}

export default Client
