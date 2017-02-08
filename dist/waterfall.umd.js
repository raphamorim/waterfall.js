(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.waterfall = factory());
}(this, (function () { 'use strict';

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
  container.style.position = 'relative';
  container.style.height = convertPx(
    bottom(maxElement) + getMargin('Bottom', maxElement)
  );
};

var thereIsSpace = function (container, elements, i) { return right(elements[i - 1]) + getWidth(elements[i]) <= getWidth(container); };

function Boundary (firstRow) {
  var els = firstRow.sort(sortElements);

  this.add = function (el) {
    els.push(el);
    els = els.sort(sortElements);
    els.pop();
  };

  this.min = function () { return els[els.length - 1] };
  this.max = function () { return els[0] };
}

var waterfall = function (container) {
  if (typeof (container) === 'string') {
    container = document.querySelector(container);
  }

  var els = container.children;

  if (els.length) {
    placeFirstElement(els[0]);
  }

  for (var i = 1; i < els.length && thereIsSpace(container, els, i); i++) {
    placeAtTheFirstLine(els[i - 1], els[i]);
  }

  var firstRow = [].slice.call(els, 0, i);
  var boundary = new Boundary(firstRow);

  for (; i < els.length; i++) {
    placeAtTheSmallestColumn(boundary.min(), els[i]);
    boundary.add(els[i]);
  }

  adjustContainer(container, boundary.max());
};

return waterfall;

})));
