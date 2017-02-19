import assert from 'assert'
import waterfall from '../../src/waterfall'

describe('waterfall main function', () => {
  const container = document.createElement('div')
  container.style.width = '300px'
  container.id = 'container'

  const element1 = document.createElement('div')
  element1.style.height = '40px'
  element1.style.width = '80px'
  element1.style.margin = '10px'
  container.appendChild(element1)

  const element2 = document.createElement('div')
  element2.style.height = '80px'
  element2.style.margin = '0'
  element2.style.width = '100px'
  container.appendChild(element2)

  const element3 = document.createElement('div')
  element3.style.height = '70px'
  element3.style.margin = '0 20px 0 10px'
  element3.style.width = '70px'
  container.appendChild(element3)

  const element4 = document.createElement('div')
  element4.style.height = '50px'
  element4.style.width = '100px'
  element4.style.margin = '0'
  container.appendChild(element4)

  const element5 = document.createElement('div')
  element5.style.height = '40px'
  element5.style.margin = '5px'
  element5.style.width = '90px'
  container.appendChild(element5)

  const element6 = document.createElement('div')
  element6.style.height = '50px'
  element6.style.margin = '15px'
  element6.style.width = '70px'
  container.appendChild(element6)

  document.body.appendChild(container)

  describe('waterfall with DOM element as argument', () => {
    waterfall(container)

    describe('container element', () => {
      const actualStyle = window.getComputedStyle(container)

      it('should have position relative', () => {
        assert.strictEqual(actualStyle.position, 'relative')
      })

      it('should have the proper height', () => {
        assert.strictEqual(actualStyle.height, '175px')
      })
    })

    describe('first element', () => {
      const actualStyle = window.getComputedStyle(element1)

      it('should have position absolute', () => {
        assert.strictEqual(actualStyle.position, 'absolute')
      })

      it('should have the proper top', () => {
        assert.strictEqual(actualStyle.top, '0px')
      })

      it('should have the proper left', () => {
        assert.strictEqual(actualStyle.left, '10px')
      })
    })

    describe('second element', () => {
      const actualStyle = window.getComputedStyle(element2)

      it('should have position absolute', () => {
        assert.strictEqual(actualStyle.position, 'absolute')
      })

      it('should have the proper top', () => {
        assert.strictEqual(actualStyle.top, '0px')
      })

      it('should have the proper left', () => {
        assert.strictEqual(actualStyle.left, '100px')
      })
    })

    describe('third element', () => {
      const actualStyle = window.getComputedStyle(element3)

      it('should have position absolute', () => {
        assert.strictEqual(actualStyle.position, 'absolute')
      })

      it('should have the proper top', () => {
        assert.strictEqual(actualStyle.top, '0px')
      })

      it('should have the proper left', () => {
        assert.strictEqual(actualStyle.left, '210px')
      })
    })

    describe('fourth element', () => {
      const actualStyle = window.getComputedStyle(element4)

      it('should have position absolute', () => {
        assert.strictEqual(actualStyle.position, 'absolute')
      })
      it('should have the proper top', () => {
        assert.strictEqual(actualStyle.top, '50px')
      })

      it('should have the proper left', () => {
        assert.strictEqual(actualStyle.left, '10px')
      })
    })

    describe('fifth element', () => {
      const actualStyle = window.getComputedStyle(element5)

      it('should have position absolute', () => {
        assert.strictEqual(actualStyle.position, 'absolute')
      })

      it('should have the proper top', () => {
        assert.strictEqual(actualStyle.top, '75px')
      })

      it('should have the proper left', () => {
        assert.strictEqual(actualStyle.left, '210px')
      })
    })

    describe('sixth element', () => {
      const actualStyle = window.getComputedStyle(element6)

      it('should have position absolute', () => {
        assert.strictEqual(actualStyle.position, 'absolute')
      })

      it('should have the proper top', () => {
        assert.strictEqual(actualStyle.top, '95px')
      })

      it('should have the proper left', () => {
        assert.strictEqual(actualStyle.left, '100px')
      })
    })
  })

  describe('waterfall with string as argument', () => {
    waterfall('#container')

    it('should be able to receive a string as argument', () => {
      const container = document.querySelector('#container')
      const position = window.getComputedStyle(container).position
      assert.strictEqual(position, 'relative')
    })
  })
})

describe('waterfall without children', () => {
  it('should early return false if the container has no children', () => {
    const container = document.createElement('div')
    console.log(container.children)
    assert.ok(!waterfall(container))
  })
})
