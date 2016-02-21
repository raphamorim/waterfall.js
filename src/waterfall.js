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

function waterfall(container){
    if(typeof(container) === 'string')
        container = document.querySelector(container);

    container.style.position = 'relative';

    var boundary = [],
        // Freeze the list of nodes
        els = [].map.call(container.children, function(el){
            el.style.position = 'absolute';
            return el;
        });

    function style(el){ return window.getComputedStyle(el); }
    function margin(name, el){ return parseFloat(style(el)['margin' + name]) || 0; }

    function px(n){ return n + 'px'; }
    function y(el){ return parseFloat(el.style.top) ; }
    function x(el){ return parseFloat(el.style.left); }
    function width(el){ return parseFloat(style(el).width); }
    function height(el){ return parseFloat(style(el).height); }
    function bottom(el){ return y(el) + height(el) + margin('Bottom', el); }
    function right(el){ return x(el) + width(el) + margin('Right', el); }

    function sort(l){
        l = l.sort(function(a, b){
            var bottom_diff = bottom(b) - bottom(a);
            return bottom_diff || x(b) - x(a);
        });
    }


    function placeEl(el, top, left){
        el.style.top = top;
        el.style.left = left;
        boundary.push(el);
    }

    // Deal with the first element.
    if(els.length){
        placeEl(els[0], '0px', px(margin('Left', els[0])));
    }

    // Deal with the first line.
    for(var i = 1; i < els.length; i++){
        var prev = els[i - 1],
        el = els[i],
        thereIsSpace = right(prev) + width(el) <= width(container);
        if(!thereIsSpace) break;
        placeEl(el, prev.style.top, px(right(prev) + margin('Left', el)));
    }

    // Place following elements at the bottom of the smallest column.
    for(; i < els.length; i++){
        sort(boundary);
        var el = els[i],
            minEl = boundary.pop();
        placeEl(el, px(bottom(minEl) + margin('Top', el)), px(x(minEl)));
    }

    sort(boundary);
    var maxEl = boundary[0];
    container.style.height = px(bottom(maxEl) + margin('Bottom', maxEl));
}
