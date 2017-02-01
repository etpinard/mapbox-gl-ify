'use strict'

var addToHead = require('./lib/add_to_head')
var getField = require('./lib/get_field')

var cache = {}
var prefix = '[mapbox-gl-ify | browser] '

module.exports = function mapboxglifyBrowser (opts) {
  var version

  if (typeof opts === 'string') {
    version = opts
  } else if (typeof opts === 'object') {
    version = opts.version
  } else {
    throw new Error(prefix + 'invalid arguments')
  }

  if (!isValidVersion(version)) {
    throw new Error(prefix + 'invalid mapbox-gl version')
  }

  if (document && document.head && document.head.appendChild) {
    if (!cache.meta) {
      addToHead.meta(getField.metaContent())
      cache.meta = true
    }

    if (!cache.link) {
      addToHead.link(getField.linkHref(version))
      cache.link = true
    }
  } else {
    throw new Error(prefix + 'browser not supported')
  }
}

function isValidVersion (version) {
  if (typeof version !== 'string') return false

  var parts = version.split('.')

  return (
    parts.length === 3 &&
    parts.every(function (p) { return !isNaN(+p) })
  )
}
