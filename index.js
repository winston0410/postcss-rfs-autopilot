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
    root.walkRules((rule) => {
      options.rulesToTransform.forEach((desiredRuleToTransform) => {
        //Find all rules the user want to apply RFS to
        rule.walkDecls(desiredRuleToTransform, (decl) => {
          //Check if rfs() has already applied to the value
          if( ! /^rfs/g.test(decl)){
            console.log('RFS declaration not found. Apply transformation here.')
            console.log(decl);
          }
        })
      })
    })
  }
})
