const lib = {
  create: function(type, message, props = {}) {
    let err
    if (props.body) {
      err = lib.newBatchError(props.body, props.requestId)
    } else {
      err = new Error(message)
    }

    err = Object.assign(err, props, {
      bytomClientError: true,
      type: type,
    })
    return err
  },

  isbytomError: function(err) {
    return err && !!err.bytomClientError
  },

  isBatchError: function (v) {
    return v && v.code && !v.stack
  },

  newBatchError: function (body, requestId = false) {
    let err = new Error(lib.formatErrMsg(body, requestId))
    err.code = body.code
    err.bytomMessage = body.msg
    err.detail = body.error_detail
    return err
  },

  formatErrMsg: function(body) {
    let tokens = []

    if (typeof body.code === 'string' && body.code.length > 0) {
      tokens.push('Code: ' + body.code)
    }

    tokens.push('Message: ' + body.msg)

    if (typeof body.error_detail === 'string' && body.error_detail.length > 0) {
      tokens.push('Detail: ' + body.error_detail)
    }

    return tokens.join(' ')
  },

  types: {
    FETCH: 'FETCH',
    CONNECTIVITY: 'CONNECTIVITY',
    JSON: 'JSON',
    UNAUTHORIZED: 'UNAUTHORIZED',
    NOT_FOUND: 'NOT_FOUND',
    BAD_REQUEST: 'BAD_REQUEST',
    SERVER_ERROR: 'SERVER_ERROR',
  }
}

module.exports = lib
