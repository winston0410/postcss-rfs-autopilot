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

  if (!isIncluded(decl.prop, options.includedRules) || isIncluded(decl.prop, options.excludedRules)) {
    console.log(`${decl.prop} excluded`);
    return false
  }

  if (!isIncluded(decl.parent.selector, options.includedSelectors) || isIncluded(decl.parent.selector, options.excludedSelectors)) {
    console.log(`${decl.parent.selector} excluded`);
    return false
  }

  if (!isIncluded(decl.value, options.includedUnits) || isIncluded(decl.value, options.excludedUnits)) {
    console.log(`${decl.value} excluded`);
    return false
  }

  console.log(`${decl.parent.selector}{${decl.prop}: ${decl.value}} has been wrapped with rfs()`);
  return true
}

module.exports = {
  hasWrappedInRFS,
  isIncluded,
  filterIdenticalValues,
  shouldBeTransformed
}
