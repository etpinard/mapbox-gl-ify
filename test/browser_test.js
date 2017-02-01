const test = require('tap').test
const utils = require('./utils')
const paths = utils.paths

var cmd = `${paths.browserify} ${paths.browser} -s mapboxglify`

var shouldThrow = [
  undefined,
  null,
  10,
  { stuff: 'not-gonna-work' },
  'x,y,z'
]

var shouldNotThrow = [
  '0.31.0',
  { version: '0.20.1' }
]

utils.exec(cmd, (err, stdout) => {
  if (err) throw err

  test('Browser module handle invalid input', (t) => {
    utils.run({ js: stdout }, (window, document) => {
      var mapboxglify = window.mapboxglify

      t.equal(typeof mapboxglify, 'function')

      shouldThrow.forEach((v) => {
        t.throws(() => { mapboxglify(v) })
      })

      shouldNotThrow.forEach((v) => {
        t.doesNotThrow(() => { mapboxglify(v) })
      })

      t.end()
    })
  })

  test('Browser module should only attach mapbox-gl meta and CSS once per page', (t) => {
    var version = '0.31.1'

    utils.run({ js: stdout }, (window, document) => {
      var mapboxglify = window.mapboxglify

      var assert = () => {
        t.equal(document.head.innerHTML, [
          '<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">',
          '<link rel="stylesheet" type="text/css" href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.31.1/mapbox-gl.css">'
        ].join(''))
      }

      mapboxglify(version)
      assert()
      mapboxglify({ version: version })
      assert()
      mapboxglify(version)
      assert()
      mapboxglify({ version: version })
      assert()

      t.end()
    })
  })
})
