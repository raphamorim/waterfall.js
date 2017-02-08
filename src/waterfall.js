import {
  placeFirstElement,
  placeAtTheFirstLine,
  placeAtTheSmallestColumn,
  thereIsSpace,
  Boundary,
  adjustContainer
} from './utils'

export default (container) => {
  if (typeof (container) === 'string') {
    container = document.querySelector(container)
  }

  let els = container.children

  if (els.length) {
    placeFirstElement(els[0])
  }

  for (var i = 1; i < els.length && thereIsSpace(container, els, i); i++) {
    placeAtTheFirstLine(els[i - 1], els[i])
  }

  let firstRow = [].slice.call(els, 0, i)
  let boundary = new Boundary(firstRow)

  for (; i < els.length; i++) {
    placeAtTheSmallestColumn(boundary.min(), els[i])
    boundary.add(els[i])
  }

  adjustContainer(container, boundary.max())
}
