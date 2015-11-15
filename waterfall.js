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
    this._normalize(el, childs)
  }

  this._getOuterHeight = function(el) {
    var styles = window.getComputedStyle(el),
        margin = parseFloat(styles['marginTop']) + 
            parseFloat(styles['marginBottom']) +
            parseFloat(styles['paddingTop']) + 
            parseFloat(styles['paddingBottom']);
    return Math.ceil(el.offsetHeight + margin);
  }

  this._normalize = function(el, childs) {
    el.style.display        = 'flex'
    el.style.flexFlow       = 'column wrap'
    el.style.justifyContent = 'flex-start'
    el.style.alignItems     = 'flex-start'
    var body = document.querySelector('body')
    body.style.boxSizing    = 'border-box'

    this._getGrids(el, childs)
  }

  this._getGrids = function(el, childs) {
    var grids = 0,
        columnWidth = 0,
        containerWidth = el.offsetWidth; 

    for (var i = 0; i <= 10; i++) {
      columnWidth += childs[i].offsetWidth;
      if (columnWidth > containerWidth)
        break;
      ++grids;
    }
    console.log(grids)
    this._orderItems(el, childs, grids);
  }

  this._orderItems = function(el, childs, grids) {
    var self = this,
        time = childs.length,
        current = 0,
        lapse = Math.round(time/grids),
        order = 0,
        inc = 0;
    var maxHeightPerLine = 0,
        totalHeight = 0;
  
    while(order < time) {
      current = ~~current
      childs[order].style.order = current
      maxHeightPerLine = self._getOuterHeight(childs[order])
      ++order
      inc = current
      for (var c = 1; c < grids; c++) {
        inc = inc + lapse
        if (!childs[order]) 
          break;
        childs[order].style.order = inc
        var cHeight = self._getOuterHeight(childs[order])
        if (cHeight > maxHeightPerLine)
          maxHeightPerLine = cHeight
        ++order
      }
      ++current
      totalHeight += maxHeightPerLine
    }

    if (el.style.height < totalHeight / 2){
      el.style.height = (totalHeight + 'px')
    }
    el.style.visibility = 'visible'
  }

  if (typeof window === "object")
    window.waterfall = this.init.bind(this)
}());