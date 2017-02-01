const path = require('path')
const exec = require('child_process').exec
const jsdom = require('jsdom')

const root = path.join(__dirname, '..')
const nmBin = path.join(root, 'node_modules', '.bin')
const fixtures = path.join(__dirname, 'fixtures')

exports.paths = {
  index: path.join(root, 'index.js'),
  bin: path.join(root, 'bin.js'),
  browser: path.join(root, 'browser.js'),

  fixture0: path.join(fixtures, '0.js'),
  fixture1: path.join(fixtures, '1.js'),
  fixture2: path.join(fixtures, '2.js'),

  browserify: path.join(nmBin, 'browserify'),
  indexhtmlify: path.join(nmBin, 'indexhtmlify'),
  metadataify: path.join(nmBin, 'metadataify')
}

// Like child process exec but with an
// increased stdout max size (as bundling mapbox-gl is big!)
exports.exec = function (cmd, cb) {
  const execOpts = { maxBuffer: 1024 * 1000 }

  exec(cmd, execOpts, cb)
}

// create virtual jsdom console for debugging
const virtualConsole = jsdom.createVirtualConsole()
  .on('log', (msg) => { console.log('console.log called ->', msg) })
  .on('jsdomError', (err) => { console.error(err.stack, err.detail) })

// run input html or js in jsDOM with 'proper' error handling
exports.run = function (input, cb) {
  if (!input && !input.html && !input.js) {
    throw new Error('wrong arguments passed to `run`')
  }

  const document = jsdom.jsdom(input.html, { virtualConsole: virtualConsole })
  const window = document.defaultView

  // mock so that mapbox-gl can be loaded in jsdom error-free
  window.URL.createObjectURL = () => {}

  window.addEventListener('error', (evt) => {
    console.error('script error!!', evt.error)
  })

  window.addEventListener('load', () => {
    if (input.js) window.eval(input.js)

    cb(window, document)
    window.close()
  })
}
