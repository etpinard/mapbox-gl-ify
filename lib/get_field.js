exports.metaContent = function () {
  return 'initial-scale=1,maximum-scale=1,user-scalable=no'
}

exports.linkHref = function (version) {
  return 'https://api.tiles.mapbox.com/mapbox-gl-js/v' + version + '/mapbox-gl.css'
}
