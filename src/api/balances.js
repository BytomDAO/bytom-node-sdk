const BalancesApi = (connection) => {
  return {
    list: () => connection.request('/list-balances', {})
  }
}

export default BalancesApi
