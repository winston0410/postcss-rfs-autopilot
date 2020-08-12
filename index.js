const postcss = require('postcss')

const {
  shouldBeTransformed
} = require('./utilities/helper.js')

module.exports = postcss.plugin('postcss-rfs-autopilot', ({
  includedProps = ['*'],
  excludedProps = [],
  includedSelectors = ['*'],
  excludedSelectors = [],
  includedUnits = ['px', 'rem'],
  excludedUnits = [],
  silentConsole = false
} = {}) => {
  const options = {
    includedProps,
    excludedProps,
    includedSelectors,
    excludedSelectors,
    includedUnits,
    excludedUnits,
    silentConsole
  }

  return (root, result) => {
    root.walkDecls((decl) => {
      if (shouldBeTransformed(decl, options)) {
        decl.value = `rfs(${decl.value})`
      }
    })
  }
})
