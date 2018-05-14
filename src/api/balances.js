const balancesApi = (connection) => {
  return {
    list: () => connection.request('/list-balances', {})
  }
}

export default balancesApi
