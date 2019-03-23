//
// General Bootstrap Vue config parameters
//
// TODO:
//  - Make this cofigurable before bootstrap Vue is loaded, eitther by
//    passing an expression to Vue.use(BootstrapVue, config = {}) or
//    via global window.BoostrapVue.config (or similar)
//  - Add default variants for each component (that may have a default
//    variant, such as button, etc)
//  - Pull this default config into the documentation (/docs/reference/settings)
//    and document how to configure the settings
//
import get from './get'

const BV_DEFAULTS = {
  breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
  // Component Specific defaults are keyed by the component
  // name (PascalCase) and prop name (camelCase)
  BAlert: { variant: 'info' },
  BBadge: { variant: 'secondary' },
  BButton: { variant: 'secondary' },
  BButtonCose: { textVariant: null },
  BDropdown: { variant: null }, // defaults to button variant
  BImg: { blankColor: 'transparent' }
}

// This will be the object that any future user defined
// configuration will be placed in the future
const config = {}

// Method to get a deep clone (immutable) copy of the defaults
const getDefaults = () => JSON.parse(JSON.stringify(BV_DEFAULTS))

// Method to grab a config value based on a dotted/array notation key.
// Returns a deep clone (immutable) copy
const getConfigParam = key => {
  // First we try the user config, and if key not found we
  // fall back to default value.
  return JSON.parse(JSON.stringify(get(config, key, get(getDefaults(), key))))
}

// Method to grab a config value for a particular component.
// Returns a deep clone (immutable) copy
const getConfigComponent = (cmpName, key = null) => {
  if (key) {
    // Return the particular config value for key for specified component
    return getConfigParam(`${cmpName}.${key}`)
  } else {
    // return the components full config
    return getConfigParam(cmpName) || {}
  }
}

// Convenience method for getting all breakpoint names
const getBreakpointsAll = () => {
  const bpts = getConfigParam('breakpoints')
  return bpts
}

// Convenience method for getting breakpoints with
// the smallest breakpoint set as ''.
// Usefull for components that create breakpoint specific props
const getBreakpointsUp = () => {
  const bpts = getBreakpointsAll()
  bpts[0] = ''
  return bpts
}

// Convenience method for getting breakpoints with
// the largest breakpoint set as ''.
// Usefull for components that create breakpoint specific props
const getBreakpointsDown = () => {
  const bpts = getBreakpointsAll()
  bpts[bpts.length - 1] = ''
  return bpts
}

// Named Exports
// prettier-ignore
export {
  getDefaults, 
  getConfigParam,
  getConfigComponent,
  getBreakpointsAll,
  getBreakpointsUp,
  getBreakpointsDown
}
