const fs = require('fs')
const path = require('path')
const hljs = require('highlightjs')
const marked = require('marked')

const renderer = new marked.Renderer()

// Custom "highlightjs" implementation for markdown renderer
renderer.code = (code, language) => {
  const validLang = !!(language && hljs.getLanguage(language))
  const highlighted = validLang ? hljs.highlight(language, code).value : code
  return `<pre class="hljs ${language} text-monospace p-2">${highlighted}</pre>`
}

// BS4 table support for markdown renderer
const originalTable = renderer.table
renderer.table = function renderTable(header, body) {
  let r = originalTable.apply(this, arguments)
  return r
    .replace('<table>', '<table class="table b-table table-striped">')
    .replace('<thead>', '<thead class="thead-default">')
}

module.exports = {
  srcDir: __dirname,

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
              renderer,
              headerIds: true,
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
    '../src/index.scss', // Boostrap-Vue SCSS
    '@assets/css/docs.min.css',
    '@assets/css/styles.css'
  ]
}
