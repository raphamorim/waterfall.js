import {
  placeFirstElement,
  placeAtTheFirstLine,
  placeAtTheSmallestColumn,
  thereIsSpace,
  adjustContainer,
  sortElements
} from './utils'

export default container => {
  if (typeof (container) === 'string') {
    container = document.querySelector(container)
  }

  if (!container.children) {
    return false
  }

  const els = container.children

  container.style.position = 'relative'

  let boundary = []

  if (els.length) {
    placeFirstElement(els[0])
    boundary.push(els[0])
  }

  for (var i = 1; i < els.length && thereIsSpace(container, els, i); i++) {
    placeAtTheFirstLine(els[i - 1], els[i])
    boundary.push(els[i])
  }

  for (; i < els.length; i++) {
    boundary.sort(sortElements)
    placeAtTheSmallestColumn(boundary.pop(), els[i])
    boundary.push(els[i])
  }

  boundary.sort(sortElements)
  adjustContainer(container, boundary[0])
}
