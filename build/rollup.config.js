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
    input: path.resolve(lib, 'index.js'),
    external: Object.keys(dependencies),
    name: name,
    plugins: [
        vue({
            cssModules: {
                generateScopedName: '[name]__[local]'
            },
            css(style) {
                fs.writeFileSync(path.resolve(dist, `${name}.css`), new CleanCSS().minify(style).styles);
            }
        }),
        resolve({external: ['vue']}),
        commonjs(),
        buble({objectAssign: 'Object.assign'}),
        uglify({}, minify)
    ],
    globals: {
        'popper.js': 'Popper'
    },
    output: [
        {
            format: 'cjs',
            name: camelCase(name),
            file: path.resolve(dist, name + '.common.js'),
            sourcemap: true
        },
        {
            format: 'es',
            file: path.resolve(dist, name + '.esm.js'),
            sourcemap: true
        },
        {
            format: 'umd',
            modulename: camelCase(name),
            file: path.resolve(dist, name + '.js'),
            sourcemap: true
        }
    ]
};
