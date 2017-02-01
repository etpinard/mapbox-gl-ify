const test = require('tap').test
const utils = require('./utils')
const paths = utils.paths

test('Browserify transform should work', (t) => {
  var cmd = `${paths.browserify} -t ${paths.index} ${paths.fixture2}`

  utils.exec(cmd, (err, stdout) => {
    if (err) t.fail()

    utils.run({ js: stdout }, (window, document) => {
      t.equal(document.head.innerHTML, [
        '<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">',
        '<link rel="stylesheet" type="text/css" href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.32.1/mapbox-gl.css">'
      ].join(''))

      t.end()
    })
  })
})
