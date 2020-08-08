const postcss = require('postcss')
const postcssRfsAutopilot = require('../index.js')

const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-match'))

describe('Test shouldBeTransformed()', () => {
  let css, beforeTransformation, afterTransformation

  beforeEach(() => {
    css = `p #hello{
      font-size: 18px;
      margin: rfs(10rem);
    }

    body{
      padding: 5px;
    }`

    beforeTransformation = []
    afterTransformation = []

    postcss
      .parse(css, { from: undefined })
      .walkDecls((decl) => {
        beforeTransformation.push({
          selector: decl.parent.selector,
          prop: decl.prop,
          value: decl.value
        })
      })
  })

  describe('if a value is already wrapped in rfs()', () => {
    it('should not be transformed', async () => {
      const options = {

      }

      await postcss([
        postcssRfsAutopilot(options)
      ])
        .process(css, { from: undefined }).then(result => {
          result.root.walkDecls((decl) => {
            afterTransformation.push({
              selector: decl.parent.selector,
              prop: decl.prop,
              value: decl.value
            })
          })
        })

      beforeTransformation.forEach((decl, index) => {
        if (/^rfs/g.test(decl.value)) {
          expect(decl.value).to.equal(afterTransformation[index].value)
        }
      })
    })
  })

  describe('if the unit of a value is not included in includedUnits', () => {
    it('should not be transformed', async () => {
      const options = {
        includedUnits: ['rem']
      }

      await postcss([
        postcssRfsAutopilot(options)
      ])
        .process(css, { from: undefined }).then(result => {
          result.root.walkDecls((decl) => {
            afterTransformation.push({
              selector: decl.parent.selector,
              prop: decl.prop,
              value: decl.value
            })
          })
        })

      beforeTransformation.forEach((decl, index) => {
        if (!/rem/g.test(decl.value)) {
          expect(afterTransformation[index].value).to.not.match(/^rfs/g)
        }
      })
    })
  })

  describe('if the unit of a value is included in excludedUnits', () => {
    it('should not be transformed', async () => {
      const options = {
        excludedUnits: ['px']
      }

      await postcss([
        postcssRfsAutopilot(options)
      ])
        .process(css, { from: undefined }).then(result => {
          result.root.walkDecls((decl) => {
            afterTransformation.push({
              selector: decl.parent.selector,
              prop: decl.prop,
              value: decl.value
            })
          })
        })

      beforeTransformation.forEach((decl, index) => {
        if (/px/g.test(decl.value)) {
          expect(afterTransformation[index].value).to.not.match(/^rfs/g)
        }
      })
    })
  })

  describe('if the unit of a value is included in includedUnits and excludedUnits', () => {
    it('should not be transformed', async () => {
      const options = {
        includedUnits: ['px'],
        excludedUnits: ['px']
      }

      await postcss([
        postcssRfsAutopilot(options)
      ])
        .process(css, { from: undefined }).then(result => {
          result.root.walkDecls((decl) => {
            afterTransformation.push({
              selector: decl.parent.selector,
              prop: decl.prop,
              value: decl.value
            })
          })
        })

      beforeTransformation.forEach((decl, index) => {
        if (/px/g.test(decl.value)) {
          expect(afterTransformation[index].value).to.not.match(/^rfs/g)
        }
      })
    })
  })
})
