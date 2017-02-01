var through = require('through2')
var falafel = require('falafel')

var addToHead = require('./add_to_head')
var getField = require('./get_field')
var findMapboxGlVersion = require('./find_mapboxgl_version')

var pending = true

module.exports = function mapboxglifyTransform () {
  var version = findMapboxGlVersion()

  return through(function (chunk, enc, next) {
    var strIn = chunk.toString('utf-8')

    var strOut = falafel(strIn, function (node) {
      if (pending && isRequireMapboxGlNode(node)) {
        node.update([
          node.source() + ';',
          makeExtra(version)
        ].join('\n'))

        pending = false
      }
    })

    this.push(String(strOut))
    next()
  })
}

function isRequireMapboxGlNode (node) {
  return (
    node.type === 'CallExpression' &&
    node.callee.type === 'Identifier' &&
    node.callee.name === 'require' &&
    node.arguments[0].value === 'mapbox-gl'
  )
}

function makeExtra (version) {
  return [
    iife(addToHead.meta, iife(getField.metaContent)),
    iife(addToHead.link, iife(getField.linkHref, '\'' + version + '\''))
  ].join(';\n')
}

function iife (func, arg) {
  return '(' + func.toString() + ')(' + (arg || '') + ')'
}
