const keys = connection => {
  return {
    create: (alias, password) => connection.request('/create-key', {alias, password}),
    list: () => connection.request('/list-keys'),
    delete: (xpub, password) => connection.request('/delete-key', {xpub, password}),
    resetPassword: (xpub, oldPassword, newPassword) => connection.request('/reset-key-password', {
      xpub,
      old_password: oldPassword,
      new_password: newPassword
    })
  }
}
