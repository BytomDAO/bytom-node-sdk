const unspentOutputsAPI = (connection) => {
  return {
    list: () => connection.request('/list-unspent-outputs', {}),

    listById: (id) => connection.request('list-unspent-outputs', {id})
  }
}

export default unspentOutputsAPI
