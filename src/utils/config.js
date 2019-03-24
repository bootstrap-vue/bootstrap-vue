//
// General Bootstrap Vue configuration
//
// TODO:
//
//  - Make this cofigurable before bootstrap Vue is loaded, either by
//    passing an expression to Vue.use(BootstrapVue, config = {}) or
//    via global window.BoostrapVue.config, or Vue.prototype.XXX (or similar)
//
//  - Pull this default config into the documentation (/docs/reference/settings)
//    and document how to configure the settings
//
import get from './get'
import { keys, isObject } from './object'
import { isArray } from './array'

// DISCUSSION: Breakpoint definitions
//
// Should breakpoints be stored here, or maybe on the Vue prototype?
//
//   i.e. Vue.prototype.$BV_BREAKPOINTS
//
// Some components (BCol and BFormGroup) generate props based on breakpoints, and this
// occurs when the component is first loaded (evaluated), which may happen before the
// config is created/modified
//
// To get around this would be to make the components that need to generate
// prop names based on the config would be to define the component(s) as such:
//
//   // we use a named function so that component.name resolves to the components name
//   // and that minification doesn't mangle the name
//   const BFormGroup = function BFormGroup(resolve, reject) => {
//     // prop computation could happen before the resolve
//     // or within the component using object spread on a function()
//     resolve( /* @vue/component */ {
//       // component definition
//     })
//   }
//   export default BFormGroup
//
// Now the component definition is only called/executed when the first access to the
// component is used (and cached on subsequent uses)
//
// See: https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components
//
// This might be the better solution to the problem, although if other components need to
// pluck props from this component, they wont be able to.
// We are safe with BCol and BFormGroup as nothing else users their props
//

const BREAKPOINTS_DEFAULT = ['xs', 'sm', 'md', 'lg', 'xl']

// DISCUSSION: Prop Defaults
//
// For default values on props, we use the default value factory function approach so
// so that the default values are pulled in at **runtime**
//
//   props: {
//     variant: {
//       type: String,
//       default: () => getConfigComponent('BAlert', 'variant')
//     }
//   }
//

const DEFAULTS = {
  // Breakpoints... see discussion above
  breakpoints: BREAKPOINTS_DEFAULT,
  // Component Specific defaults are keyed by the component
  // name (PascalCase) and prop name (camelCase)
  BAlert: { variant: 'info' },
  BBadge: { variant: 'secondary' },
  BButton: { variant: 'secondary' },
  BButtonClose: { textVariant: null, ariaLabel: 'Close' },
  BDropdown: { variant: 'secondary' },
  BFormFile: {
    browseText: 'Browse',
    dropPlaceholder: 'Drop files here',
    placeholder: 'No file chosen' // Chrome default file prompt
  },
  BImg: { blankColor: 'transparent' },
  BImgLazy: { blankColor: 'transparent' },
  BModal: {
    cancelTitle: 'Cancel',
    cancelVariant: 'secondary',
    okTitle: 'OK',
    okVariant: 'primary',
    headerCloseLabel: 'Close'
  }
}

// This contains user defined configuration
//
// Should this be stored here, or on the Vue.prototype ?????
// For testing purposes, we might want to store this on Vue, so
// we can use localVue so that testing doesn't pollute the config.
// (unless we create a clearConfig() method to reset it)
const CONFIG = {}

// Method to get a deep clone (immutable) copy of the defaults
const getDefaults = () => JSON.parse(JSON.stringify(DEFAULTS))

// Method to set the config.
// Merges in only known top-level and sub-level keys.
//
//   Vue.use(BootstrapVue, config)
// or
//   BootstrapVue.config(config)
//   Vue.use(BootstrapVue)
//
// Breakpoint definition may need to be moved out of the config object
// and set globally before bootstrapVue is loaded

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
  getConfigComponent,
  getBreakpointsAll,
  getBreakpointsUp,
  getBreakpointsDown
}
