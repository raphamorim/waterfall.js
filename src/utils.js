export const getStyles = element => window.getComputedStyle(element)

export const defaultZero = condition => condition || 0

export const getMargin = (position, element) => defaultZero(
  parseFloat(getStyles(element)['margin' + position])
)

export const getWidth = element => element.clientWidth

export const getHeight = element => element.clientHeight

export const convertPx = num => parseFloat(num) + 'px'

export const y = element => parseFloat(element.style.top)

export const x = element => parseFloat(element.style.left)

export const bottom = element =>
  y(element) + getHeight(element) + getMargin('Bottom', element)

export const right = element =>
  x(element) + getWidth(element) + getMargin('Right', element)

export const placeElement = (element, top, left) => {
  element.style.position = 'absolute'
  element.style.top = convertPx(top)
  element.style.left = convertPx(left)
}

export const sortElements = (a, b) =>
  bottom(b) - bottom(a) || x(b) - x(a)

export const placeFirstElement = element => {
  placeElement(element, 0, getMargin('Left', element))
}

export const placeAtTheFirstLine = (previousElement, element) => {
  placeElement(
    element,
    previousElement.style.top,
    right(previousElement) + getMargin('Left', element)
  )
}

export const placeAtTheSmallestColumn = (minElement, element) => {
  placeElement(
    element,
    bottom(minElement) + getMargin('Top', element),
    x(minElement)
  )
}

export const adjustContainer = (container, maxElement) => {
  container.style.height = convertPx(
    bottom(maxElement) + getMargin('Bottom', maxElement)
  )
}

export const thereIsSpace = (container, elements, i) =>
  right(elements[i - 1]) + getWidth(elements[i]) <= getWidth(container)
