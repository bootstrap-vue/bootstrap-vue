#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const assert = require('assert')
const { promisify } = require('util')

const readDir = promisify(fs.readdir)
const stat = promisify(fs.stat)

const r = p => path.resolve(__dirname, p)

const getComponentName = n => {
  return (
    'B' +
    n
      .replace(/[_-]/g, ' ')
      .replace(/([a-z])([A-Z])/g, (str, $1, $2) => $1 + ' ' + $2)
      .replace(/(\s|^)(\w)/g, (str, $1, $2) => $1 + $2.toUpperCase())
      .replace(/ /g, '')
  )
}

const getComponentModuleName = n => {
  return n.replace(/([A-Z])/g, (str, $1) => '-' + $1.toLowerCase()).substr(3)
}

async function main() {
  const plugins = await readDir(r('../src/components'))

  await Promise.all(
    plugins.map(async plugin => {
      const pluginDir = r(`../src/components/${plugin}`)
      const stats = await stat(pluginDir)

      if (stats.isDirectory()) {
        const files = await readDir(pluginDir)
        const componentModules = []
        files.forEach(file => {
          if (file.startsWith(plugin) && !file.includes('.spec.')) {
            componentModules.push(file.replace(/\.js/, ''))
          }
        })

        const pckg = require(`${pluginDir}/package.json`)
        if (pckg && pckg.meta) {
          const componentName = getComponentName(plugin)
          if (pckg.meta.component !== componentName) {
            assert.strictEqual(
              pckg.meta.component,
              componentName,
              `Expected the main component for plugin '${plugin}' to be named ${componentName} but it was ${
                pckg.meta.component
              }`
            )
          }

          const pckgComponents = pckg.meta.components || []
          // Check if all component modules are defined in the meta section of the plugin's package.json
          if (componentModules.length > 1) {
            componentModules.filter(c => c !== plugin).forEach(component => {
              const componentName = getComponentName(component)
              const componentMeta = pckgComponents.find(
                c => c === componentName || c.component === componentName
              )
              if (!['BBreadcrumbLink'].includes(componentName)) {
                assert.ok(
                  componentMeta,
                  `Expected ${componentName} to be listed in meta section of ${plugin}'s package.json`
                )
              }
            })
          }

          // Check if for all components defined in the plugin's package.json a module exists
          if (pckgComponents.length) {
            pckgComponents.forEach(component => {
              const componentName = typeof component === 'string' ? component : component.component
              const moduleName = getComponentModuleName(componentName)
              assert.ok(
                componentModules.includes(moduleName),
                `Component ${componentName} was defined in pck.meta but no module with name ${moduleName} was found`
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
