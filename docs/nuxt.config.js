const fs = require('fs')
const path = require('path')
const marked = require('marked')
const hljs = require('highlight.js/lib/highlight.js')
const { BASE_URL, GA_TRACKING_ID, TWITTER_HANDLE } = require('./constants')

// Import only the languages we need from "highlight.js"
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'))
hljs.registerLanguage('json', require('highlight.js/lib/languages/json'))
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml')) // Includes HTML
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'))
hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'))
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash')) // Includes sh
hljs.registerLanguage('shell', require('highlight.js/lib/languages/shell'))
hljs.registerLanguage('plaintext', require('highlight.js/lib/languages/plaintext'))

// --- Constants ---

const RX_CODE_FILENAME = /^\/\/ ([\w,\s-]+\.[A-Za-z]{1,4})\n/m

const ANCHOR_LINK_HEADING_LEVELS = [2, 3, 4, 5]

// --- Utility methods ---

// Get routes by a given dir
const getRoutesByDir = (root, dir, excludes = []) =>
  fs
    .readdirSync(`${root}/${dir}`)
    .filter(c => excludes.indexOf(c) === -1)
    .filter(c => !/\.(s?css|js|ts)$/.test(c))
    .map(page => `/docs/${dir}/${page}`)

// --- Custom renderer ---

// Create a new marked renderer
const renderer = new marked.Renderer()

// Custom "highlight.js" implementation for markdown renderer
renderer.code = (code, language) => {
  const attrs = {
    class: `hljs ${language} p-2`,
    translate: 'no'
  }

  const [, filename] = RX_CODE_FILENAME.exec(code) || []
  if (filename) {
    attrs['data-filename'] = filename
    code = code.replace(RX_CODE_FILENAME, '')
  }

  const validLang = !!(language && hljs.getLanguage(language))
  const highlighted = validLang ? hljs.highlight(language, code).value : code

  const attrsMarkup = Object.keys(attrs).reduce(
    (markup, attr) => `${markup}${markup ? ' ' : ''}${attr}="${attrs[attr]}"`,
    ''
  )

  return `<div class="bd-code"><pre ${attrsMarkup}>${highlighted}</pre></div>`
}

// Instruct Google Translate not to translate `<code>` content
// and don't let browsers wrap the contents across lines
renderer.codespan = code => {
  return `<code class="text-nowrap" translate="no">${code}</code>`
}

// Custom link renderer, to update Bootstrap docs version in href
// Only applies to markdown links (not explicit `<a href="..">...</a>` tags
renderer.link = (href, title, text) => {
  let target = ''
  let rel = ''
  let classAttr = ''
  href = href || '#'
  title = title ? ` title="${title}"` : ''
  text = text || ''
  if (href.indexOf('http') === 0 || href.indexOf('//') === 0) {
    // External links
    // Open in a new window (will reduce bounce rates in analytics)
    target = ' target="_blank"'
    // We add in rel="noopener" to all external links for security and performance reasons
    // https://developers.google.com/web/tools/lighthouse/audits/noopener
    rel = ' rel="noopener"'
    // External links use the default link style
  } else if (href.indexOf('/') === 0 || href.indexOf('#') === 0) {
    // Internal docs links
    classAttr = ' class="font-weight-bold"'
  }
  return `<a href="${href}"${classAttr}${title}${target}${rel}>${text}</a>`
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
      ? `<a class="anchorjs-link" href="#${link}" aria-labelledby="${link}"></a>`
      : ''
  const attrs = `id="${link}" class="bv-no-focus-ring"`
  return `<h${level} ${attrs}>${getTextMarkup(text + anchor)}</h${level}>\n`
}

// Convert lead-in blockquote paragraphs to true Bootstrap docs leads
renderer.blockquote = function(text) {
  return text.replace('<p>', '<p class="bd-lead">')
}

// Bootstrap v4 table support for markdown renderer
const originalTable = renderer.table
renderer.table = function() {
  let table = originalTable.apply(this, arguments)
  table = table
    .replace('<table>', '<table class="b-table table table-bordered table-striped bv-docs-table">')
    .replace('<thead>', '<thead class="thead-default">')
  return `<div class="table-responsive-sm">${table}</div>`
}

// --- Main export ---

