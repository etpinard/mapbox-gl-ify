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
