const postcss = require('postcss')
const postcssRfsAutopilot = require('../index.js')

const chai = require('chai')
const expect = chai.expect

describe('Test shouldBeTransformed()', function () {
  let css

  beforeEach(function () {
    css = `p #hello{
      font-size: 18px;
      margin: rfs(10rem);
    }

    body{
      padding: 5px;
    }`
  })

  describe('if a value is already wrapped in rfs()', function () {
    it('should not be transformed', async function (done) {
      const options = {

      }

      const result = await postcss([
        postcssRfsAutopilot(options)
      ]).process(css, { from: undefined }).then(result => result.css)

      console.log(result)
      done()
    })
  })

  describe('if the unit of a value is not included in includedUnits', function () {
    it('should not be transformed', function (done) {
      done()
    })
  })

  describe('if the unit of a value is included in excludedUnits', function () {
    it('should not be transformed', function (done) {
      done()
    })
  })
})
