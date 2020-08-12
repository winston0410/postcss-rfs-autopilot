const chalk = require('chalk')

const chalkTypes = {
  success: chalk.green,
  notice: chalk.cyan,
  error: chalk.red
}

const log = (msg, msgType, silentConsole) => !silentConsole && console.log(chalkTypes[msgType] ? chalkTypes[msgType](msg) : msg)

const getProp = o => props => props.reduce((acc, curr) => acc ? acc[curr] : undefined, o)

const or = (...conditions) => conditions.reduce((acc, curr) => acc || curr)

const logIfTrue = func => (msg, type) => (decl, options) => ((condition) => {
  condition && log(msg, type, options.silentConsole)
  return condition
})(func(decl, options))

const hasWrappedInRFS = decl => /^rfs/g.test(decl.value)

const isIncluded = decl => inclusionRules => inclusionRules.some(unit => unit === '*' || RegExp(unit).test(decl))

const checkInclusionRules = (decl, options) => validationProp => inclusionProp => !isIncluded(getProp(decl)(validationProp))(getProp(options)(inclusionProp))

const checkExclusionRules = (decl, options) => validationProp => exclusionProp => isIncluded(getProp(decl)(validationProp))(getProp(options)(exclusionProp))

const checkRules = (...validationProp) => (...inclusionProp) => (...exclusionProp) => (decl, options) => or(
  checkInclusionRules(decl, options)(validationProp)(inclusionProp),
  checkExclusionRules(decl, options)(validationProp)(exclusionProp)
)

const messageTemplate = decl => `${decl.parent.selector}{ ${decl.prop}: ${decl.value} }`

const ifAllFalse = (...conditions) => (decl, options) => (endIndex => conditions.reduce((acc, curr, i, arr) => {
  const condition = curr(decl, options) || !acc
  condition && arr.splice(i) // acts like break by shorten this array
  !condition && i + 1 === endIndex && log(`${messageTemplate(decl)} has been wrapped with rfs()`, 'success', options.silentConsole) // log success message when reach to the end
  return !condition
}, true))(conditions.length)

const checkPropRules = checkRules('prop')('includedProps')('excludedProps')

const checkSelectorRules = checkRules('parent', 'selector')('includedSelectors')('excludedSelectors')

const checkValueRules = checkRules('value')('includedUnits')('excludedUnits')

const shouldBeTransformed = (decl, options) => ifAllFalse(
  logIfTrue(hasWrappedInRFS)(`${messageTemplate(decl)} was already wrapped in rfs()`, 'notice'),
  logIfTrue(checkPropRules)(`${messageTemplate(decl)} has been excluded`, 'error'),
  logIfTrue(checkSelectorRules)(`${messageTemplate(decl)} has been excluded`, 'error'),
  logIfTrue(checkValueRules)(`${messageTemplate(decl)} has been excluded`, 'error')
)(decl, options)

module.exports = {
  hasWrappedInRFS,
  isIncluded,
  shouldBeTransformed
}
