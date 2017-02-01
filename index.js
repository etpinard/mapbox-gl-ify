var fs = require('fs')

var mapboxglifyMain = require('./lib/main')
var mapboxglifyTransform = require('./lib/transform')

// Similar pattern then in
// https://github.com/scijs/cwise/blob/master/cwise.js
//
// MIT License
// Copyright (c) 2013 Mikola Lysenko

module.exports = function (arg) {
  if (typeof arg === 'string' && fs.existsSync(arg)) {
    return mapboxglifyTransform(arg)
  } else {
    return mapboxglifyMain()
  }
}
