const { resolve } = require('path')

function pickFirst(...args) {
  for (const arg of args) {
    if (arg !== undefined) {
      return arg
    }
  }
}

module.exports = function nuxtBootstrapVue(moduleOptions = {}) {
  const options = Object.assign({}, this.options.bootstrapVue, moduleOptions)

  const bootstrapCSS = pickFirst(options.bootstrapCSS, options.bootstrapCss, options.css)
  if (bootstrapCSS) {
    // Add Bootstrap CSS
    this.options.css.unshift('bootstrap/dist/css/bootstrap.css')
  }

  const bootstrapVueCSS = pickFirst(options.bootstrapVueCSS, options.bootstrapCss, options.bvCSS)
  if (bootstrapVueCSS) {
    // Add BootstrapVue CSS
    this.options.css.unshift('bootstrap-vue/dist/bootstrap-vue.css')
  }

  // Register plugin, pasing options to plugin template
  this.addPlugin({
    src: resolve(__dirname, 'plugin.template.js'),
    fileName: 'bootstrap-vue.js'
  })
}

module.exports.meta = require('../package.json')
