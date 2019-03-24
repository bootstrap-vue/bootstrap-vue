//
// General Bootstrap Vue configuration
//
// TODO:
//  - Pull this default config into the documentation (/docs/reference/settings)
//    and document how to configure the settings
//
import get from './get'
import { keys, isObject } from './object'
import { isArray } from './array'

// DISCUSSION: Breakpoint definitions
//
// Some components (BCol and BFormGroup) generate props based on breakpoints, and this
// occurs when the component is first loaded (evaluated), which may happen before the
// config is created/modified
//
// To get around this we make these components async (lazy evaluation).
// The component definition is only called/executed when the first access to the
// component is used (and cached on subsequent uses)
//
// See: https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components
//
// DISCUSSION: Prop Defaults
//
// For default values on props, we use the default value factory function approach so
// so that the default values are pulled in at each component instantiation.
//
//   props: {
//     variant: {
//       type: String,
//       default: () => getConfigComponent('BAlert', 'variant')
//     }
//   }
//

// prettier-ignore
const DEFAULTS = {
  // Breakpoints... see discussion above
  breakpoints: [
    'xs', 'sm', 'md', 'lg', 'xl'
  ],

  // Component Specific defaults are keyed by the component
  // name (PascalCase) and prop name (camelCase)
  BAlert: {
    variant: 'info'
  },
  BBadge: {
    variant: 'secondary'
  },
  BButton: {
    variant: 'secondary'
  },
  BButtonClose: {
    textVariant: null,
    ariaLabel: 'Close'
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
const CONFIG = {}

// Method to get a deep clone (immutable) copy of the defaults
const getDefaults = () => JSON.parse(JSON.stringify(DEFAULTS))

// Method to set the config.
// Merges in only known top-level and sub-level keys.
//   Vue.use(BootstrapVue, config)
// or
//   BootstrapVue.setConfig(config)
//   Vue.use(BootstrapVue)

/* istanbul ignore next: just for now to prevent red X on codecov until we can test this */
const setConfig = (opts = {}) => {
  if (isObject(opts)) {
    keys(opts).forEach(component => {
      if (opts.hasOwnProperty(component) && DEFAULTS.hasOwnProperty(component)) {
        if (component === 'breakpoints' && isArray(opts.breakpoints)) {
          // special case for breakpoints
          CONFIG.breakpoints = JSON.parse(JSON.stringify(opts.breakpoints))
        } else if (isObject(opts[component])) {
          keys(opts[component]).forEach(prop => {
            if (opts[component].hasOwnProperty(prop) && DEFAULTS[component].hasOwnProperty(prop)) {
              // If we pre-populate the config with the defaults, we can skip this line
              CONFIG[component] = CONFIG[component] || {}
              CONFIG[component][prop] = opts[component][prop]
            }
          })
        }
      }
    })
  }
}

// Method to grab a config value based on a dotted/array notation key.
// Returns a deep clone (immutable) copy
const getConfigParam = key => {
  // First we try the user config, and if key not found we fall back to default value.
  // NOTE: If we deep clone DEFAULTS into config, then we can skip the fallback for get
  return JSON.parse(JSON.stringify(get(CONFIG, key, get(getDefaults(), key))))
}

// Method to grab a config value for a particular component.
// Returns a deep clone (immutable) copy
const getComponentConfig = (cmpName, key = null) => {
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
  return getConfigParam('breakpoints')
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
  setConfig,
  getDefaults, 
  getConfigParam,
  getComponentConfig,
  getBreakpointsAll,
  getBreakpointsUp,
  getBreakpointsDown
}
