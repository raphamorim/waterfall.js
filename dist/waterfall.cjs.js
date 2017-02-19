'use strict';

var getStyles = function (element) { return window.getComputedStyle(element); };

var defaultZero = function (condition) { return condition || 0; };

var getMargin = function (position, element) { return defaultZero(
  parseFloat(getStyles(element)['margin' + position])
); };

var getWidth = function (element) { return element.clientWidth; };

var getHeight = function (element) { return element.clientHeight; };

var convertPx = function (num) { return parseFloat(num) + 'px'; };

var y = function (element) { return parseFloat(element.style.top); };

var x = function (element) { return parseFloat(element.style.left); };

var bottom = function (element) { return y(element) + getHeight(element) + getMargin('Bottom', element); };

var right = function (element) { return x(element) + getWidth(element) + getMargin('Right', element); };

var placeElement = function (element, top, left) {
  element.style.position = 'absolute';
  element.style.top = convertPx(top);
  element.style.left = convertPx(left);
};

var sortElements = function (a, b) { return bottom(b) - bottom(a) || x(b) - x(a); };

var placeFirstElement = function (element) {
  placeElement(element, 0, getMargin('Left', element));
};

var placeAtTheFirstLine = function (previousElement, element) {
  placeElement(
    element,
    previousElement.style.top,
    right(previousElement) + getMargin('Left', element)
  );
};

var placeAtTheSmallestColumn = function (minElement, element) {
  placeElement(
    element,
    bottom(minElement) + getMargin('Top', element),
    x(minElement)
  );
};

var adjustContainer = function (container, maxElement) {
  container.style.height = convertPx(
    bottom(maxElement) + getMargin('Bottom', maxElement)
  );
};

var thereIsSpace = function (container, elements, i) { return right(elements[i - 1]) + getWidth(elements[i]) <= getWidth(container); };

var waterfall = function (container) {
  if (typeof (container) === 'string') {
    container = document.querySelector(container);
  }

  if (!container.children.length) {
    return false
  }

  var els = container.children;

  container.style.position = 'relative';

  var boundary = [];

  placeFirstElement(els[0]);
  boundary.push(els[0]);

  for (var i = 1; i < els.length && thereIsSpace(container, els, i); i++) {
    placeAtTheFirstLine(els[i - 1], els[i]);
    boundary.push(els[i]);
  }

  for (; i < els.length; i++) {
    boundary.sort(sortElements);
    placeAtTheSmallestColumn(boundary.pop(), els[i]);
    boundary.push(els[i]);
  }

  boundary.sort(sortElements);
  adjustContainer(container, boundary[0]);
};

module.exports = waterfall;
