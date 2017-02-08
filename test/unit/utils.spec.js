import assert from 'assert'
import {
  getStyles,
  getMargin,
  getWidth,
  getHeight,
  defaultZero,
  convertPx,
  x,
  y,
  bottom,
  right,
  placeElement,
  sortElements,
  placeFirstElement,
  placeAtTheFirstLine,
  placeAtTheSmallestColumn,
  adjustContainer,
  thereIsSpace
} from '../../src/utils'

describe('getStyles function', () => {
  it('it should return the current styles of the DOM element', () => {
    const element = document.createElement('div')
    element.style.width = '47px'
    document.body.appendChild(element)

    assert.equal(getStyles(element).width, '47px')
  })
})

describe('defaultZero function', () => {
  it('should return zero if the value is evaluated as false', () => {
    assert.equal(defaultZero(false), 0)
    assert.equal(defaultZero(NaN), 0)
    assert.equal(defaultZero(''), 0)
    assert.equal(defaultZero(null), 0)
    assert.equal(defaultZero(undefined), 0)
  })
  it('should return the argument if it is a valid number', () => {
    assert.equal(defaultZero(2), 2)
  })
})

describe('getMargin function', () => {
  describe('getting the margin values', t => {
    const element = document.createElement('div')
    element.style.margin = '5px 10px 58px 9px'
    document.body.appendChild(element)

    it('should return the marginBottom', () => {
      assert.equal(getMargin('Bottom', element), 58)
    })

    it('should return the marginTop', () => {
      assert.equal(getMargin('Top', element), 5)
    })

    it('should return the marginRight', () => {
      assert.equal(getMargin('Right', element), 10)
    })

    it('should return the marginLeft', () => {
      assert.equal(getMargin('Left', element), 9)
    })
  })
  it('should return zero if the margin is not defined', () => {
    const element = document.createElement('div')
    element.style.marginBottom = '5px'
    document.body.appendChild(element)

    assert.equal(getMargin('Top', element), 0)
  })
})

describe('getWidth function', () => {
  it('should return a number', () => {
    const element = document.createElement('div')
    element.style.width = '47px'
    document.body.appendChild(element)

    assert.equal(getWidth(element), 47)
  })
})

describe('getHeight function', () => {
  it('should return a number', () => {
    const element = document.createElement('div')
    element.style.height = '42px'
    document.body.appendChild(element)

    assert.equal(getHeight(element), 42)
  })
})

describe('convertPx function', () => {
  it('should return the number with px unit', () => {
    assert.equal(convertPx(20), '20px')
    assert.equal(convertPx(0), '0px')
  })
})

describe('x function', () => {
  it('should return the horizontal displacement', () => {
    const element = document.createElement('div')
    element.style.left = '40px'

    assert.equal(x(element), 40)
  })
})

describe('y function', () => {
  it('should return the vertical displacement', () => {
    const element = document.createElement('div')
    element.style.top = '29px'

    assert.equal(y(element), 29)
  })
})

describe('bottom function', () => {
  it('should return a number', () => {
    const element = document.createElement('div')
    element.style.top = '10px'
    element.style.height = '45px'
    element.style.marginBottom = '42px'
    document.body.appendChild(element)
    assert.equal(bottom(element), 10 + 45 + 42)
  })
})

describe('right function', () => {
  it('should return a number', () => {
    const element = document.createElement('div')
    element.style.left = '27px'
    element.style.marginRight = '55px'
    element.style.width = '49px'
    document.body.appendChild(element)

    assert.equal(right(element), 27 + 55 + 49)
  })
})

describe('placeElement function', () => {
  const element = document.createElement('div')
  placeElement(element, 55, 27)
  document.body.appendChild(element)

  const actualStyle = window.getComputedStyle(element)

  it('should have position absolute', () => {
    assert.equal(actualStyle.position, 'absolute')
  })
  it('should have 55px of top', () => {
    assert.equal(actualStyle.top, '55px')
  })
  it('should have 27px of left', () => {
    assert.equal(actualStyle.left, '27px')
  })
})

