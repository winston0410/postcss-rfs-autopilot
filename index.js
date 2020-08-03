let postcss = require('postcss')
const {
  requiredParam
} = require('./utilities/helper.js')

module.exports = postcss.plugin('postcss-rfs-autopilot', ({ rulesToTransform, unitToTransform, selectorToIgnore}) => {
  const options = {
    rulesToTransform: rulesToTransform || requiredParam('rulesToTransform'),
    unitToTransform: unitToTransform || requiredParam('unitToTransform'),
    selectorToIgnore: selectorToIgnore
  }
  // Work with options here

  return (root, result) => {

    // Transform CSS AST here

  }
})
