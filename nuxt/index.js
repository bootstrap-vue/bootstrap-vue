const { resolve } = require('path')

function pickFirst(...args) {
  for (const arg of args) {
    if (arg !== undefined) {
      return arg
    }
  }
}

module.exports = function nuxtBootstrapVue(moduleOptions = {}) {
  // Merge moduleOptions with default
  const options = {
    ...this.options.bootstrapVue,
    ...moduleOptions
  }

  const bootstrapVueCSS = pickFirst(options.bootstrapVueCSS, options.bootstrapVueCss, options.bvCSS)
  if (bootstrapVueCSS) {
    // Add BootstrapVue CSS
    this.options.css.unshift('bootstrap-vue/dist/bootstrap-vue.css')
  }

  const bootstrapCSS = pickFirst(options.bootstrapCSS, options.bootstrapCss, options.css)
  if (bootstrapCSS) {
    // Add Bootstrap CSS
    this.options.css.unshift('bootstrap/dist/css/bootstrap.css')
  }

  // Transpile src
  this.options.build.transpile.push('bootstrap-vue/src')

  // Register plugin, pasing options to plugin template
  this.addPlugin({
    src: resolve(__dirname, 'plugin.template.js'),
    fileName: 'bootstrap-vue.js'
  })
}

module.exports.meta = require('../package.json')
