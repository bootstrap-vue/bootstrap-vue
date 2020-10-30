import fs from 'fs'
import path from 'path'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { camelCase } from 'lodash'
import { name, dependencies } from '../package.json'

const bannerComment = require('./banner')

const bannerIconsComment = bannerComment.replace('* BootstrapVue', '* BootstrapVueIcons')

const base = path.resolve(__dirname, '..')
const src = path.resolve(base, 'src')
const dist = path.resolve(base, 'dist')

const externals = ['vue', ...Object.keys(dependencies)]

// Libs in `external` will not be bundled to dist, since they
// are expected to be provided later.
// In some cases (i.e. browser UMD build), we want to include some of
// them in the build, so we exclude the external here.
const externalExcludes = ['popper.js', 'portal-vue', 'vue-functional-data-merge']

// The base rollup configuration
const baseConfig = {
  input: path.resolve(src, 'index.js'),
  external: externals,
  plugins: [resolve({ external: ['vue'] }), commonjs(), babel({ exclude: 'node_modules/**' })]
}

// Ensure dist directory exists
if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist)
}

export default [
  // UMD Browser Build
  {
    ...baseConfig,
    // We use a specific input for the browser build
    input: path.resolve(src, 'browser.js'),
    external: externals.filter(dep => !externalExcludes.includes(dep)),
    output: {
      format: 'umd',
      name: camelCase(name),
      file: path.resolve(dist, `${name}.js`),
      banner: bannerComment,
      sourcemap: true,
      globals: {
        vue: 'Vue'
      }
    }
  },

  // UMD Icons only Browser Build
  {
    ...baseConfig,
    // We use a specific input for the browser build
    input: path.resolve(src, 'browser-icons.js'),
    external: externals.filter(dep => !externalExcludes.includes(dep)),
    output: {
      format: 'umd',
      name: camelCase(`${name}-icons`),
      file: path.resolve(dist, `${name}-icons.js`),
      banner: bannerIconsComment,
      sourcemap: true,
      globals: {
        vue: 'Vue'
      }
    }
  },

  // COMMONJS Module Build
  {
    ...baseConfig,
    output: {
      format: 'cjs',
      name: camelCase(name),
      file: path.resolve(dist, `${name}.common.js`),
      banner: bannerComment,
      sourcemap: true,
      // Disable warning about mixed named/default exports
      // We we have handled this in the index file
      exports: 'named'
    }
  },

  // COMMONJS Icons only Module Build
  {
    ...baseConfig,
    input: path.resolve(src, 'icons-only.js'),
    output: {
      format: 'cjs',
      name: camelCase(`${name}-icons`),
      file: path.resolve(dist, `${name}-icons.common.js`),
      banner: bannerComment,
      sourcemap: true,
      // Disable warning about mixed named/default exports
      // We we have handled this in the index file
      exports: 'named'
    }
  },

  // ESM Module Bundle Build
  {
    ...baseConfig,
    output: {
      format: 'es',
      file: path.resolve(dist, `${name}.esm.js`),
      banner: bannerComment,
      sourcemap: true
    }
  },

  // ESM Icons only Module Bundle Build
  {
    ...baseConfig,
    input: path.resolve(src, 'icons-only.js'),
    output: {
      format: 'es',
      file: path.resolve(dist, `${name}-icons.esm.js`),
      banner: bannerComment,
      sourcemap: true
    }
  }
]
