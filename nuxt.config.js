const path = require('path');
const fs = require('fs');
const marked = require('marked');

// Markdown renderer with BS4 tables support
const renderer = new marked.Renderer();
const originalTable = renderer.table
renderer.table = function renderTable(header, body) {
    let r = originalTable.apply(this, arguments)
    return r.replace('<table>', '<table class="table b-table table-sm table-striped">')
        .replace('<thead>', '<thead class="thead-default">')
}

module.exports = {
    srcDir: path.resolve(__dirname, 'docs/nuxt'),

    build: {
        extractCSS: true,
        cssSourceMap: true,
        extend(config) {
            config.resolve.alias['vue'] = 'vue/dist/vue.common'

            config.devtool = 'source-map'

            config.module.rules.push({
                test: /\.md$/,
                use: [
                    { loader: 'html-loader' },
                    { loader: 'highlight-loader' },
                    { loader: 'markdown-loader', options: { renderer } }
                ]
            });
        }
    },
    

    loading: {
        color: '#59cc93'
    },

    manifest: {
        name: 'Bootstrap Vue',
        description: 'Quickly integrate Bootstrap 4 components with Vue.js',
        theme_color: '#563d7c'
    },

    generate: {
        dir: 'docs-dist',
        routes: () => {
            let scan = dir => fs.readdirSync(`docs/${dir}`)
                .filter(c => c !== 'index.js' && c[0] !== '_')
                .map(component => `/docs/${dir}/${component}`);

            return []
                .concat(scan('components'))
                .concat(scan('directives'))
                .concat(scan('reference'))
        }
    },

    plugins: [
        '~plugins/bootstrap-vue.js',
        '~plugins/codemirror.js',
        '~plugins/ga.js',
        '~plugins/play.js',
        '~/plugins/docs.js'
    ],

    modules: [
        '@nuxtjs/pwa'
    ],

    css: [
        'bootstrap/dist/css/bootstrap.css',
        'highlightjs/styles/atom-one-light.css',
        'codemirror/lib/codemirror.css',
        '~assets/css/docs.min.css',
        '~assets/css/styles.css'
    ]
};
