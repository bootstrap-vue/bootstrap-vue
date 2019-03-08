const fs = require('fs')
const path = require('path')
const hljs = require('highlightjs')
const marked = require('marked')

const renderer = new marked.Renderer()

const ANCHOR_LINK_HEADING_LEVELS = [2, 3, 4, 5]

// Custom "highlightjs" implementation for markdown renderer
renderer.code = (code, language) => {
  const validLang = !!(language && hljs.getLanguage(language))
  const highlighted = validLang ? hljs.highlight(language, code).value : code
  return `<pre class="hljs ${language} text-monospace p-2">${highlighted}</pre>`
}

// Custom heading implementation for markdown renderer
// @link: https://github.com/nuxt/docs/blob/967fc39b4dc0712d2d5089014eddc7e7a2e65422/api.js#L27
// @link: https://github.com/markedjs/marked/blob/1f5b9a19f532e2e1e3e63ae5efd81af75acf572f/lib/marked.js#L962
renderer.heading = function(text, level, raw, slugger) {
  const getTextMarkup = text => `<span class="bd-content-title">${text}</span>`

  if (!this.options.headerIds) {
    return `<h${level}>${getTextMarkup(text)}</h${level}>\n`
  }

  const pattern = /\s?{([^}]+)}$/

  let link = pattern.exec(text)
  if (link && link.length && link[1]) {
    text = text.replace(pattern, '')
    link = link[1]
  } else {
    link = this.options.headerPrefix + slugger.slug(raw)
  }

  const anchor =
    ANCHOR_LINK_HEADING_LEVELS.indexOf(level) !== -1
      ? `<a class="anchorjs-link" href="#${link}" aria-label="Anchor"></a>`
      : ''

  return `<h${level} id="${link}">${getTextMarkup(text + anchor)}</h${level}>\n`
}

// BS4 table support for markdown renderer
const originalTable = renderer.table
renderer.table = function(header, body) {
  let r = originalTable.apply(this, arguments)
  return r
    .replace('<table>', '<table class="table b-table table-striped">')
    .replace('<thead>', '<thead class="thead-default">')
}

module.exports = {
  srcDir: __dirname,

  modern: 'client',

  build: {
    extractCSS: true,
    cssSourceMap: true,
    postcss: {
      preset: {
        autoprefixer: {
          cascade: false
        }
      }
    },
    extend(config, { loaders }) {
      config.resolve.alias.vue = 'vue/dist/vue.common'

      config.resolveLoader.alias = config.resolveLoader.alias || {}
      config.resolveLoader.alias['marked-loader'] = path.join(__dirname, './utils/marked-loader')

      config.devtool = 'source-map'

      config.module.rules.push({
        test: /\.md$/,
        use: [
          { loader: 'html-loader' },
          {
            loader: 'marked-loader',
            options: {
              // Our customized renderer
              renderer,
              // headerIds must always be true, since Search and Table of Contents rely on the IDs
              headerIds: true,
              // Handle GitHub falvoured markdown
              gfm: true
            }
          }
        ]
      })

      loaders.scss.precision = 6
      loaders.scss.outputStyle = 'expanded'
    }
  },

  loading: {
    color: '#59cc93',
    height: '3px'
  },

  manifest: {
    name: 'BootstrapVue',
    short_name: 'BootstrapVue',
    description: 'Quickly integrate Bootstrap 4 components with Vue.js',
    theme_color: '#563d7c'
  },

  generate: {
    dir: 'docs-dist',
    routes: () => {
      let scan = (root, dir, excludeDirs = []) =>
        fs
          .readdirSync(`${root}/${dir}`)
          .filter(c => c !== 'index.js' && c[0] !== '_')
          .filter(c => excludeDirs.indexOf(c) === -1)
          .map(page => `/docs/${dir}/${page}`)

      return []
        .concat(scan('src', 'components'))
        .concat(scan('src', 'directives', ['modal', 'toggle']))
        .concat(scan('docs/markdown', 'reference'))
        .concat(scan('docs/markdown', 'misc'))
    }
  },

  plugins: [
    '~plugins/bootstrap-vue.js',
    '~plugins/codemirror.js',
    '~plugins/play.js',
    '~/plugins/docs.js'
  ],

  modules: ['@nuxtjs/pwa', '@nuxtjs/google-analytics'],

  'google-analytics': {
    id: 'UA-89526435-1',
    autoTracking: {
      exception: true
    }
  },

  head: {
    meta: [{ 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' }],
    script: [
      { type: 'text/javascript', src: '//unpkg.com/@babel/polyfill@latest/dist/polyfill.min.js' }
    ]
  },

  css: [
    'highlightjs/styles/atom-one-light.css',
    'codemirror/lib/codemirror.css',
    'bootstrap/dist/css/bootstrap.css',
    '../src/index.scss', // BootstrapVue SCSS
    '@assets/css/docs.min.css',
    '@assets/scss/styles.scss'
  ]
}
