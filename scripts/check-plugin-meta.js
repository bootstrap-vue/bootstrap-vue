#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import assert from 'assert'
import { promisify } from 'util'
import startCase from '../src/utils/startcase'

const readDir = promisify(fs.readdir)
const stat = promisify(fs.stat)

const r = p => path.resolve(__dirname, p)

const verbose = process.argv.includes('-v')

const getComponentName = n => {
  return 'B' + startCase(n.replace(/-/g, '_')).replace(/ /g, '')
}

const getComponentModuleName = n => {
  return n.replace(/([A-Z])/g, (str, $1) => '-' + $1.toLowerCase()).substr(3)
}

const unPrefixedPlugins = ['layout', 'tabs']
const ignoredComponents = ['breadcrumb-link']

async function main() {
  const plugins = await readDir(r('../src/components'))

  await Promise.all(
    plugins.map(async plugin => {
      const pluginName = plugin === 'image' ? 'img' : plugin
      const pluginDir = r(`../src/components/${plugin}`)
      const stats = await stat(pluginDir)

      if (stats.isDirectory()) {
        const files = await readDir(pluginDir)
        const componentModules = []
        files
          .filter(f => f !== 'index.js' && f.endsWith('.js') && !f.includes('.spec.'))
          .forEach(file => {
            if (
              verbose &&
              !unPrefixedPlugins.includes(pluginName) &&
              !file.startsWith(pluginName)
            ) {
              console.warn(`Found unexpected unprefixed module ${file} for plugin ${plugin}`)
            }
            componentModules.push(file.replace(/\.js/, ''))
          })

        const { meta } = await import(`${pluginDir}/package.json`)
        if (meta) {
          const componentName = getComponentName(pluginName)

          if (meta.component) {
            assert.strictEqual(
              meta.component,
              componentName,
              `Expected the main component for plugin '${plugin}' to be named ${componentName} but it was ${
                meta.component
              }`
            )
          } else if (verbose) {
            console.info(`Plugin ${plugin} does not have a main component defined`)
          }

          const pckgComponents = meta.components || []
          // Check if all component modules are defined in the meta section of the plugin's package.json
          if (componentModules.length > 1) {
            componentModules
              .filter(c => c !== plugin && !ignoredComponents.includes(c))
              .forEach(component => {
                const componentName = getComponentName(component)
                const componentMeta = pckgComponents.find(
                  c => c === componentName || c.component === componentName
                )

                assert.ok(
                  componentMeta,
                  `Expected ${componentName} to be listed in meta section of ${plugin}'s package.json`
                )
              })
          }

          // Check if for all components defined in the plugin's package.json a module exists
          if (pckgComponents.length) {
            pckgComponents.forEach(component => {
              const componentName = typeof component === 'string' ? component : component.component

              const moduleName = getComponentModuleName(componentName)
              assert.ok(
                componentModules.includes(moduleName),
                `Component ${componentName} was defined in ${plugin}'s pck.meta but no module with name ${moduleName} was found`
              )
            })
          }
        }
      }
    })
  )
}

main().catch(e => {
  console.error(`${e.name}: ${e.message}`)
  process.exitCode = 1
})
