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

  // Defaults to `true` if no other options provided
  const bootstrapVueCSS = pickFirst(options.bootstrapVueCSS, options.bootstrapVueCss, options.bvCSS, true)
  if (bootstrapVueCSS) {
    // Add BootstrapVue CSS
    this.options.css.unshift('bootstrap-vue/dist/bootstrap-vue.css')
  }

  // Defaults to `true` if no other options provided
  const bootstrapCSS = pickFirst(options.bootstrapCSS, options.bootstrapCss, options.css, true)
  if (bootstrapCSS) {
    // Add Bootstrap CSS before BootstrapVue CSS
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
