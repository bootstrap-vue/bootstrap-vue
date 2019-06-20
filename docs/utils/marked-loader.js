// Based on https://github.com/peerigon/markdown-loader/
// Converts markdown files into HTML format
// Config options are passed directly to marked
// - https://marked.js.org/#/USING_ADVANCED.md#options

const marked = require('marked')
const { getOptions } = require('loader-utils')

module.exports = function(markdown) {
  // merge params and default config
  const options = getOptions(this)
  // Make results cacheable
  this.cacheable()
  // Pass our options
  marked.setOptions(options)
  // Return the converted file as HTML
  const html = marked(markdown) || ''
  // Mark certain elements as translate="no"
  return html.replace(/<(kbd|code|samp)>/gi, '<$1 class="notranslate" translate="no">')
}