module.exports = {
  srcDir: __dirname,

  modern: 'client',

  env: {
    // ENV vars provided by Netlify build:
    // - `true` if on Netlify (dev or PR)
    NETLIFY: process.env.NETLIFY,
    // Determines the context from netlify (`production`, `deploy-preview` or `branch-deploy`)
    // In our case, `production` means the dev branch (bootstrap-vue.netlify.com)
    NETLIFY_CONTEXT: process.env.NETLIFY ? process.env.CONTEXT : null,
    // - `true` if triggered by a Pull request commit
    PULL_REQUEST: process.env.NETLIFY ? process.env.PULL_REQUEST : null,
    // - If the previous is `true`, this will be the PR number
    REVIEW_ID: process.env.NETLIFY && process.env.PULL_REQUEST ? process.env.REVIEW_ID : null,
    // ENV vars provided by Zeit Now build
    // https://zeit.co/docs/v2/build-step#system-environment-variables
    // - `true` if on Zeit Now (dev or PR)
    ZEIT_NOW: process.env.NOW_GITHUB_DEPLOYMENT,
    // - The branch name used for the deploy (i.e. `dev`, `master`, `patch-1`, etc)
    ZEIT_BRANCH: process.env.NOW_GITHUB_COMMIT_REF,
    // - The Commit SHA hash
    ZEIT_COMMIT_SHA: process.env.NOW_GITHUB_COMMIT_SHA,
    // - The deployment URL
    ZEIT_URL: process.env.NOW_URL,
    // - The Github Organization (ie. bootstrap-vue)
    ZEIT_GITHUB_ORG: process.env.NOW_GITHUB_ORG,
    // - The repo is the organization (i.e. bootstrap-vue)
    ZEIT_GITHUB_REPO: process.env.NOW_GITHUB_REPO
  },

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
    templates: [
      // Genrate apropriate robots.txt file
      {
        // Source template relative to nuxt.config.js
        src: '~/static-templates/robots.txt',
        // Output file relative to `.nuxt/` directory
        dst: '../static/robots.txt',
        options: {
          isProd:
            process.env.VERCEL_GITHUB_COMMIT_REF === 'master' ||
            process.env.NOW_GITHUB_COMMIT_REF === 'master'
        }
      }
    ],
    extend(config, { isDev, loaders }) {
      config.resolve.alias.vue = 'vue/dist/vue.common'

      config.resolveLoader.alias = config.resolveLoader.alias || {}
      config.resolveLoader.alias['marked-loader'] = path.join(__dirname, './utils/marked-loader')

      // Source maps make the bundles monstrous, do leave it off in prod mode
      if (isDev) {
        config.devtool = 'eval-source-map'
      }

      config.module.rules.push({
        test: /\.md$/,
        use: [
          { loader: 'html-loader' },
          {
            loader: 'marked-loader',
            options: {
              // Our customized renderer
              renderer,
              // `headerIds` must always be true, since search and
              // table of contents rely on the IDs
              headerIds: true,
              // Handle GitHub flavoured markdown
              gfm: true
            }
          }
        ]
      })

      loaders.scss.sassOptions = {
        precision: 6,
        outputStyle: 'expanded'
      }

      loaders.vue.transformAssetUrls = {
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
        'b-embed': 'src'
      }
    }
  },

  loading: {
    color: '#ccc',
    height: '3px'
  },

  pwa: {
    icon: {
      // iconFileName: 'icon.png',
      iconSrc: '~/static/icon.png'
    },
    manifest: {
      name: 'BootstrapVue',
      short_name: 'BootstrapVue',
      description: 'Quickly integrate Bootstrap v4 components with Vue.js',
      theme_color: '#563d7c'
    },
    meta: {
      // `ogHost` is required for `og:image` to be populated
      ogHost: BASE_URL,
      ogImage: true,
      twitterCard: 'summary',
      twitterSite: TWITTER_HANDLE,
      twitterCreator: TWITTER_HANDLE
    }
  },

  generate: {
    dir: 'docs-dist',
    routes: () => [
      // Dynamic slug routes
      ...getRoutesByDir('src', 'components'),
      ...getRoutesByDir('src', 'directives', ['modal', 'toggle']),
      ...getRoutesByDir('docs/markdown', 'reference')
    ]
  },

  plugins: ['~/plugins/bootstrap-vue.js', '~/plugins/play.js', '~/plugins/docs.js'],

  buildModules: ['@nuxtjs/google-analytics'],
  modules: ['@nuxtjs/pwa'],

  'google-analytics': {
    id: GA_TRACKING_ID,
    autoTracking: {
      exception: true
    }
  },

  head: {
    meta: [{ 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' }],
    script: [
      {
        src: '//polyfill.io/v3/polyfill.min.js?features=es2015%2CIntersectionObserver',
        crossorigin: 'anonymous'
      }
    ]
  },

  css: [
    'highlight.js/styles/atom-one-light.css',
    'codemirror/lib/codemirror.css',
    'bootstrap/dist/css/bootstrap.css',
    '../scripts/index.scss', // BootstrapVue SCSS
    '@assets/css/docs.min.css',
    '@assets/scss/styles.scss'
  ]
}
