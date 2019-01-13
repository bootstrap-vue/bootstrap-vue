const fs = require('fs')
const path = require('path')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const { camelCase } = require('lodash')
const { name, dependencies } = require('../package.json')

const base = path.resolve(__dirname, '..')
const src = path.resolve(base, 'src')
const dist = path.resolve(base, 'dist')

// Libs in `external` will not be bundled to dist,
// since they are expected to be provided later.
// We want to include some of them in the build, so we exclude it here.
const externalExcludes = [
  'popper.js',
  'lodash.startcase',
  'lodash.get',
  'vue-functional-data-merge'
]

// The base rollup configuration
const baseConfig = {
  input: path.resolve(src, 'index.js'),
  external: Object.keys(dependencies),
  plugins: [
    resolve({ external: ['vue'] }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    })
  ]
}

// Ensure dist directory exists
if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist)
}

module.exports = [
  // UMD
  {
    ...baseConfig,
    external: Object.keys(dependencies).filter(dep => externalExcludes.indexOf(dep) === -1),
    output: {
      format: 'umd',
      name: camelCase(name),
      file: path.resolve(dist, name + '.js'),
      sourcemap: true
    }
  },

  // COMMON
  {
    ...baseConfig,
    external: Object.keys(dependencies).filter(dep => externalExcludes.indexOf(dep) === -1),
    output: {
      format: 'cjs',
      name: camelCase(name),
      file: path.resolve(dist, name + '.common.js'),
      sourcemap: true
    }
  },

  // ES
  {
    ...baseConfig,
    output: {
      format: 'es',
      file: path.resolve(dist, name + '.esm.js'),
      sourcemap: true
    }
  }
]
