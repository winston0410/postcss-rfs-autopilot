const chalk = require('chalk')

const chalkTypes = {
  success: 'green',
  notice: 'cyan',
  error: 'red'
}

const log = (msg, msgType, silentConsole) => !silentConsole && console.log(chalk[chalkTypes[msgType]] ? chalk[chalkTypes[msgType]](msg) : msg)

const getProp = o => (...props) => props.reduce((acc, curr) => acc ? acc[curr] : undefined, o)

const or = (...conditions) => conditions.reduce((acc, curr) => acc || curr)

const hasWrappedInRFS = decl => /^rfs/g.test(decl.value)

const isIncluded = decl => inclusionRules => inclusionRules.some(unit => unit === '*' || RegExp(unit).test(decl))

const checkInclusionRules = (decl, options) => validationProp => inclusionProp => !isIncluded(getProp(decl)(validationProp))(getProp(options)(inclusionProp))

const checkExclusionRules = (decl, options) => validationProp => exclusionProp => isIncluded(getProp(decl)(validationProp))(getProp(options)(exclusionProp))

const checkRules = (...validationProp) => (...inclusionProp) => (...exclusionProp) => (decl, options) => or(
  checkInclusionRules(decl, options)(validationProp)(inclusionProp),
  checkExclusionRules(decl, options)(validationProp)(exclusionProp)
)

const logIfTrue = func => (msg, type) => (decl, options) => ((condition) => {
  condition && log(msg, type, options.silentConsole)
  return condition
})(func(decl, options))

const messageTemplate = decl => `${decl.parent.selector}{ ${decl.prop}: ${decl.value} }`

const ifAllFalse = (...conditions) => (decl, options) => (endIndex => conditions.reduce((acc, curr, i, arr) => {
  const condition = curr(decl, options) || !acc
  condition && arr.splice(i) // acts like break by shorten this array
  console.log(`condition_${i}`)
  !condition && i + 1 === endIndex && log(`${messageTemplate(decl)} has been wrapped with rfs()`, 'success', options.silentConsole) // log success message when reach to the end
  return !condition
}, true))(conditions.length)

const shouldBeTransformed = (decl, options) => ifAllFalse(
  logIfTrue(hasWrappedInRFS)(`${messageTemplate(decl)} was already wrapped in rfs()`, 'notice'),
  logIfTrue(checkRules('prop')('includedRules')('excludedRules'))(`${messageTemplate(decl)} has been excluded`, 'error'),
  logIfTrue(checkRules('parent', 'selector')('includedSelectors')('excludedSelectors'))(`${messageTemplate(decl)} has been excluded`, 'error'),
  logIfTrue(checkRules('value')('includedUnits')('excludedUnits'))(`${messageTemplate(decl)} has been excluded`, 'error')
)(decl, options)

module.exports = {
  hasWrappedInRFS,
  isIncluded,
  shouldBeTransformed
}
