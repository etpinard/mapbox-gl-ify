var hyperstream = require('hyperstream')

var getField = require('./get_field')
var findMapboxGlVersion = require('./find_mapboxgl_version')

module.exports = function mapboxglifyMain () {
  var version = findMapboxGlVersion()

  // N.B. the viewport meta tag is already generated
  // via `indexhtmlify, so here modify it

  // TODO generalize: override version

  return hyperstream({
    'meta[name="viewport"]': {
      content: getField.metaContent()
    },
    'head': {
      _appendHtml: makeLinkHtml(version)
    }
  })
}

function makeLinkHtml (version) {
  return '\n<link href="' + getField.linkHref(version) + '" rel="stylesheet" />\n'
}
