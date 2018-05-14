const accessTokensApi = (connection) => {
  return {
    create: (id) => connection.request('/create-access-token', {id}),
    list: () => connection.request('/list-access-tokens', {}),
    delete: (id) => connection.request('/delete-access-token', {id})
  }
}

export default accessTokensApi
