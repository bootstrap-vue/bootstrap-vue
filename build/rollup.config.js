const fs = require('fs');
const path = require('path');
const vue = require('rollup-plugin-vue');
const buble = require('rollup-plugin-buble');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const CleanCSS = require('clean-css');
const {name, dependencies} = require('../package.json');

const base = path.resolve(__dirname, '..');
const lib = path.resolve(base, 'lib');
const dist = path.resolve(base, 'dist');

module.exports = {
    entry: path.resolve(lib, 'index.js'),
    external: Object.keys(dependencies),
    moduleName: name,
    plugins: [
        vue({
            cssModules: {
                generateScopedName: '[name]__[local]'
            },
            css(style) {
                fs.writeFileSync(path.resolve(dist, `${name}.css`), new CleanCSS().minify(style).styles);
            }
        }),
        buble(),
        resolve({skip: ['vue']}),
        commonjs()
    ]
};
