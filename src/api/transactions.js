const transactions = connection => {
  return {
    build: (baseTransaction = null, actions, ttl = 0) => connection.request('/build-transaction', {
      base_transaction: baseTransaction,
      actions,
      ttl
    }),

    sign: (transaction, password) => connection.request('/sign-transaction', {transaction, password}),

    submit: (rawTransaction) => connection.request('/submit-transaction', {raw_transaction: rawTransaction}),

    estimateGas: (transaction) => connection.request('/estimate-transaction-gas', {
      transaction_template: transaction
    }),

    listAll: () => connection.request('/list-transactions', {}),

    listById: (id) => connection.request('/list-transactions', {id}),

    listByAccountId: (accountId) => connection.request('list-transactions', {account_id: accountId})
  }
}

export default transactions()
