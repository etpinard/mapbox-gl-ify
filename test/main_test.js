const test = require('tap').test
const mapboxglifyMain = require('../')

test('Node module should return a hyperstream object', (t) => {
  var out = mapboxglifyMain()

  t.equal(typeof out.pipe, 'function')
  t.done()
})
