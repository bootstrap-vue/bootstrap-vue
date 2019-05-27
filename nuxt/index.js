const { resolve } = require('path')

// --- Utility methods ---

const pickFirst = (...args) => {
  for (const arg of args) {
    if (arg !== undefined) {
      return arg
    }
  }
}

// --- Module handler ---

module.exports = function nuxtBootstrapVue(moduleOptions = {}) {
  this.nuxt.hook('build:before', () => {
    // Merge moduleOptions with default
    const options = {
      ...this.options.bootstrapVue,
      ...moduleOptions
    }

    // Ensure we have arrays
    this.options.css = [].concat(this.options.css || [])
    this.options.build.transpile = [].concat(this.options.build.transpile || [])

    // Include Bootstrap Vue CSS?
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

    // Include Bootstrap CSS?
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

    // Transpile src/
    this.options.build.transpile.push('bootstrap-vue/src')

    // Use es/ or src/ ?
    const usePretranspiled = pickFirst(options.usePretranspiled, this.options.dev)

    // Template base options
    const templateOptions = {
      dist: usePretranspiled ? 'es' : 'src',
      treeShake: false
    }

    // Specific component and/or directive plugins
    for (const type of ['componentPlugins', 'directivePlugins']) {
      const plugins = Array.isArray(options[type]) ? options[type] : []

      templateOptions[type] = plugins
        // Normalize plugin name to `${Name}Plugin` (component) or `VB${Name}Plugin` (directive)
        // Required for backwards compatability with old plugin import names
        .map(p => {
          const plugin = type === 'directivePlugins' && !/^VB/.test(p) ? `VB${p}` : p
          return /Plugin$/.test(plugin) ? plugin : `${plugin}Plugin`
        })
        // Remove duplicate items
        .filter((plugin, i, arr) => arr.indexOf(plugin) === i)

      if (templateOptions[type].length > 0) {
        templateOptions.treeShake = true
      }
    }

    // Specific components and/or directives
    for (const type of ['components', 'directives']) {
      const ComponentsOrDirectives = Array.isArray(options[type]) ? options[type] : []

      templateOptions[type] = ComponentsOrDirectives
        // Remove duplicate items
        .filter((item, i, arr) => arr.indexOf(item) === i)

      if (templateOptions[type].length > 0) {
        templateOptions.treeShake = true
      }
    }

    // Add BootstrapVue configuration if present
    if (options.config && Object.prototype.toString.call(options.config) === '[object Object]') {
      templateOptions.config = { ...options.config }
    }

    // Register plugin, passing options to plugin template
    this.addPlugin({
      src: resolve(__dirname, 'plugin.template.js'),
      fileName: 'bootstrap-vue.js',
      options: templateOptions
    })
  })
}

module.exports.meta = require('../package.json')
