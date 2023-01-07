// Creates a web-types.json, tags.json and attributes.json files and places them in /dist
const path = require('path')
const fs = require('fs')
const requireContext = require('require-context')
const { kebabCase } = require('../src/utils/string')

const baseDir = path.resolve(__dirname, '..')
const distDir = path.resolve(baseDir, 'dist')
const docsDir = path.resolve(baseDir, 'docs')

// Import project `package.json`
const pkg = require(path.resolve(baseDir, 'package.json'))

const libraryName = pkg.name
const libraryVersion = pkg.version
const baseDocs = pkg.homepage.replace(/\/$/, '')

// Import common props fallback meta description file
// Note file is a lookup hash
const commonPropsMeta = require(path.resolve(docsDir, 'common-props.json'))

// Placeholder arrays
let componentGroups = {}
let iconGroups = {}
let directiveGroups = {}

// Base web-types object
const webTypes = {
  $schema: 'https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json',
  framework: 'vue',
  name: libraryName,
  version: libraryVersion,
  'js-types-syntax': 'typescript',
  'description-markup': 'markdown',
  contributions: {
    html: {
      // Components get placed here
      'vue-components': [],
      // Directives get placed in here
      'vue-directives': []
    }
  }
}

// Import metadata from a directory glob `package.json` files
const importAll = r => {
  const obj = {}
  r.keys()
    .map(r)
    .map(m => m.meta || m)
    .map(m => ({
      slug:
        typeof m.slug !== 'undefined' ? m.slug : (m.title || '').replace(' ', '-').toLowerCase(),
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
      if (m.directives) {
        // Normalize `meta.directives` to array of objects form
        // Applicable to component group `package.json`
        m.directives = m.directives.map(d => (typeof d === 'string' ? { directive: d } : d))
      }
      obj[m.slug] = m
    })

  return obj
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
  // For browser types, we leave them capitalized, otherwise we return a lowercase TypeScript name
  return ['Boolean', 'String', 'Number', 'Function', 'Object'].indexOf(type) > -1
    ? type.toLowerCase()
    : type
}

// Compute the default value (in web-type form) for a given prop definition (component props only)
const computePropDefault = ({ default: def, type }) => {
  // Default could be a function that returns a non-primitive type
  def = typeof def === 'function' ? def.call({}) : def
  if (type === Boolean || (Array.isArray(type) && type[0] === Boolean && !def)) {
    def = Boolean(def)
  } else if (def === undefined) {
    def = null
  }
  return JSON.stringify(def)
}

// Process a single component's meta and definition/class objects
const processComponentMeta = (meta, groupRef, groupDescription, docUrl, postprocess) => {
  const componentName = meta.component

  // Pull information from the component definition/class
  const componentRef = groupRef[componentName] || {}
  const $options = componentRef.options || componentRef
  const $props = $options.props || {}
  const $model = $options.model || null

  // Pull additional info from meta
  const $events = meta.events || []
  const $slots = meta.slots || []
  const $aliases = meta.aliases || []
  // Pull in any prop info from the meta (i.e. description)
  const $propsExtra = (meta.props || []).reduce((obj, p) => {
    if (p && p.prop) {
      obj[p.prop] = p
    }
    return obj
  }, {})

  // Build the component reference
  const component = {
    name: componentName,
    source: {
      module: libraryName,
      symbol: componentName
    },
    'doc-url': docUrl,
    description: groupDescription,
    props: []
  }

  // Add v-model information
  if ($model && $model.prop && $model.event) {
    component['vue-model'] = {
      prop: $model.prop,
      event: $model.event
    }
  }

  // Add props
  if (Object.keys($props).length) {
    component.props = Object.keys($props).map(propName => {
      const $prop = $props[propName]
      const $propExtra = $propsExtra[propName] || {}
      const $propFallbackExtra = commonPropsMeta[propName] || {}
      const type = computePropType($prop)
      const prop = {
        name: propName,
        type,
        default: computePropDefault($prop),
        'doc-url': docUrl
      }
      // Add required prop is required
      if ($prop.required) {
        prop.required = true
      }
      if (type === 'boolean') {
        // Deprecated. Use 'value' property instead. Specify only if type is
        // 'boolean' for backwards compatibility with WebStorm 2019.2
        prop.type = 'boolean'
      }
      // If we have a description, add it to the prop
      // TODO: This doesn't exist in the component meta yet
      prop.description =
        typeof $propExtra.description === 'undefined'
          ? $propFallbackExtra.description
          : $propExtra.description
      if (!prop.description) {
        // JSON stringification will remove properties with an undefined value
        prop.description = undefined
      }
      // TODO: This doesn't exist in the component meta yet
      if ($propExtra.href) {
        // If the prop has a document ID link, add it on here
        // The `href` property is an ID in the docs page
        prop['doc-url'] = `${docUrl}#${$propExtra.href.replace(/^#/, '')}`
      }
      return prop
    })
  }

  // Add events
  if ($events.length) {
    component.events = $events.map(eventObj => {
      const event = {
        name: eventObj.event,
        'doc-url': docUrl
      }
      if (eventObj.description) {
        event.description = eventObj.description
      }
      if (Array.isArray(eventObj.args)) {
        event.arguments = eventObj.args.map((arg, index) => {
          arg = typeof arg === 'object' ? arg : { arg }
          const name = arg.arg || (arg.type ? computePropType(arg) : undefined) || 'arg' + index
          const argument = {
            name: name.charAt(0).toLowerCase() + name.slice(1),
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
    component.slots = $slots.map(slotObj => {
      const slot = {
        name: slotObj.name,
        'doc-url': docUrl
      }
      if (slotObj.description) {
        slot.description = slotObj.description
      }
      if (slotObj.pattern) {
        // Allow RegExpr for dynamic slot names
        // Passed as a string with `\` escaped
        slot.pattern = slotObj.pattern
        // The name of the slot should have the variable part surrounded by { }
        // for auto positioning the cursor to fill in the name
      }
      if (Array.isArray(slotObj.scope)) {
        slot['vue-properties'] = slotObj.scope.map(propDef => {
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

  // Do any additional postprocessing
  if (postprocess) {
    postprocess(component)
  }

  // Add the component
  webTypes.contributions.html['vue-components'].push(component)

  // Add in any component aliases
  if ($aliases.length) {
    // Add the aliases
    $aliases.forEach(alias => {
      const aliasComponent = {
        ...component,
        name: alias,
        source: { ...component.source, symbol: alias }
      }
      aliasComponent.description = `${component.description}\n\n*Alias for ${component.name}*`
      webTypes.contributions.html['vue-components'].push(aliasComponent)
    })
  }
}

// Process a single directive meta object
const processDirectiveMeta = (directiveMeta, directiveDescription, docUrl) => {
  // Process the directive meta
  // String (PascalCase)
  const name = directiveMeta.directive
  // Object
  const arg = directiveMeta.arg
  // Array of objects
  const modifiers = directiveMeta.modifiers
  // Object
  const expression = directiveMeta.expression

  // Build the directive def
  const directive = {
    name: kebabCase(name).substring(2),
    source: {
      module: libraryName,
      symbol: name
    },
    description: directiveDescription,
    'doc-url': docUrl
  }

  // Add in argument details
  if (arg) {
    directive.argument = {
      // RegExpr string pattern for argument
      pattern: arg.pattern,
      description: arg.description,
      required: arg.required
    }
  }

  // Add in any modifier details
  if (modifiers) {
    directive.modifiers = modifiers.map(mod => {
      const modifier = {
        name: mod.name,
        'doc-url': docUrl
      }
      if (mod.pattern) {
        modifier.pattern = mod.pattern
      }
      if (mod.description) {
        modifier.description = mod.description
      }
      return modifier
    })
  }

  // Add in value (expression) type (Array of types or a single type)
  if (expression) {
    directive['attribute-value'] = {
      kind: 'expression',
      type: computePropType({ type: expression })
    }
  }

  // Add the directive to the html vue-directives array
  webTypes.contributions.html['vue-directives'].push(directive)
}

// Create vue-component entries for each component in a component group
const processComponentGroup = groupSlug => {
  // Array of components in the group
  const groupMeta = componentGroups[groupSlug] || {}
  const componentsMeta = groupMeta.components || []
  const directivesMeta = groupMeta.directives || []

  // The URL to the components docs
  const docUrl = `${baseDocs}/docs/components/${groupSlug}/`.replace('//', '/')

  // We import the component from the transpiled `esm/` dir
  const groupRef = require(path.resolve(baseDir, 'esm/components/' + (groupSlug || '')))

  // Process each component
  componentsMeta.forEach(meta => {
    processComponentMeta(meta, groupRef, groupMeta.description, docUrl)
  })

  // Process any directives provided in the meta
  // These directives do not have their own `package.json` files
  directivesMeta.forEach(directiveMeta => {
    processDirectiveMeta(directiveMeta, groupMeta.description, docUrl)
  })
}

// Create vue-component entries for each component in a component group
const processIconGroup = groupSlug => {
  // Array of components in the group
  const groupMeta = iconGroups[groupSlug] || {}
  const iconsMeta = groupMeta.components || []

  // The URL to the components docs
  const docUrl = `${baseDocs}/docs/icons/`

  // We import the component from the transpiled `esm/` dir
  const groupRef = require(path.resolve(baseDir, 'esm/icons'))

  // Get SVGs for each icon
  const iconsFile = fs.readFileSync(path.resolve(baseDir, 'esm/icons/icons.js')).toString()
  const regex = /makeIcon\('([a-zA-Z0-9]+)','([^']+)'/g
  let m = regex.exec(iconsFile)
  const svgs = {}
  while (m) {
    svgs[m[1]] = m[2]
    m = regex.exec(iconsFile)
  }
  const svgPrefix = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 16 16" xml:space="preserve" height="16px" width="16px">`

  // Create list of vue-bootstrap-icons
  const iconNames = iconsMeta
    .filter(it => !!it['auto-gen'] && it.component.startsWith('BIcon'))
    .map(it => it.component.substring('BIcon'.length))

  webTypes.contributions.html['vue-bootstrap-icons'] = iconNames.map(name => ({
    name,
    icon: `${svgPrefix}${svgs[name]}</svg>`,
    'doc-url': 'https://bootstrap-vue.org/docs/icons/#icons-1'
  }))

  webTypes.contributions.html['vue-bootstrap-icons-kebabized'] = iconNames.map(name => ({
    name: kebabCase(name),
    icon: `${svgPrefix}${svgs[name]}</svg>`,
    'doc-url': 'https://bootstrap-vue.org/docs/icons/#icons-1'
  }))

  // Process each regular component
  iconsMeta.filter(it => !it['auto-gen'] || !it.component.startsWith('BIcon')).forEach(meta => {
    processComponentMeta(meta, groupRef, groupMeta.description, docUrl, component => {
      // Add list of icons to BIcon icon prop
      if (component.name === 'BIcon') {
        const iconProp = component.props.find(it => it.name === 'icon')
        iconProp['attribute-value'] = {
          kind: 'plain',
          type: 'enum'
        }
        iconProp.values = {
          name: 'Bootstrap icon',
          pattern: {
            items: '/html/vue-bootstrap-icons-kebabized'
          }
        }
      }
    })
  })

  // Add special Vue component, which enables completion for all icons based on IconBlank
  processComponentMeta(
    iconsMeta.find(it => it['auto-gen'] && it.component.startsWith('BIcon')),
    groupRef,
    groupMeta.description,
    docUrl,
    component => {
      component.name = 'Bootstrap Icon'
      component.pattern = {
        or: [
          {
            items: '/html/vue-bootstrap-icons',
            template: ['BIcon', '$...', '#item:icon name']
          },
          {
            items: '/html/vue-bootstrap-icons-kebabized',
            template: ['b-icon-', '$...', '#item:icon name']
          }
        ]
      }
    }
  )
}

// Create vue-directive entries for each directive
const processDirectiveGroup = groupSlug => {
  // Directives only have a single entry in their Meta for `directive`
  const directiveMeta = directiveGroups[groupSlug] || {}
  const docUrl = `${baseDocs}/docs/directives/${groupSlug}/`

  // Process the directive meta
  processDirectiveMeta(directiveMeta, directiveMeta.description, docUrl)
}

// Wrapped in a try/catch to handle any errors
try {
  // Grab the component meta data (from the source dir component's `package.json`)
  const componentsContext = requireContext(
    path.resolve(baseDir, 'src/components'),
    true,
    /package.json/
  )
  componentGroups = importAll(componentsContext)

  // Grab the icons meta data
  const iconsContext = requireContext(path.resolve(baseDir, 'src/icons'), false, /package.json/)
  iconGroups = importAll(iconsContext)

  // Grab the directive meta data
  const directivesContext = requireContext(
    path.resolve(baseDir, 'src/directives'),
    true,
    /package.json/
  )
  directiveGroups = importAll(directivesContext)

  // Process all components into webTypes
  Object.keys(componentGroups).forEach(processComponentGroup)

  // Process all icons into webTypes (note there is only one group)
  Object.keys(iconGroups).forEach(processIconGroup)

  // Process all directives into webTypes
  Object.keys(directiveGroups).forEach(processDirectiveGroup)

  // Create Vetur tags and attributes files
  const veturTags = {}
  const veturAttributes = {}
  // Add component specific info
  Object.keys(webTypes.contributions.html['vue-components']).forEach(component => {
    const def = webTypes.contributions.html['vue-components'][component]
    if (def.pattern) return
    const tag = kebabCase(def.name)
    // Component tag
    veturTags[tag] = {
      // `subtags` is a list of supported child components, but
      // we do not have a way of populating this at the moment
      // subtags: [],
      description: def.description,
      attributes: def.props.map(attrObj => kebabCase(attrObj.name))
    }
    // Component props
    def.props.forEach(propObj => {
      const type = propObj.type || 'any'
      veturAttributes[`${tag}/${kebabCase(propObj.name)}`] = {
        description: propObj.description || `One of: ${type.split('|').join(' or ')}`,
        type
      }
    })
  })

  // Create icon components info
  const blankIcon = webTypes.contributions.html['vue-components'].find(
    it => it.name === 'Bootstrap Icon'
  )
  for (const icon of webTypes.contributions.html['vue-bootstrap-icons-kebabized']) {
    const tag = 'b-icon-' + icon.name
    // Component tag
    veturTags[tag] = {
      // `subtags` is a list of supported child components, but
      // we do not have a way of populating this at the moment
      // subtags: [],
      description: blankIcon.description,
      attributes: blankIcon.props.map(attrObj => kebabCase(attrObj.name))
    }
    // Component props
    blankIcon.props.forEach(attrObj => {
      const type = (attrObj['attribute-value'] || { type: 'any' }).type
      veturAttributes[`${tag}/${kebabCase(attrObj.name)}`] = {
        description: attrObj.description || `One of: ${type.split('|').join(' or ')}`,
        type
      }
    })
  }

  // Add global directive "attributes"
  Object.keys(webTypes.contributions.html['vue-directives']).forEach(directive => {
    const def = webTypes.contributions.html['vue-directives'][directive]
    const attr = 'v-' + kebabCase(def.name)
    veturAttributes[attr] = {
      global: true,
      description: def.description
    }
  })

  // Write out JSON files
  // Note that `JSON.stringify` will remove any object
  // properties that have an `undefined` value

  // Write web-types.json to file
  console.log('   Writing dist/web-types.json...')
  const webTypesJson = JSON.stringify(webTypes, null, 2)
  fs.writeFileSync(path.resolve(distDir, 'web-types.json'), webTypesJson)

  // Write tags.json to file
  console.log('   Writing dist/vetur-tags.json...')
  const veturTagsJson = JSON.stringify(veturTags, null, 2)
  fs.writeFileSync(path.resolve(distDir, 'vetur-tags.json'), veturTagsJson)

  // Write attributes.json to file
  console.log('   Writing dist/vetur-attributes.json...')
  const veturAttributesJson = JSON.stringify(veturAttributes, null, 2)
  fs.writeFileSync(path.resolve(distDir, 'vetur-attributes.json'), veturAttributesJson)

  // Done
} catch (err) {
  // Add some basic error handling here
  console.log(`create-web-types.js: an error occurred...`)
  console.log()
  console.error(err)
  console.log()
  process.exit(1)
}
