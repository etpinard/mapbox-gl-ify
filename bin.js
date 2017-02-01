#! /usr/bin/env node

var mapboxglifyMain = require('./lib/main.js')

if (process.stdin.isTTY) {
  console.error([
    'USAGE:',
    '...'
  ].join('\n'))
  process.exit(1)
}

process.stdin
  .pipe(mapboxglifyMain())
  .pipe(process.stdout)
