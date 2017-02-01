const test = require('tap').test
const utils = require('./utils')
const paths = utils.paths
const opts = { timeout: 1e5 }

test('CLI should work when piped from browserify + indexhtmlify', opts, (t) => {
  var cmd = `${paths.browserify} ${paths.fixture0} | ${paths.indexhtmlify} | ${paths.bin}`

  utils.exec(cmd, (err, stdout) => {
    if (err) t.fail()

    var lines = stdout.split('\n')

    t.equal(lines[2], '<head>')
    t.equal(lines[3], '<title>---</title>')
    t.equal(lines[4], '<meta content="initial-scale=1,maximum-scale=1,user-scalable=no" name="viewport">')
    t.equal(lines[5], '<meta charset=utf-8>')
    t.equal(lines[6], '<link href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.32.1/mapbox-gl.css" rel="stylesheet" />')
    t.equal(lines[7], '</head>')

    utils.run({ html: stdout }, (window, document) => {
      // add element to DOM to check that CSS are getting applied correctly
      var div = document.createElement('div')
      div.className += 'mapboxgl-ctrl-bottom-right'
      document.body.appendChild(div)

      t.equal(window.getComputedStyle(div)['z-index'], '2')

      t.done()
    })
  })
})

test('CLI should work when piped from browserify + indexhtmlify + metadataify', opts, (t) => {
  var cmd = `${paths.browserify} ${paths.fixture1} | ${paths.indexhtmlify} | ${paths.metadataify} --title 'mapbox-gl-ify' | ${paths.bin}`

  utils.exec(cmd, (err, stdout) => {
    if (err) t.fail()

    var lines = stdout.split('\n')

    t.equal(lines[2], '<head>')
    t.equal(lines[3], '<title>mapbox-gl-ify</title>')
    t.equal(lines[4], '<meta content="initial-scale=1,maximum-scale=1,user-scalable=no" name="viewport">')
    t.equal(lines[5], '<meta charset=utf-8><meta name="application-name" content="mapbox-gl-ify">')
    t.equal(lines[6], '<meta name="subject" content="mapbox-gl-ify">')
    t.equal(lines[7], '<meta name="abstract" content="mapbox-gl-ify">')
    t.equal(lines[8], '<meta name="twitter:title" content="mapbox-gl-ify">')
    t.equal(lines[9], '<meta name="description" content="Utility that adds mapbox-gl meta data and CSS link for you">')
    t.equal(lines[10], '<meta name="twitter:description" content="Utility that adds mapbox-gl meta data and CSS link for you">')
    t.equal(lines[11], '<meta name="author" content="&Eacute;tienne T&eacute;treault-Pinard">')
    t.equal(lines[12], '<meta name="twitter:creator" content="&Eacute;tienne T&eacute;treault-Pinard">')
    t.equal(lines[13], '<meta name="twitter:card" content="summary">')
    t.equal(lines[14], '<meta itemprop="title" content="mapbox-gl-ify">')
    t.equal(lines[15], '<meta itemprop="description" content="Utility that adds mapbox-gl meta data and CSS link for you">')
    t.equal(lines[16], '<meta property="og:title" content="mapbox-gl-ify">')
    t.equal(lines[17], '<meta property="og:description" content="Utility that adds mapbox-gl meta data and CSS link for you">')
    t.equal(lines[18], '<meta property="article:author" content="&Eacute;tienne T&eacute;treault-Pinard">')
    t.equal(lines[19], '')
    t.equal(lines[20], '<link href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.32.1/mapbox-gl.css" rel="stylesheet" />')
    t.equal(lines[21], '</head>')

    utils.run({ html: stdout }, (window, document) => {
      // add element to DOM to check that CSS are getting applied correctly
      var div = document.createElement('div')
      div.className += 'mapboxgl-ctrl-bottom-right'
      document.body.appendChild(div)

      t.equal(window.getComputedStyle(div)['z-index'], '2')

      t.done()
    })
  })
})
