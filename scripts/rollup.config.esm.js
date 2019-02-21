import fs from 'fs'
import path from 'path'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import css from 'rollup-plugin-css-porter'
import { name, dependencies } from '../package.json'

const base = path.resolve(__dirname, '..')
const src = path.resolve(base, 'src')
const dist = path.resolve(base, 'dist')

// Ensure dist directory exists
if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist)
}

export default {
  input: path.resolve(src, 'index.js'),
  external: Object.keys(dependencies),
  plugins: [
    css({ dest: path.resolve(dist, `${name}.css`) }),
    resolve({ external: ['vue'] }),
    commonjs(),
    babel()
  ],
  output: [
    {
      format: 'es',
      file: path.resolve(dist, `${name}.esm.js`),
      sourcemap: true
    }
  ]
}
