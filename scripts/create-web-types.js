// Creates a web-types.json, tags.json and attributes.json files and places them in /dist
const path = require('path')
const fs = require('fs')
const requireContext = require('require-context')

const baseDir = path.resolve(__dirname, '..')
const distDir = path.resolve(baseDir, 'dist')

// Import project package.json
const pkg = require(path.resolve(baseDir, 'package.json'))

const libraryName = pkg.name
const libraryVersion = pkg.version
const baseDocs = pkg.homepage.replace(/\/$/, '')

// Placeholder arrays
let componentGroups = {}
let directiveGroups = {}

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
const importAll = r => {
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

// Util to kebab-case a PascalCase or camelCase string
const kebabRE = /\B([A-Z])/g
const kebabCase = str => {
  return str.replace(kebabRE, '-$1').toLowerCase()
}

// Compute the web-type "type" from the a prop type
const computePropType = ({ type }) => {
  if (!type) {
    return 'any'
  }
  type = type || Object
  if (Array.isArray(type)) {
    // Array of types
    return type.map(t => computePropType({ type: t })).join('|')
  }
  if (typeof type === 'undefined') {
    return 'any'
  }
  if (typeof type !== 'string') {
    type = type.name
  }
  if (type === 'Array') {
    // For simplicity return arrays of any type entries
    return 'any[]'
  }
  // For browser types, we leave them capitalized, otherwise we return a lowercase typescipt name
  return ['Boolean', 'String', 'Number', 'Function', 'Object'].indexOf(type) > -1
    ? type.toLowerCase()
    : type
}

// Compute the default value (in web-type form) for a given prop definition (component props only)
const computePropDefault = ({ default: def, type }) => {
  // Default could be a function that retruns a non-primative type
  def = typeof def === 'function' ? def.call({}) : def
  if (type === Boolean || (Array.isArray(type) && type[0] === Boolean && !def)) {
    def = Boolean(def)
  } else if (def === undefined) {
    def = null
  }
  return JSON.stringify(def)
}

// Create tag entries for each component in a component group
const processComponentGroup = groupSlug => {
  // Array of components in the group
  const groupMeta = componentGroups[groupSlug] || {}
  const componentsMeta = groupMeta.components || []
  const docUrl = `${baseDocs}/docs/components/${groupSlug}/`

  // We import the component from the transpiled `esm/` dir
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
    // This doesn't exist yet (for prop descriptions, info)
    // For description (and possibly more) for props docs
    const $propsExtra = meta.props || {}

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
        const $propExtra = $propsExtra[propName] || {}
        const prop = {
          name: propName,
          value: {
            type: computePropType($prop),
            default: computePropDefault($prop)
          },
          'doc-url': docUrl
        }
        // Add required prop is required
        if ($prop.required) {
          prop.value.required = true
        }
        // If we have a description, add it
        // TODO: this doesn't exist in the component meta yet
        if ($propExtra.description) {
          prop.description = $propExtra.description
        }
        return prop
      })
    }

    // Add events
    if ($events.length) {
      tag.events = $events.map(eventObj => {
        const event = {
          name: eventObj.event,
          'doc-url': docUrl
        }
        if (eventObj.description) {
          event.description = eventObj.description
        }
        if (Array.isArray(eventObj.args)) {
          event.arguments = eventObj.args.map(arg => {
            arg = typeof arg === 'object' ? arg : { arg: arg }
            const argument = {
              name: arg.arg,
              'doc-url': docUrl
            }
            if (arg.description) {
              argument.description = arg.description
            }
            if (arg.type) {
              argument.type = computePropType(arg)
            }
            return argument
          })
        }
        return event
      })
    }

    // Add slots
    if ($slots.length) {
      tag['vue-scoped-slots'] = $slots.map(slotObj => {
        const slot = {
          name: slotObj.name,
          'doc-url': docUrl
        }
        if (slotObj.description) {
          slot.description = slotObj.description
        }
        if (Array.isArray(slotObj.scope)) {
          // Slot props not documented in meta yet
          slot.properties = slotObj.scope.map(propDef => {
            const property = {
              name: propDef.prop,
              'doc-url': docUrl
            }
            if (propDef.description) {
              property.description = propDef.description
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

// Create attribute entries for each directive
const processDirectiveGroup = groupSlug => {
  // Directives only have a single entry in their Meta for `directive`
  const directiveMeta = directiveGroups[groupSlug] || {}
  const docUrl = `${baseDocs}/docs/directives/${groupSlug}/`

  // Process the directive meta
  // String (PascalCase)
  const name = directiveMeta.directive
  // Object
  const arg = directiveMeta.arg
  // Array
  const modifiers = directiveMeta.modifiers
  // Object
  const expression = directiveMeta.expression

  // Base attribute definition
  const attribute = {
    name: kebabCase(name),
    source: {
      module: libraryName,
      symbol: name
    },
    required: false,
    description: `${name} - BootstrapVue directive '${kebabCase(name)}'`,
    'doc-url': docUrl
  }
  // The following are not in the directive package.json meta section yet.
  // There are currently a few issues with what the schema supports,
  // so we may need to adjust the following once it is completed.
  // Add in argument details
  if (arg) {
    // TODO as this is missing from the schema def
    // https://github.com/JetBrains/web-types/issues/7
  }
  // Add in any modifier details
  if (modifiers) {
    attribute['vue-modifiers'] = modifiers.map(mod => {
      const modifier = {
        name: mod.modifer,
        description: mod.description || '',
        'doc-url': docUrl
      }
      return modifier
    })
  }
  // Add in value (expression) type
  if (expression) {
    attribute.value = {
      kind: 'expression',
      type: computePropType(expression)
    }
  }
  // Add the directive to the html attributes array
  webTypes.contributions.html.attributes.push(attribute)
}

try {
  // Grab the component meta data (from the source dir component's package.json)
  const componentsContext = requireContext(
    path.resolve(baseDir, 'src/components'),
    true,
    /package.json/
  )
  componentGroups = importAll(componentsContext)

  // Grab the directive meta data
  const directivesContext = requireContext(
    path.resolve(baseDir, 'src/directives'),
    true,
    /package.json/
  )
  directiveGroups = importAll(directivesContext)

  // Process all components into webTypes
  Object.keys(componentGroups).forEach(processComponentGroup)

  // Process all directives into webTypes
  Object.keys(directiveGroups).forEach(processDirectiveGroup)

  // Create Vetur tags and attributes files
  const veturTags = {}
  const veturAttributes = {}
  Object.keys(webTypes.contributions.html.tags).forEach(component => {
    const def = webTypes.contributions.html.tags[component]
    const tag = kebabCase(def.name)
    veturTags[tag] = {
      subtags: [],
      description: def.description,
      attributes: def.attributes.map(attrObj => kebabCase(attrObj.name))
    }
    def.attributes.forEach(attrObj => {
      const type = (attrObj.value || { type: 'any'}).type
      veturAttributes[`${tag}/${kebabCase(attrObj.name)}`] = {
        description: attrObj.description || `One of: ${type.split('|').join(' or ')}`,
        type: type
      }
    })
  })

  // Write web-types.json to file
  console.log('   Writing dist/web-types.json...')
  const webTypesJson = JSON.stringify(webTypes, null, 2)
  fs.writeFileSync(path.resolve(distDir, 'web-types.json'), webTypesJson)

  // Write tags.json to file
  console.log('   Writing dist/tags.json...')
  const veturTagsJson = JSON.stringify(veturTags, null, 2)
  fs.writeFileSync(path.resolve(distDir, 'tags.json'), veturTagsJson)

  // Write attributes.json to file
  console.log('   Writing dist/attributes.json...')
  const veturAttributesJson = JSON.stringify(veturAttributes, null, 2)
  fs.writeFileSync(path.resolve(distDir, 'attributes.json'), veturAttributesJson)

  // Done
} catch (err) {
  // Add some basic error handling here
  console.log(`create-web-types.js: an error occurred...`)
  console.log()
  console.error(err)
  console.log()
  process.exit(1)
}
