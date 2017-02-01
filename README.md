# mapbox-gl-ify

Utility that adds `mapbox-gl` meta data and CSS link for you :tada:.

## Why?

From `mapbox-gl` example
[page](https://www.mapbox.com/mapbox-gl-js/examples/)), Mapbox recommend using
this HTML skeleton:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8' />
    <title></title>
    <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
    <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.30.0/mapbox-gl.js'></script>
    <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.30.0/mapbox-gl.css' rel='stylesheet' />
    <style>
        body { margin:0; padding:0; }
        #map { position:absolute; top:0; bottom:0; width:100%; }
    </style>
</head>
<body>
	// !!! JS code goes here !!!
</body>
</html>

```

But, if you like me to develop your prototypes using `budo` and build examples
using `browserify`, including the correct `<meta>` and CSS `<link>` elements
for `mapbox-gl` can become a pain. 

By automating this process in, `mapbox-gl-ify` should make this process a
little more pain-free.

### Installation 

For browserify transform, browser module, node API or package.json script
usage:

```bash
npm install mapbox-gl-ify
```

For CLI usage:

```bash
npm install -g mapbox-gl-ify
```

### Usage

### Browserify transform

Given an `index.js` file with:

```
var mapboxgl = require('mapbox-gl')

// ...
```

for quick prototyping with `budo`:

```bash
budo -t mapbox-gl-ify index.js
```

or browserify:

```bash
browserify -t mapbox-gl-ify index.js > bundle.js
```

`mapbox-gl-ify` will add document append calls in the resulting JS bundle.


### CLI utility

To publish your examples, Pipe `indexhtmlify` output:


```bash
browserify index.js | indexhtmlify | mapbox-gl-ify
```

or combine with `metadataify`:

```bash
browserify index.js | indexhtmlify | metadataify | mapbox-gl-ify
```

`mapbox-gl-ify` adds the correct `<meta>` and `<link>` elements into the
resulting HTML file.


### CommonJS module for browsers

In browserify transform are too magical for you, you can also require
`mapbox-gl-ify` as a CommonJS module:

```js
// in index.js

var mapboxgl = require('mapbox-gl')
require('mapbox-gl-ify')(mapboxgl)
```

where `mapbox-gl-ify` appends using JavaScript the correct `mapbox-gl` meta and
CSS link to the DOM `<head>`.

### UMD module

using https://unpkg.com/#/

```html
<script src="mapboxgl"></script>
<script src="mapbox-gl-ify"></script>
```

_add example in codepen_
