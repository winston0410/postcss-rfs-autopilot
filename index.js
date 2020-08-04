const postcss = require('postcss')

const {
  shouldBeTransformed
} = require('./utilities/helper.js')

module.exports = postcss.plugin('postcss-rfs-autopilot', ({
  includedRules,
  excludedRules,
  includedSelectors,
  excludedSelectors,
  includedUnits,
  excludedUnits,
  silentConsole
}) => {
  const options = {
    includedRules: includedRules || [
      '*'
    ],
    excludedRules: excludedRules || [],
    includedSelectors: includedSelectors || [
      '*'
    ],
    excludedSelectors: excludedSelectors || [],
    includedUnits: includedUnits || ['px', 'rem'],
    excludedUnits: excludedUnits || [],
    silentConsole: silentConsole || false
  }
  // Filter includedRules here with excludedRules
  // options.includedRules = filterIdenticalValues(options.includedRules, options.excludedRules)
  // options.includedSelectors = filterIdenticalValues(options.includedSelectors, options.excludedSelectors)
  // options.includedUnits = filterIdenticalValues(options.includedUnits, options.excludedUnits)

  return (root, result) => {
    root.walkDecls((decl) => {
      if (shouldBeTransformed(decl, options)) {
        decl.value = `rfs(${decl.value})`
      }
    })
  }
})
