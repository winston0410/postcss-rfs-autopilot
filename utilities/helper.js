const requiredParam = (param) => {
  const requiredParamError = new Error(`Required parameter, "${param}" is missing.`)
  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(requiredParamError, requiredParam)
  }
  throw requiredParamError
}

module.exports = {
  requiredParam
}
