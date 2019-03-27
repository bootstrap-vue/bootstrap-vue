import cloneDeep from './clone-deep'
import get from './get'
import warn from './warn'
import { isArray } from './array'
import { keys, isObject } from './object'

// General Bootstrap Vue configuration
//
// BREAKPOINT DEFINITIONS
//
// Some components (BCol and BFormGroup) generate props based on breakpoints, and this
// occurs when the component is first loaded (evaluated), which may happen before the
// config is created/modified
//
// To get around this we make these components async (lazy evaluation)
// The component definition is only called/executed when the first access to the
// component is used (and cached on subsequent uses)
//
// See: https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components
//
// PROP DEFAULTS
//
// For default values on props, we use the default value factory function approach so
// so that the default values are pulled in at each component instantiation
//
//  props: {
//    variant: {
//      type: String,
//      default: () => getConfigComponent('BAlert', 'variant')
//    }
//  }

// prettier-ignore
const DEFAULTS = {
  // Breakpoints
  breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],

  // Component Specific defaults are keyed by the component
  // name (PascalCase) and prop name (camelCase)
  BAlert: {
    dismissLabel: 'Close',
    variant: 'info'
  },
  BBadge: {
    variant: 'secondary'
  },
  BButton: {
    variant: 'secondary'
  },
  BButtonClose: {
    // `textVariant` is `null` to inherit the current text color
    textVariant: null,
    ariaLabel: 'Close'
  },
  BCardSubTitle: {
    // BCard and BCardBody also inherit this prop
    subTitleTextVariant: 'muted'
  },
  BDropdown: {
    toggleText: 'Toggle Dropdown',
    variant: 'secondary'
  },
  BFormFile: {
    browseText: 'Browse',
    // Chrome default file prompt
    placeholder: 'No file chosen',
    dropPlaceholder: 'Drop files here'
  },
  BFormText: {
    textVariant: 'muted'
  },
  BImg: {
    blankColor: 'transparent'
  },
  BImgLazy: {
    blankColor: 'transparent'
  },
  BModal: {
    cancelTitle: 'Cancel',
    cancelVariant: 'secondary',
    okTitle: 'OK',
    okVariant: 'primary',
    headerCloseLabel: 'Close'
  }
}

// This contains user defined configuration
let CONFIG = {}

// Method to get a deep clone (immutable) copy of the defaults
const getDefaults = () => cloneDeep(DEFAULTS)

// Method to set the config
// Merges in only known top-level and sub-level keys
//   Vue.use(BootstrapVue, config)
// or
//   BootstrapVue.setConfig(config)
//   Vue.use(BootstrapVue)

const setConfig = (config = {}) => {
  if (!isObject(config)) {
    /* istanbul ignore next */
    return
  }

  keys(config)
    .filter(cmpName => config.hasOwnProperty(cmpName))
    .forEach(cmpName => {
      if (!DEFAULTS.hasOwnProperty(cmpName)) {
        /* istanbul ignore next */
        warn(`config: unknown config property "${cmpName}"`)
        /* istanbul ignore next */
        return
      }
      const cmpConfig = config[cmpName]
      if (cmpName === 'breakpoints') {
        // Special case for breakpoints
        const breakpoints = config.breakpoints
        if (
          !isArray(breakpoints) ||
          breakpoints.length < 2 ||
          breakpoints.some(b => typeof b !== 'string' || b.length === 0)
        ) {
          /* istanbul ignore next */
          warn('config: "breakpoints" must be an array of at least 2 breakpoint names')
        } else {
          CONFIG.breakpoints = cloneDeep(breakpoints)
        }
      } else if (isObject(cmpConfig)) {
        keys(cmpConfig)
          .filter(key => cmpConfig.hasOwnProperty(key))
          .forEach(key => {
            if (!DEFAULTS[cmpName].hasOwnProperty(key)) {
              /* istanbul ignore next */
              warn(`config: unknown config property "${cmpName}.{$key}"`)
            } else {
              // If we pre-populate the config with defaults, we can skip this line
              CONFIG[cmpName] = CONFIG[cmpName] || {}
              if (cmpConfig[key] !== undefined) {
                CONFIG[cmpName][key] = cloneDeep(cmpConfig[key])
              }
            }
          })
      }
    })
}

// Reset the user config to default
// For testing purposes only
const resetConfig = () => {
  CONFIG = {}
}

// Get the current user config
// For testing purposes only
const getConfig = () => cloneDeep(CONFIG)

// Method to grab a config value based on a dotted/array notation key
// Returns a deep clone (immutable) copy
const getConfigValue = key => {
  // First we try the user config, and if key not found we fall back to default value
  // NOTE: If we deep clone DEFAULTS into config, then we can skip the fallback for get
  return cloneDeep(get(CONFIG, key, get(getDefaults(), key)))
}

// Method to grab a config value for a particular component.
// Returns a deep clone (immutable) copy
const getComponentConfig = (cmpName, key = null) => {
  // Return the particular config value for key for if specified,
  // otherwise we return the full config
  return key ? getConfigValue(`${cmpName}.${key}`) : getConfigValue(cmpName) || {}
}

// Convenience method for getting all breakpoint names
const getBreakpoints = () => getConfigValue('breakpoints')

// Convenience method for getting breakpoints with
// the smallest breakpoint set as ''
// Useful for components that create breakpoint specific props
const getBreakpointsUp = () => {
  const breakpoints = getBreakpoints()
  breakpoints[0] = ''
  return breakpoints
}

// Convenience method for getting breakpoints with
// the largest breakpoint set as ''
// Useful for components that create breakpoint specific props
const getBreakpointsDown = () => {
  const breakpoints = getBreakpoints()
  breakpoints[breakpoints.length - 1] = ''
  return breakpoints
}

// Named Exports
export {
  setConfig,
  resetConfig,
  getConfig,
  getDefaults,
  getConfigValue,
  getComponentConfig,
  getBreakpoints,
  getBreakpointsUp,
  getBreakpointsDown
}
