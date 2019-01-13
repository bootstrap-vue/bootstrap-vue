/*
    Nuxt.js module for bootstrap-vue

    Usage:
        - Install both Bootstrap and bootstrap-vue packages
        - Add this into your nuxt.config.js file:
            {
                modules: [
                    [
                      'bootstrap-vue/nuxt',
                      {
                        bootstrapCss: true,   // default is true
                        bootstrapVueCss: true // default is true
                      }
                    ]
                ]
            }
        - By default both bootstrap.css and boootstrap-vue.css are included. Set either
          option to false to not include the compiled CSS file(s)
        - The option 'css' has been deprecated in favour of 'bootstrapCss'
*/

const { resolve } = require('path')

const PluginDefaluts = {
  boostrapCss: true,
  boostrapVueCss: true
}

// Main module entry point
module.exports = function nuxtBootstrapVue(moduleOptions = {}) {
  // Merge moduleOptions with default
  const options = Object.assign({}, PluginDefaluts, moduleOptions)

  // Deprecate css option in favour of boostrapCss option
  if (options.css === false) {
    options.bootstrapCss = false
    delete options.css
    try {
      console.warn('BootstrapVue Plugin: option "css" deprecated, use "bootstrapCss" instead')
    } catch (e) {}
  }

  // Conditionally require Bootstrap css if not explicitly disabled
  if (options.bootstrapCss === true) {
    // Add Bootstrap CSS to first in head
    this.options.css.unshift('bootstrap/dist/css/bootstrap.min.css')
  }

  // Register plugin, pasing options to plugin template
  this.addPlugin({
    src: resolve(__dirname, 'plugin.template.js'),
    fileName: 'bootstrap-vue.js',
    options
  })
}

module.exports.meta = require('../package.json')
