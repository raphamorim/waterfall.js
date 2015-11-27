# Waterfall.js

> Tired of use creepy hacks or heavy ways to Grid based on Pinterest works?

1KB and Works without any dependency \o/

## The "Why"

Currently the best option today to do this job is Masonry, but it's very heavy and have full dependency of jQuery. This isn't a problem is most cases, but when perfomance and page weight matters the best case is try other options: maybe pure CSS? Impossible?

Have a good point at this question. Yes, exists CSS ways to solve this, using flexbox or columns technic, but doesn't work well when you don't know about your data/structure. So we have to use JavaScript. The challenge is create a decent algorithm where no matter the structure: Waterfall will work.

However, Waterfall Always is consider items with **same width** :)

Grid Example: 

| (w:200px) (w:200px) (w:200px) |
| (w:200px) (w:200px) (w:200px) |
| (w:200px) (w:200px) (w:200px) |
| (w:200px) (w:200px) (w:200px) |

## How to Use?

#### Getting

First at all, get Waterfall using [Download Option](https://github.com/raphamorim/waterfall/archive/master.zip) or via bower. To get using [Bower](http://bower.io) just run this command

```sh
bower install waterfall
```

Add the source before body tag end:

```html
<script src="waterfall.min.js"></script>
</body>
```

#### Usage

Define your grid structure:

```html
<div class="grid">
    <div class="item">Solid Snake</div>
    <div class="item">Riou</div>
    <div class="item">Jack Russel</div>
</div>
```

Call Waterfall function with your grid as a argument and let the magic happens :)

```javascript

waterfall('.grid');
// or
var grid = document.querySelector('.grid');
waterfall(grid);

```

## Credits

A special thanks to [@israelst](http://github.com/israelst) and [@eduardostalinho](https://github.com/eduardostalinho).

## License

The MIT License (MIT)

Copyright (c) 2015 [Raphael Amorim](http://github.com/raphamorim)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
