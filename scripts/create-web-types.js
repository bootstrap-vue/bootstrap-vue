const path = require('path')
// const fs = require('fs')
const pkg = require('../package.json')
const requireContext = require('require-context')

const baseDir = path.resolve(__dirname, '..')
const baseDocs = pkg.homepage.replace(/\/$/, '')
const libraryName = pkg.name
const libraryVersion = pkg.version

// Base web-types object
const webTypes = {
  $schema: '',
  framework: 'vue',
  name: libraryName,
  version: libraryVersion,
  contributions: {
    html: {
      'types-syntax': 'typescript',
      // Components get placed here
      tags: [],
      // Directives get placed in here
      attributes: []
    }
  }
}

// Import metatdata from a directory glob package.json files
export const importAll = r => {
  const obj = {}
  r.keys()
    .map(r)
    .map(m => m.meta || m)
    .map(m => ({
      slug: m.slug || (m.title || '').replace(' ', '-').toLowerCase(),
      ...m
    }))
    .sort((a, b) => {
      if (a.slug < b.slug) return -1
      else if (a.slug > b.slug) return 1
      return 0
    })
    .forEach(m => {
      if (m.components) {
        // Normalize `meta.components` to array of objects form
        m.components = m.components.map(c => (typeof c === 'string' ? { component: c } : c))
      }
      obj[m.slug] = m
    })

  return obj
}

const kebabRE = /\B([A-Z])/g
const kebabCase = str => {
  return str.replace(kebabRE, '-$1').toLowerCase()
}

const computePropType = ({ type }) => {
  if (!type) {
    return 'any'
  }
  type = type || Object
  if (Array.isArray(type)) {
    // Array of types
    return type.map(type => computePropType({ type: type })).join('|')
  }
  if (typeof type === 'string') {
    // Mainly for events and slots
    if (type === 'Array') {
      type = Array
    } else {
      // Handle cases for BvEvent, BvModalEvent and other native
      // event types (i.e. HTMLElement, MouseEvent, etc)
      return /^[A-Z].*[A-Z].+/.test(type) ? type : type.toLowerCase()
    }
  }
  if (type.name === 'Array') {
    // For simplicity return arrays of any type entries
    return 'any[]'
  }
  return type.name.toLowerCase()
}

const computePropDefault = ({ default: def, type }) => {
  // Default could be a function that retruns a non-primative type
  def = typeof def === 'function' ? def.call({}) : def
  if (type === Boolean || (Array.isArray(type) && type[0] === Boolean)) {
    def = Boolean(def)
  } else if (def === undefined) {
    def = null
  }
  return JSON.stringify(def)
}

// Create tag entries for each component in a group group
const processComponentGroup = groupSlug => {
  // Array of components in the group
  const groupMeta = componentGroups[groupSlug] || {}
  const componentsMeta = groupMeta.components || []
  const docUrl = `${baseDocs}/docs/components/${groupSlug}/`

  const groupRef = require(path.resolve(baseDir, 'esm/components/' + groupSlug))

  // Process each component
  componentsMeta.forEach(meta => {
    const componentName = meta.component
    const componentRef = groupRef[componentName] || {}
    // Pull information from the component definition/class
    const $options = componentRef.options || componentRef
    const $props = $options.props || {}
    const $model = $options.model || null
    // Pull additional info from meta
    const $events = meta.events || []
    const $slots = meta.slots || []
    const $aliases = meta.aliases || []

    const tagName = kebabCase(componentName)

    // Build the tag reference
    const tag = {
      name: componentName,
      source: {
        module: libraryName,
        symbol: componentName
      },
      'docs-url': docUrl,
      description: `'${componentName}' - BootstrapVue component <${tagName}>`,
      attributes: []
    }

    // Add v-model information
    if ($model && $model.prop && $model.event) {
      tag['vue-model'] = {
        prop: $model.prop,
        event: $model.event
      }
    }

    // Add props
    if (Object.keys($props).length) {
      tag.attributes = Object.keys($props).map(propName => {
        const $prop = $props[propName]
        const prop = {
          name: propName,
          value: {
            type: computePropType($prop),
            default: computePropDefault($prop)
          },
          // description: '',
          'doc-url': docUrl
        }
        // Add required prop is required
        if ($prop.required) {
          prop.value.required = true
        }
        return prop
      })
    }

    // Add events
    if ($events.length) {
      tag.events = $events.map(eventObj => {
        return {
          name: eventObj.event,
          description: eventObj.description,
          'doc-url': docUrl,
          arguments: (eventObj.args || []).map(arg => {
            arg = typeof arg === 'object' ? arg : { arg: arg }
            const event = {
              name: arg.arg,
              type: 'any',
              description: arg.description || '',
              'doc-url': docUrl
            }
            if (arg.type) {
              event.type = computePropType(arg)
            }
            return event
          })
        }
      })
    }

    // Add slots
    if ($slots.length) {
      tag['vue-scoped-slots'] = $slots.map(slotObj => {
        const slot = {
          name: slotObj.name,
          description: slotObj.description || '',
          'doc-url': docUrl
        }
        if (slotObj.scope) {
          // Slot props not documented in meta yet
          slot.properties = slotObj.scope.forEach(propDef => {
            const property = {
              name: propDef.name,
              type: 'any',
              description: propDef.description,
              'doc-url': docUrl
            }
            if (propDef.type) {
              property.type = computePropType(propDef)
            }
            return property
          })
        }
        return slot
      })
    }

    // Add the component tag
    webTypes.contributions.html.tags.push(tag)

    // Add in any component alias tags
    if ($aliases.length) {
      // Add the aliases
      $aliases.forEach(alias => {
        const aliasTag = { ...tag, name: alias, source: { ...tag.source, symbol: alias } }
        aliasTag.description = `'${alias}' <${kebabCase(alias)}> (Alias for ${tag.description})`
        webTypes.contributions.html.tags.push(aliasTag)
      })
    }
  })
}

// Grab the component meta data
const componentsContext = requireContext(
  path.resolve(baseDir, 'src/components'),
  true,
  /package.json/
)
const componentGroups = importAll(componentsContext)

// Grab the directive meta data
// const directivesContext = requireContext(path.resolve(baseDir, 'src/directives'), true, /package.json/)
// const directiveGroups = importAll(directivesContext)

// Process all components
Object.keys(componentGroups).forEach(processComponentGroup)

// Convert to JSON string
const json = JSON.stringify(webTypes, null, 2)

// To be replaced with a write to a file
console.log('JSON:', json)