describe('sortElements function', () => {
  it('should sort an array of elements', () => {
    const element1 = document.createElement('div')
    element1.style.top = '5px'
    element1.style.height = '10px'
    element1.style.marginBottom = '20px'
    element1.id = 'first'

    const element2 = document.createElement('div')
    element2.style.top = '15px'
    element2.style.height = '20px'
    element2.style.marginBottom = '30px'
    element2.id = 'second'

    const element3 = document.createElement('div')
    element3.style.top = '10px'
    element3.style.height = '15px'
    element3.style.marginBottom = '25px'
    element3.id = 'third'

    const elements = [element1, element2, element3]
    elements.forEach(el => {
      document.body.appendChild(el)
    })
    const sortedElements = elements.sort(sortElements)

    assert.equal(sortedElements[0].id, 'second')
    assert.equal(sortedElements[1].id, 'third')
    assert.equal(sortedElements[2].id, 'first')
  })
  it('should sort an array of elements', () => {
    const element1 = document.createElement('div')
    element1.style.left = '5px'
    element1.id = 'first'

    const element2 = document.createElement('div')
    element2.style.left = '15px'
    element2.id = 'second'

    const element3 = document.createElement('div')
    element3.style.left = '10px'
    element3.id = 'third'

    const elements = [element1, element2, element3]
    const sortedElements = elements.sort(sortElements)

    assert.equal(sortedElements[0].id, 'second')
    assert.equal(sortedElements[1].id, 'third')
    assert.equal(sortedElements[2].id, 'first')
  })
})

describe('placeFirstElement function', () => {
  it('should place the first element', () => {
    const element = document.createElement('div')
    element.style.marginLeft = '35px'
    document.body.appendChild(element)
    placeFirstElement(element)

    const actualStyle = window.getComputedStyle(element)
    assert.equal(actualStyle.position, 'absolute')
    assert.equal(actualStyle.top, '0px')
    assert.equal(actualStyle.left, '35px')
  })
})

describe('placeAtTheFirstLine function', () => {
  it('should place the elements at the first line', () => {
    const element = document.createElement('div')
    element.style.marginLeft = '20px'

    const previousElement = document.createElement('div')
    previousElement.style.top = '15px'
    previousElement.style.left = '10px'
    previousElement.style.width = '5px'
    previousElement.style.marginRight = '20px'
    document.body.appendChild(previousElement)
    document.body.appendChild(element)

    placeAtTheFirstLine(previousElement, element)

    const actualStyle = window.getComputedStyle(element)
    assert.equal(actualStyle.position, 'absolute')
    assert.equal(actualStyle.top, '15px')
    assert.equal(actualStyle.left, '55px')
  })
})

describe('placeAtTheSmallestColumn function', () => {
  it('should place the elements at the smallest column', () => {
    const element = document.createElement('div')
    element.style.marginTop = '10px'

    const minElement = document.createElement('div')
    minElement.style.top = '9px'
    minElement.style.left = '5px'
    minElement.style.height = '20px'
    minElement.style.marginBottom = '5px'

    document.body.appendChild(element)
    document.body.appendChild(minElement)

    placeAtTheSmallestColumn(minElement, element)

    const actualStyle = window.getComputedStyle(element)
    assert.equal(actualStyle.position, 'absolute')
    assert.equal(actualStyle.top, '44px')
    assert.equal(actualStyle.left, '5px')
  })
})

describe('adjustContainer function', () => {
  it('should set the proper height to the container', () => {
    const container = document.createElement('div')
    const maxElement = document.createElement('div')
    maxElement.style.top = '10px'
    maxElement.style.height = '75px'
    maxElement.style.marginBottom = '15px'
    document.body.appendChild(container)
    document.body.appendChild(maxElement)

    adjustContainer(container, maxElement)
    const actualStyle = window.getComputedStyle(container)
    assert.equal(actualStyle.height, '115px')
  })
})

describe('thereIsSpace function', t => {
  it('should check if still there is space in the line', () => {
    const element1 = document.createElement('div')
    element1.style.left = '5px'
    element1.style.width = '5px'
    element1.style.marginRight = '5px'

    const element2 = document.createElement('div')
    element2.style.width = '10px'
    element2.style.left = '15px'
    element2.style.marginRight = '10px'

    const element3 = document.createElement('div')
    element3.style.width = '30px'

    const container = document.createElement('div')
    container.style.width = '50px'
    document.body.appendChild(container)

    const elements = [element1, element2, element3]
    elements.forEach(el => {
      document.body.appendChild(el)
    })

    assert.ok(thereIsSpace(container, elements, 1))
    assert.ok(!thereIsSpace(container, elements, 2))
  })
})
