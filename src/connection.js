import axios from 'axios'
import btoa from 'btoa'

class Connection {
  constructor(baseUrl, token = '') {
    this.baseUrl = baseUrl
    this.token = token
  }

  request(path, body = {}) {
    let config = {
      url: `${this.baseUrl}${path}`,
      method: 'post',
      headers: {
        Accept: 'application/json',
      },
      data: body,
      timeout: 1000
    }

    if (this.token) {
      config.headers['Authorization'] = `Basic ${btoa(this.token)}`
    }

    return axios.request(config)
  }
}

export default Connection
