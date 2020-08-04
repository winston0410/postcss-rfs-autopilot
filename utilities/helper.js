const {
  options
} = require('../index.js')

const hasWrappedInRFS = (decl) => /^rfs/g.test(decl.value)

const isIncluded = (decl, inclusionRules) => {
  if (inclusionRules.includes('*')) {
    return true;
  }

  if (inclusionRules.some(unit => RegExp(unit).test(decl))) {
    return true
  }
  return false
}

const filterIdenticalValues = (sourceArray, arrayToCheckAgainst) => {
  return sourceArray.filter(item => !arrayToCheckAgainst.includes(item))
}

const shouldBeTransformed = (decl, options) => {

  if (hasWrappedInRFS(decl)) {
    return false
  }

  const inclusionRules = [ options.includedRules, options.includedSelectors, options.includedUnits]
  const exclusionRules = [ options.excludedRules, options.excludedSelectors, options.excludedUnits]
  const validationValues = [decl.prop, decl.parent.selector, decl.value]

  for(const [index, value] of validationValues.entries() ){
    if(! isIncluded(value, inclusionRules[index]) || isIncluded(value, exclusionRules[index]) ){
      console.log(`${decl.parent.selector}{ ${decl.prop}: ${decl.value} } has been excluded`);
      return false
    }
  }

  console.log(`${decl.parent.selector}{ ${decl.prop}: ${decl.value} } has been wrapped with rfs()`);
  return true
}

module.exports = {
  hasWrappedInRFS,
  isIncluded,
  filterIdenticalValues,
  shouldBeTransformed
}
