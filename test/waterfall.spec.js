import test from 'tape'
import browserEnv from 'browser-env'
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
} from '../src/utils'

browserEnv(['document', 'window'])

test('getStyles function', t => {
  const element = document.createElement('div')
  element.style.width = '47.2px'

  t.equal(
    getStyles(element).width,
    '47.2px',
    'it should return the current styles of the DOM element')
  t.end()
})

test('defaultZero function', t => {
  t.equal(defaultZero(false), 0)
  t.equal(defaultZero(2), 2)
  t.equal(defaultZero(NaN), 0)
  t.equal(defaultZero(''), 0)
  t.equal(defaultZero(null), 0)
  t.equal(defaultZero(undefined), 0)
  t.end()
})

test('getMargin function', t => {
  const element = document.createElement('div')
  element.style.margin = '5px 10px 58px 9px'

  t.equal(getMargin('Top', element), 5)
  t.equal(getMargin('Right', element), 10)
  t.equal(getMargin('Bottom', element), 58)
  t.equal(getMargin('Left', element), 9)
  t.end()
})

test('getMargin function', t => {
  const element = document.createElement('div')
  element.style.marginBottom = '5px'

  t.equal(
    getMargin('Top', element),
    0,
    'should return zero if the margin is not defined')
  t.end()
})

test('getWidth function', t => {
  const element = document.createElement('div')
  element.style.width = '47px'

  t.equal(getWidth(element), 47, 'should return a number')
  t.end()
})

test('getWidth function', t => {
  const element = document.createElement('div')

  t.equal(getWidth(element), 0, 'should return zero')
  t.end()
})

test('getHeight function', t => {
  const element = document.createElement('div')
  element.style.height = '42px'

  t.equal(getHeight(element), 42, 'should return a number')
  t.end()
})

test('getHeight function', t => {
  const element = document.createElement('div')

  t.equal(getHeight(element), 0, 'should return zero')
  t.end()
})

test('convertPx function', t => {
  t.equal(convertPx(20), '20px')
  t.equal(convertPx(0), '0px')
  t.end()
})

test('x function', t => {
  const element = document.createElement('div')
  element.style.left = '40px'

  t.equal(x(element), 40, 'should return the horizontal displacement')
  t.end()
})

test('y function', t => {
  const element = document.createElement('div')
  element.style.top = '29px'

  t.equal(y(element), 29, 'should return the vertical displacement')
  t.end()
})

test('bottom function', t => {
  const element = document.createElement('div')
  element.style.top = '10px'
  element.style.height = '45px'
  element.style.marginBottom = '42px'

  t.equal(bottom(element), 10 + 45 + 42, 'should return a number')
  t.end()
})

test('right function', t => {
  const element = document.createElement('div')
  element.style.left = '27px'
  element.style.marginRight = '55px'
  element.style.width = '49px'

  t.equal(right(element), 27 + 55 + 49, 'should return a number')
  t.end()
})

test('placeElement function', t => {
  const element = document.createElement('div')
  placeElement(element, 55, 27)

  const actualStyle = window.getComputedStyle(element)

  t.equal(actualStyle.position, 'absolute', 'should have position absolute')
  t.equal(actualStyle.top, '55px', 'should have 55px of top')
  t.equal(actualStyle.left, '27px', 'should have 27px of left')
  t.end()
})

test('sortElements function', t => {
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
  const sortedElements = elements.sort(sortElements)

  t.equal(sortedElements[0].id, 'second')
  t.equal(sortedElements[1].id, 'third')
  t.equal(sortedElements[2].id, 'first')
  t.end()
})

test('sortElements function', t => {
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

  t.equal(sortedElements[0].id, 'second')
  t.equal(sortedElements[1].id, 'third')
  t.equal(sortedElements[2].id, 'first')
  t.end()
})

test('placeFirstElement function', t => {
  const element = document.createElement('div')
  element.style.marginLeft = '35px'
  placeFirstElement(element)

  const actualStyle = window.getComputedStyle(element)
  t.equal(actualStyle.position, 'absolute')
  t.equal(actualStyle.top, '0px')
  t.equal(actualStyle.left, '35px')
  t.end()
})

test('placeAtTheFirstLine function', t => {
  const element = document.createElement('div')
  element.style.marginLeft = '20px'

  const previousElement = document.createElement('div')
  previousElement.style.top = '15px'
  previousElement.style.left = '10px'
  previousElement.style.width = '5px'
  previousElement.style.marginRight = '20px'

  placeAtTheFirstLine(previousElement, element)

  const actualStyle = window.getComputedStyle(element)
  t.equal(actualStyle.position, 'absolute')
  t.equal(actualStyle.top, '15px')
  t.equal(actualStyle.left, '55px')
  t.end()
})

test('placeAtTheSmallestColumn function', t => {
  const element = document.createElement('div')
  element.style.marginTop = '10px'

  const minElement = document.createElement('div')
  minElement.style.top = '9px'
  minElement.style.left = '5px'
  minElement.style.height = '20px'
  minElement.style.marginBottom = '5px'

  placeAtTheSmallestColumn(minElement, element)

  const actualStyle = window.getComputedStyle(element)
  t.equal(actualStyle.position, 'absolute')
  t.equal(actualStyle.top, '44px')
  t.equal(actualStyle.left, '5px')
  t.end()
})

test('adjustContainer function', t => {
  const container = document.createElement('div')
  const maxElement = document.createElement('div')
  maxElement.style.top = '10px'
  maxElement.style.height = '75px'
  maxElement.style.marginBottom = '15px'

  adjustContainer(container, maxElement)
  const actualStyle = window.getComputedStyle(container)
  t.equal(actualStyle.position, 'relative')
  t.equal(actualStyle.height, '115px')
  t.end()
})

test('thereIsSpace function', t => {
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

  const elements = [element1, element2, element3]

  t.ok(thereIsSpace(container, elements, 1))
  t.notOk(thereIsSpace(container, elements, 2))
  t.end()
})
