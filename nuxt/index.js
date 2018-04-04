/*
    Nuxt.js module for bootstrap-vue

    Usage:
        - Install both bootstrap and bootstrap-vue packages
        - Add this into your nuxt.config.js file:
        {
            modules: [
                'bootstrap-vue/nuxt'
            ]
        }
*/

const { resolve } = require('path')

module.exports = function nuxtBootstrapVue (moduleOptions) {
  // Conditionally require bootstrap original css too if not explicitly disabled
  if (moduleOptions.css !== false) {
    this.options.css.unshift('bootstrap/dist/css/bootstrap.css')
  }

  // Register plugin
  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'bootstrap-vue.js',
    moduleOptions
  })
}

module.exports.meta = require('../package.json')
