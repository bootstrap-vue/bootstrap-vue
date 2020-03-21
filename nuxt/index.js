const { resolve } = require('path')

// --- Constants ---

const RX_UN_KEBAB = /-(\w)/g
const RX_HYPHENATE = /\B([A-Z])/g

// Path to index file when using bootstrap-vue source code
const srcIndex = 'bootstrap-vue/src/index.js'

// --- Utility methods ---

// Converts PascalCase or camelCase to kebab-case
const kebabCase = str => {
  return str.replace(RX_HYPHENATE, '-$1').toLowerCase()
}

// Converts a kebab-case or camelCase string to PascalCase
const pascalCase = str => {
  str = kebabCase(str).replace(RX_UN_KEBAB, (_, c) => (c ? c.toUpperCase() : ''))
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const pickFirst = (...args) => {
  for (const arg of args) {
    if (arg !== undefined) {
      return arg
    }
  }
}

// --- Main Nuxt.js module ---
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

    // Component src prop resolving
    this.options.build.loaders.vue.transformAssetUrls = {
      // Nuxt default is missing `poster` for video
      video: ['src', 'poster'],
      // Nuxt default is missing image
      image: 'xlink:href',
      // Add BootstrapVue specific component asset items
      'b-avatar': 'src',
      'b-img': 'src',
      'b-img-lazy': ['src', 'blank-src'],
      'b-card': 'img-src',
      'b-card-img': 'src',
      'b-card-img-lazy': ['src', 'blank-src'],
      'b-carousel-slide': 'img-src',
      'b-embed': 'src',
      // Ensure super supplied values/overrides are not lost
      ...this.options.build.loaders.vue.transformAssetUrls
    }

    // Enable transpilation of `src/` directory
    this.options.build.transpile.push('bootstrap-vue/src')

    // Use pre-transpiled or `src/`
    const usePretranspiled = pickFirst(options.usePretranspiled, this.options.dev, false)
    if (!usePretranspiled) {
      // Use bootstrap-vue source code for smaller prod builds
      // by aliasing 'bootstrap-vue' to the source files
      this.extendBuild(config => {
        if (!config.resolve.alias) {
          config.resolve.alias = {}
        }
        const index = require.resolve(srcIndex)
        const srcDir = index.replace(/index\.js$/, '')
        // We prepend a $ to ensure that it is only used for
        // `import from 'bootstrap-vue'` not `import from 'bootstrap-vue/*'`
        config.resolve.alias['bootstrap-vue$'] = index
        // If users are still cherry-picking modules from esm/ or es/ (legacy),
        // alias them to src/ to prevent duplicate code imports
        config.resolve.alias['bootstrap-vue/esm/'] = srcDir
        config.resolve.alias['bootstrap-vue/es/'] = srcDir
      })
    }

    // Base options available to template
    const templateOptions = {
      // Flag if we are tree shaking
      treeShake: false,
      icons: !!options.icons
    }

    // Specific component and/or directive plugins
    for (const type of ['componentPlugins', 'directivePlugins']) {
      const bvPlugins = Array.isArray(options[type]) ? options[type] : []

      templateOptions[type] = bvPlugins
        // Normalize plugin name to `${Name}Plugin` (component) or `VB${Name}Plugin` (directive)
        // Required for backwards compatibility with old plugin import names
        .map(plugin => {
          // Ensure PascalCase name
          plugin = pascalCase(plugin)
          // Ensure new naming convention for directive plugins prefixed with `VB`
          plugin = type === 'directivePlugins' && !/^VB/.test(plugin) ? `VB${plugin}` : plugin
          // Ensure prefixed with `Plugin`
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
        // Ensure PascalCase name
        .map(item => pascalCase(item))
        // Ensure prefixed with `V`
        .map(item => (type === 'directives' && !/^V/.test(item) ? `V${item}` : item))
        // Remove duplicate items
        .filter((item, i, arr) => arr.indexOf(item) === i)

      if (templateOptions[type].length > 0) {
        templateOptions.treeShake = true
      }
    }

    // If tree shaking, and icons requested, add in
    // the IconsPlugin if not already specified
    if (
      templateOptions.treeShake &&
      templateOptions.icons &&
      templateOptions.componentPlugins.indexOf('IconsPlugin') === -1 &&
      templateOptions.componentPlugins.indexOf('BootstrapVueIcons') === -1
    ) {
      templateOptions.componentPlugins.push('IconsPlugin')
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
