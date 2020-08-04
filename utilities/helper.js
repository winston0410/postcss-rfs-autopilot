const chalk = require('chalk')

const hasWrappedInRFS = (decl) => /^rfs/g.test(decl.value)

const isIncluded = (decl, inclusionRules) => {
  if (inclusionRules.includes('*')) {
    return true
  }

  return inclusionRules.some(unit => RegExp(unit).test(decl))
}

const log = (msg, msgType) => {
  switch (msgType) {
    case 'success':
      console.log(chalk.green(msg))
      break

    case 'notice':
      console.log(chalk.cyan(msg))
      break

    case 'error':
      console.log(chalk.red(msg))
      break
    default:
  }
}

const shouldBeTransformed = (decl, options) => {
  if (hasWrappedInRFS(decl)) {
    log(`${decl.parent.selector}{ ${decl.prop}: ${decl.value} } has already been wrapped in rfs()`, 'notice')
    return false
  }

  const inclusionRules = [options.includedRules, options.includedSelectors, options.includedUnits]
  const exclusionRules = [options.excludedRules, options.excludedSelectors, options.excludedUnits]
  const validationValues = [decl.prop, decl.parent.selector, decl.value]

  for (const [index, value] of validationValues.entries()) {
    if (!isIncluded(value, inclusionRules[index]) || isIncluded(value, exclusionRules[index])) {
      log(`${decl.parent.selector}{ ${decl.prop}: ${decl.value} } has been excluded`, 'error')
      return false
    }
  }

  log(`${decl.parent.selector}{ ${decl.prop}: ${decl.value} } has been wrapped with rfs()`, 'success')

  return true
}

module.exports = {
  hasWrappedInRFS,
  isIncluded,
  shouldBeTransformed
}
