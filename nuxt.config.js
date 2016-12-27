const path = require('path');

module.exports = {
    srcDir: path.resolve(__dirname, 'docs'),
    dev: process.env.NODE_ENV !== 'production',
    plugins: [
        '~plugins/bootstrap-vue.js',
        '~plugins/highlightjs.js',
    ],
    css: [
        path.resolve(__dirname, 'node_modules/bootstrap/dist/css/bootstrap-flex.css'),
        path.resolve(__dirname, 'node_modules/highlightjs/styles/atom-one-light.css'),
        '~assets/css/docs.min.css',
        '~assets/css/styles.css',
    ],
};
