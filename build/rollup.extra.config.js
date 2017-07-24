const fs = require('fs');
const path = require('path');
const vue = require('rollup-plugin-vue');
const buble = require('rollup-plugin-buble');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const uglify = require('rollup-plugin-uglify');
const {minify} = require('uglify-es');
const CleanCSS = require('clean-css');
const {camelCase} = require('lodash');
const {name, dependencies} = require('../package.json');

const base = path.resolve(__dirname, '..');
const lib = path.resolve(base, 'lib');
const dist = path.resolve(base, 'dist');

// Ensure dist directory exists
if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist);
}

module.exports = {
    entry: path.resolve(lib, 'extra.js'),
    external: Object.keys(dependencies),
    moduleName: name + '.extra',
    plugins: [
        vue({
            cssModules: {
                generateScopedName: '[name]__[local]'
            },
            css(style) {
                fs.writeFileSync(path.resolve(dist, `${name}.extra.css`), new CleanCSS().minify(style).styles);
            }
        }),
        resolve({external: ['vue']}),
        commonjs(),
        buble({objectAssign: 'Object.assign'}),
        uglify({}, minify)
    ],
    globals: {
    },
    targets: [
        {
            format: 'cjs',
            moduleName: camelCase(name),
            dest: path.resolve(dist, name + '.extra.common.js'),
            sourceMap: true
        },
        {
            format: 'es',
            dest: path.resolve(dist, name + '.extra.esm.js'),
            sourceMap: true
        },
        {
            format: 'umd',
            moduleName: camelCase(name),
            dest: path.resolve(dist, name + '.extra.js'),
            sourceMap: true
        }
    ]
};
