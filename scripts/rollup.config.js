import fs from 'fs'
import path from 'path'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { camelCase } from 'lodash'
import { name, dependencies } from '../package.json'

const base = path.resolve(__dirname, '..')
const src = path.resolve(base, 'src')
const dist = path.resolve(base, 'dist')

// Libs in `external` will not be bundled to dist,
// since they are expected to be provided later.
// We want to include some of them in the build, so we exclude it here.
const externalExcludes = ['popper.js', 'vue-functional-data-merge']

// The base rollup configuration
const baseConfig = {
  input: path.resolve(src, 'index.js'),
  external: Object.keys(dependencies),
  plugins: [resolve({ external: ['vue'] }), commonjs(), babel({ exclude: 'node_modules/**' })]
}

// Ensure dist directory exists
if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist)
}

export default [
  // UMD
  {
    ...baseConfig,
    external: Object.keys(dependencies).filter(dep => !externalExcludes.includes(dep)),
    output: {
      format: 'umd',
      name: camelCase(name),
      file: path.resolve(dist, `${name}.js`),
      sourcemap: true
    }
  },

  // COMMON
  {
    ...baseConfig,
    external: Object.keys(dependencies).filter(dep => !externalExcludes.includes(dep)),
    output: {
      format: 'cjs',
      name: camelCase(name),
      file: path.resolve(dist, `${name}.common.js`),
      sourcemap: true
    }
  },

  // ES
  {
    ...baseConfig,
    output: {
      format: 'es',
      file: path.resolve(dist, `${name}.esm.js`),
      sourcemap: true
    }
  }
]
