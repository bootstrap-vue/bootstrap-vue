const { resolve } = require('path')

// --- Utility methods ---

// Given a list of arguments, pick the first one that is defined
const pickFirst = (...args) => {
  for (const arg of args) {
    if (arg !== undefined) {
      return arg
    }
  }
}

// kekbab-case a PascalCase or camelCase string 
const kebabCaseRE = /\B([A-Z])/g
const kebabCase = str => {
  return str.replace(kebabCaseRE, '-$1').toLowerCase()
}

// Convert a plugin name to its import sub-directory
const pluginToDirRE = /^VB|Plugin$/g
const pluginToDir = plugin => {
  return kebabCase(plugin.replace(pluginToDirRE, ''))
}

// --- Main module ---

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

    // Transpile src/
    this.options.build.transpile.push('bootstrap-vue/src')

    // Base options/methods available to template
    const templateOptions = {
      // Default options
      treeShake: false,
      // Methods
      kebabCase: kebabCase,
      pluginToDir: pluginToDir
    }

    // Specific component and/or directive plugins
    for (const type of ['componentPlugins', 'directivePlugins']) {
      const bvPlugins = Array.isArray(options[type]) ? options[type] : []

      templateOptions[type] = bvPlugins
        // Normalize plugin name to `${Name}Plugin` (component) or `VB${Name}Plugin` (directive)
        // Required for backwards compatability with old plugin import names
        .map(plugin => {
          plugin = type === 'directivePlugins' && !/^VB/.test(plugin) ? `VB${plugin}` : plugin
          plugin = /Plugin$/.test(plugin) ? plugin : `${plugin}Plugin`
          return plugin
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
      src: resolve(__dirname, `plugin.${this.options.dev ? 'dev' : 'prod'}.js`),
      fileName: 'bootstrap-vue.js',
      options: templateOptions
    })
  })
}

module.exports.meta = require('../package.json')
