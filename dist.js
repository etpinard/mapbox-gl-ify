(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./lib/add_to_head":2,"./lib/get_field":3}],2:[function(require,module,exports){
exports.meta = function (content) {
  var meta = document.createElement('meta')
  meta.setAttribute('name', 'viewport')
  meta.setAttribute('content', content || '')
  document.head.appendChild(meta)
}

exports.link = function (href) {
  var link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.setAttribute('href', href || '')
  document.head.appendChild(link)
}

},{}],3:[function(require,module,exports){
exports.metaContent = function () {
  return 'initial-scale=1,maximum-scale=1,user-scalable=no'
}

exports.linkHref = function (version) {
  return 'https://api.tiles.mapbox.com/mapbox-gl-js/v' + version + '/mapbox-gl.css'
}

},{}]},{},[1]);
