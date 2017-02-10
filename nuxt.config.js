const path = require('path');

module.exports = {
    srcDir: path.resolve(__dirname, 'docs'),
    dev: process.env.NODE_ENV !== 'production',

    head: {
        title: 'Bootstrap Vue',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ],
        link: [
            {rel: 'icon', href: '/banner.png', sizes: '16x16', type: 'image/png'}
        ]
    },

    generate: {
        dir: 'docs-dist'
    },

    plugins: [
        '~plugins/bootstrap-vue.js',
        '~plugins/highlightjs.js',
        '~plugins/ga.js'
    ],
    css: [
        path.resolve(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.css'),
        path.resolve(__dirname, 'node_modules/highlightjs/styles/atom-one-dark.css'),
        '~assets/css/docs.min.css',
        '~assets/css/styles.css'
    ]
};
