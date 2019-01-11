const fs = require('fs')
const path = require('path')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const css = require('rollup-plugin-css-porter')
const { name, dependencies } = require('../package.json')

const base = path.resolve(__dirname, '..')
const src = path.resolve(base, 'src')
const dist = path.resolve(base, 'dist')

// Ensure dist directory exists
if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist)
}

module.exports = {
  input: path.resolve(src, 'index.js'),
  external: Object.keys(dependencies),
  plugins: [
    css({ dest: path.resolve(dist, name + '.css') }),
    resolve({ external: ['vue'] }),
    commonjs(),
    babel({
      plugins: ['external-helpers']
    })
  ],
  output: [
    {
      format: 'es',
      file: path.resolve(dist, name + '.esm.js'),
      sourcemap: true
    }
  ]
}
