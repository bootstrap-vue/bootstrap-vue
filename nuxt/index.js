const { resolve } = require('path')

module.exports = function nuxtBootstrapVue(moduleOptions = {}) {
  this.nuxt.hook('build:before', () => {
    function pickFirst(...args) {
      for (const arg of args) {
        if (arg !== undefined) {
          return arg
        }
      }
    }

    const kebabCase = str =>
      str.replace(
        /([_\s]+([a-zA-Z])|([A-Z]))/g,
        (m, $1, $2, $3, o) => (o ? '-' : '') + ($2 || $3 || '').toLowerCase()
      )
    const pascalCase = str => str.replace(/(^|[-_\s]+)(.)/g, (m, $1, $2) => $2.toUpperCase())

    // Merge moduleOptions with default
    const options = {
      ...this.options.bootstrapVue,
      ...moduleOptions
    }

    const bootstrapVueCSS = pickFirst(
      options.bootstrapVueCSS,
      options.bootstrapVueCss,
      options.bvCSS,
      // Defaults to `true` if no other options provided
      true
    )
    if (bootstrapVueCSS) {
      // Add BootstrapVue CSS
      this.options.css.unshift('bootstrap-vue/dist/bootstrap-vue.css')
    }

    const bootstrapCSS = pickFirst(
      options.bootstrapCSS,
      options.bootstrapCss,
      options.css,
      // Defaults to `true` if no other options provided
      true
    )
    if (bootstrapCSS) {
      // Add Bootstrap CSS
      this.options.css.unshift('bootstrap/dist/css/bootstrap.css')
    }

    // Transpile src
    this.options.build.transpile.push('bootstrap-vue/src')

    const templateOptions = {}

    // TODO: also add support for individual components & directives
    for (const type of ['componentPlugins', 'directivePlugins']) {
      const bvPlugins = Array.isArray(options[type]) ? options[type] : []

      templateOptions[type] = bvPlugins
        // convert everything to kebab
        .map(p => kebabCase(p))
        // remove duplicate items
        .filter((p, i, arr) => arr.indexOf(p) === i)
        .map(pluginDir => {
          const moduleName = (type === 'directivePlugins' ? 'v' : '') + pascalCase(pluginDir)
          return [moduleName, pluginDir]
        })
    }

    // Register plugin, pasing options to plugin template
    this.addPlugin({
      src: resolve(__dirname, 'plugin.template.js'),
      fileName: 'bootstrap-vue.js',
      options: templateOptions
    })
  })
}

module.exports.meta = require('../package.json')
