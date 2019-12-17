// NodeJS script to create the icon components modules:
//   src/icons/icons.js
//   src/icons/plugin.js
//   src/icons/icons.d.ts
//
// Source is bootstrap-icons/icons

'use strict'

const fs = require('fs').promises
const path = require('path')
const _template = require('lodash/template')

const bootstrapIconsBase = path.dirname(require.resolve('bootstrap-icons/package.json'))
const bootstrapIconsDir = path.join(bootstrapIconsBase, 'icons/')
const bsIconsMetaFile = path.join(bootstrapIconsBase, 'package.json')

const bvBase = path.resolve(__dirname, '..')
const bvIconsBase = path.join(bvBase, 'src', 'icons')
const iconsFile = path.resolve(bvIconsBase, 'icons.js')
const pluginFile = path.resolve(bvIconsBase, 'plugin.js')
const typesFile = path.resolve(bvIconsBase, 'icons.d.ts')

// Version of Bootstrap Icons
const bsIconsPkg = require(bsIconsMetaFile)

// Template for src/icons/icons.js
const iconsTemplateFn = _template(`// --- BEGIN AUTO-GENERATED FILE ---
//
// @IconsVersion: <%= version %>
// @Generated: <%= created %>
//
/*!
 * BootstrapVue Icons, generated from Boostrap Icons <%= version %>
 *
 * @link <%= homepage %>
 * @license <%= license %>
 * https://github.com/twbs/icons/blob/master/LICENSE.md
 */

import { makeIcon } from './helpers/make-icon'

// --- BootstrapVue custom icons ---

export const BIconBlank = /*#__PURE__*/ makeIcon('Blank', '')

// --- Bootstrap Icons ---
<% componentNames.forEach(component => { %>
export const <%= component %> = /*#__PURE__*/ makeIcon(
  '<%= icons[component].name %>',
  '<%= icons[component].content %>'
)
<% }) %>
// --- END AUTO-GENERATED FILE ---
`)

// Template for src/icons/plugin.js
const pluginTemplateFn = _template(`// --- BEGIN AUTO-GENERATED FILE ---
//
// @IconsVersion: <%= version %>
// @Generated: <%= created %>
//

import { pluginFactory } from '../utils/plugins'

import { BIcon } from './icon'

import {
  BIconBlank,
  <%= componentNames.join(',\\n  ') %>
} from './icons'

// All icons in an object
export const iconComponents = {
  BIcon,
  BIconBlank,
  <%= componentNames.join(',\\n  ') %>
}

// Export the icons plugin
export const IconsPlugin = /*#__PURE__*/ pluginFactory({ components: iconComponents })

// --- END AUTO-GENERATED FILE ---
`)

// Template for src/icons/icons.d.ts
const typesTemplateFn = _template(`// --- BEGIN AUTO-GENERATED FILE ---
//
// @IconsVersion: <%= version %>
// @Generated: <%= created %>
//
import Vue from 'vue'
import { BvComponent } from '../'

// --- BootstrapVue custom icons ---

export declare class BIconBlank extends BvComponent {}

// --- Bootstrap Icons ---
<% componentNames.forEach(component => { %>
export declare class <%= component %> extends BvComponent {}
<% }) %>
// --- END AUTO-GENERATED FILE ---
`)

// Utility functions

const RX_HYPHENATE = /\B([A-Z])/g
const kebabCase = str => {
  return str.replace(RX_HYPHENATE, '-$1').toLowerCase()
}

const RX_UNKEBAB = /-(\w)/g
const pascalCase = str => {
  str = kebabCase(str).replace(RX_UNKEBAB, (_, c) => (c ? c.toUpperCase() : ''))
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Parses a single SVG File
const processFile = (file, data) =>
  new Promise((resolve, reject) => {
    file = path.join(bootstrapIconsDir, file)
    if (path.extname(file) !== '.svg') {
      resolve()
      return
    }
    const name = pascalCase(path.basename(file, '.svg'))
    const componentName = `BIcon${name}`

    fs.readFile(file, 'utf8')
      .then(svg => {
        const content = svg
          // Remove <svg ...> and </svg>
          .replace(/<svg[^>]+>/i, '')
          .replace(/<\/svg>/i, '')
          // Remove whitespace between elements
          .replace(/>\s+</g, '><')
          // Fix broken stroke colors in some components
          // Might be fixed in 1.0.0-alpha3 release
          .replace(' stroke="#000"', ' stroke="currentColor"')
          // Remove leading/trailing whitespace
          .trim()
        // Add to the iconsData object
        data.icons[componentName] = { name: name, content: content }
        data.componentNames.push(componentName)
        // Resolve
        resolve()
      })
      .catch(error => reject(error))
  })

// Main process
const main = async () => {
  // Information needed in the templates
  const today = new Date()
  const data = {
    version: bsIconsPkg.version,
    license: bsIconsPkg.license,
    homepage: bsIconsPkg.homepage,
    created: today.toISOString(),
    componentNames: [],
    icons: {}
  }

  console.log(`  Reading SVGs from bootstrap-icons version ${data.version}`)

  // Read in the list of SVG Files
  const files = await fs.readdir(bootstrapIconsDir)

  // Process the SVG Data for all files
  await Promise.all(files.map(file => processFile(file, data)))

  // Sort the icon component names
  data.componentNames = data.componentNames.sort()

  console.log(`  Read ${data.componentNames.length} SVGs...`)

  // Write out the files
  console.log('  Creating icon components...')
  await fs.writeFile(iconsFile, iconsTemplateFn(data), 'utf8')
  console.log(`  Wrote to ${iconsFile}`)
  console.log('  Creating icon plugin...')
  await fs.writeFile(pluginFile, pluginTemplateFn(data), 'utf8')
  console.log(`  Wrote to ${pluginFile}`)
  console.log('  Creating type declarations...')
  await fs.writeFile(typesFile, typesTemplateFn(data), 'utf8')
  console.log(`  Wrote to ${typesFile}`)
}

main()
