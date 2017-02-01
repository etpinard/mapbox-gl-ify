var pkgUp = require('pkg-up')

module.exports = function findMapboxGlVersion () {
  var pathToMapboxGl = require.resolve('mapbox-gl')
  var pathToMapboxGlPkg = pkgUp.sync(pathToMapboxGl)
  var pkg = require(pathToMapboxGlPkg)

  return pkg.version
}
