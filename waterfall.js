/*!
   --------------------------------
   Waterfall.js
   --------------------------------
   + https://github.com/raphamorim/waterfall
   + version 1.0.0
   + Copyright 2015 Raphael Amorim
   + Licensed under the MIT license
   + Documentation: https://github.com/raphamorim/waterfall
*/

;(function() {
  this.defaults = {
    container: '.waterfall',
    items: '.item',
  };

  this.init = function(sel, items) {
    var el = document.querySelector((sel || this.defaults.container))
    if (!el)
      return console.log('Waterfall.js: Element doens\'t exists!')

    var childs = document.querySelectorAll((items || this.defaults.items))
    el.style.visibility = 'hidden'
    this._getColumnsNumber(el, childs)
  }

  this._getOuterHeight = function(el) {
    var styles = window.getComputedStyle(el),
        margin = parseFloat(styles['marginTop']) + 
            parseFloat(styles['marginBottom']) +
            parseFloat(styles['paddingTop']) + 
            parseFloat(styles['paddingBottom']);
    return Math.ceil(el.offsetHeight + margin);
  }

  this._getColumnsNumber = function(el, childs) {
    var ncols = 0,
        columnWidth = 0,
        containerWidth = el.offsetWidth; 

    for (var i = 0; i <= 10; i++) {
      columnWidth += childs[i].offsetWidth;
      if (columnWidth > containerWidth)
        break;
      ++ncols;
    }
    
    this._normalize(el, childs, ncols);
  }

  this._normalize = function(el, childs, grids) {
    el.style.columnGap = '10px'
    el.style.columnCount = grids
    el.style.columnFill = 'balance'
    el.style.webkitColumnGap = '10px'
    el.style.webkitColumnCount = grids
    el.style.webkitColumnFill = 'balance'
    el.style.MozColumnGap = '15px'
    el.style.MozColumnCount = grids
    el.style.MozColumnFill = 'balance'

    this._insertElements(el, childs, this._orderGrid, this._getMaxHeight, grids)
  }

  this._orderGrid = function(childs, ncols) {
    var self = this,
        nelms = childs.length,
        list = [],
        columns = [],
        ncolsRange = self._range(ncols);

    for (var i = 0; i < ncols; i++) {      
      var columnRange = self._range(ncolsRange[i] + ncols, nelms, ncols);
      columnRange.unshift(ncolsRange[i]);
      list = list.concat(columnRange);
      columns.push(columnRange);
    }
    return [list, columns];
  }

  this._insertElements = function(el, elms, orderingFunction, getMaxHeight, ncols) {
    var ordering = orderingFunction(elms, ncols),
        list = ordering[0],
        columns = ordering[1];

    el.innerHTML = '';
    for (var i = 0; i < elms.length; i++) {
      el.appendChild(elms[list[i]]);
    }

    this._adjustGrid(el, elms, columns, ncols);
    el.style.visibility = 'visible';
  }

  this._createElement = function(el, parent, height) {
    var div = document.createElement('div'),
        content = document.createTextNode(''); 
    div.style.height = (height + 'px');
    div.style.background = 'transparent';
    div.classList.add('item');
    el.insertBefore(div, parent);
  }

  this._adjustGrid = function(el, elms, columns, ncols) {
    var sizes = this._range(ncols),
        maxHeight = 0,
        diff = 0;
    for (var i = 0; i < columns.length; i++) {
      for (var y = 0; y < columns[i].length; y++) {
        sizes[i] += elms[columns[i][y]].offsetHeight;
      }
      if (sizes[i] > maxHeight)
        maxHeight =  sizes[i]
    }

    for (var i = 0; i < (columns.length - 1); i++) {
      diff = Math.abs(maxHeight - sizes[i]);
      this._createElement(el, elms[columns[i+1][0]], diff)
    }
  }

  this._range = function(start, stop, step) {
    if (typeof stop == 'undefined') {
      stop = start;
      start = 0;
    }

    if (typeof step == 'undefined')
      step = 1;

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop))
      return [];

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
      result.push(i);
    }

    return result;
  };

  if (typeof window === "object")
    window.waterfall = this.init.bind(this)
}());