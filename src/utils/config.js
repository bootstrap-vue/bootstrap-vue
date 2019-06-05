import Vue from './vue'
import cloneDeep from './clone-deep'
import get from './get'
import warn from './warn'
import { isArray, isObject, isString, isUndefined } from './inspect'
import { keys } from './object'
import DEFAULTS from './config-defaults'

const BvConfig = Vue.extend({
  created() {
    // Non reactive private properties
    this.$_config = {}
    this.$_cachedBreakpoints = null
  },
  methods: {
    getDefaults() {
      // Returns a copy of the defaults
      return cloneDeep(DEFAULTS)
    },
    getConfig() {
      // Returns a copy of the user config
      return cloneDeep(this.$_config)
    },
    resetConfig() {
      // Clear the config. For testing purposes only
      this.$_config = {}
    },
    getConfigValue(key) {
      // First we try the user config, and if key not found we fall back to default value
      // NOTE: If we deep clone DEFAULTS into config, then we can skip the fallback for get
      return cloneDeep(get(this.$_config, key, get(DEFAULTS, key)))
    },
    getComponentConfig(cmpName, key = null) {
      // Return the particular config value for key for if specified,
      // otherwise we return the full config
      return key ? this.getConfigValue(`${cmpName}.${key}`) : this.getConfigValue(cmpName) || {}
    },
    getBreakpoints() {
      // Convenience method for getting all breakpoint names
      return this.getConfigValue('breakpoints')
    },
    getBreakpointsCached() {
      // Convenience method for getting all breakpoint names
      // Caches the results after first access
      if (!this.$_cachedBreakpoints) {
        this.$_cachedBreakpoints = this.getBreakpoints()
      }
      return cloneDeep(this.$_cachedBreakpoints)
    },
    getBreakpointsUp() {
      // Convenience method for getting breakpoints with
      // the smallest breakpoint set as ''
      // Useful for components that create breakpoint specific props
      const breakpoints = this.getBreakpoints()
      breakpoints[0] = ''
      return breakpoints
    },
    getBreakpointsUpCached() {
      // Convenience method for getting breakpoints with
      // the smallest breakpoint set as ''
      // Useful for components that create breakpoint specific props
      // Caches the results after first access
      const breakpoints = this.getBreakpointsCached()
      breakpoints[0] = ''
      return breakpoints
    },
    getBreakpointsDown() {
      // Convenience method for getting breakpoints with
      // the largest breakpoint set as ''
      // Useful for components that create breakpoint specific props
      const breakpoints = this.getBreakpoints()
      breakpoints[breakpoints.length - 1] = ''
      return breakpoints
    },
    getBreakpointsDownCached() /* istanbul ignore next: we don't use this method anywhere, yet */ {
      // Convenience method for getting breakpoints with
      // the largest breakpoint set as ''
      // Useful for components that create breakpoint specific props
      // Caches the results after first access
      const breakpoints = this.getBreakpointsCached()
      breakpoints[breakpoints.length - 1] = ''
      return breakpoints
    },
    setConfig(config = {}) {
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
              breakpoints.some(b => !isString(b) || b.length === 0)
            ) {
              /* istanbul ignore next */
              warn('config: "breakpoints" must be an array of at least 2 breakpoint names')
            } else {
              this.$_config.breakpoints = cloneDeep(breakpoints)
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
                  this.$_config[cmpName] = this.$_config[cmpName] || {}
                  if (!isUndefined(cmpConfig[key])) {
                    this.$_config[cmpName][key] = cloneDeep(cmpConfig[key])
                  }
                }
              })
          }
        })
    }
  }
})

// This contains user defined configuration manager object.
// This object should be treated as private!
Vue.prototype.$bvConfig = Vue.prototype.$bvConfig || new BvConfig()

// Method to get a deep clone (immutable) copy of the defaults
const getDefaults = () => {
  return Vue.prototype.$bvConfig.getDefaults()
}

// Method to set the config
// Merges in only known top-level and sub-level keys
//   Vue.use(BootstrapVue, config)
// or
//   BootstrapVue.setConfig(config)
//   Vue.use(BootstrapVue)
const setConfig = (config = {}) => {
  Vue.prototype.$bvConfig.setConfig(config)
}

// Reset the user config to default
// For testing purposes only
const resetConfig = () => {
  Vue.prototype.$bvConfig.resetConfig()
}

// Get the current user config
// For testing purposes only
const getConfig = () => {
  return Vue.prototype.$bvConfig.getConfig()
}

// Method to grab a config value based on a dotted/array notation key
// Returns a deep clone (immutable) copy
const getConfigValue = key => {
  return Vue.prototype.$bvConfig.getConfigValue(key)
}

// Method to grab a config value for a particular component.
// Returns a deep clone (immutable) copy
const getComponentConfig = (cmpName, key = null) => {
  // Return the particular config value for key for if specified,
  // otherwise we return the full config
  return Vue.prototype.$bvConfig.getComponentConfig(cmpName, key)
}

// Convenience method for getting all breakpoint names
const getBreakpoints = () => {
  return Vue.prototype.$bvConfig.getBreakpoints()
}

// Convenience method for getting all breakpoint names
// Caches the results after first access
/* istanbul ignore next: we don't use this method directly in any components, yet */
const getBreakpointsCached = () => {
  return Vue.prototype.$bvConfig.getBreakpointsCached()
}

// Convenience method for getting breakpoints with
// the smallest breakpoint set as ''
// Useful for components that create breakpoint specific props
const getBreakpointsUp = () => {
  return Vue.prototype.$bvConfig.getBreakpointsUp()
}

// Convenience method for getting breakpoints with
// the smallest breakpoint set as ''
// Useful for components that create breakpoint specific props
// Caches the results after first access
const getBreakpointsUpCached = () => {
  return Vue.prototype.$bvConfig.getBreakpointsUpCached()
}

// Convenience method for getting breakpoints with
// the largest breakpoint set as ''
// Useful for components that create breakpoint specific props
const getBreakpointsDown = () => {
  return Vue.prototype.$bvConfig.getBreakpointsDown()
}

// Convenience method for getting breakpoints with
// the largest breakpoint set as ''
// Useful for components that create breakpoint specific props
// Caches the results after first access
/* istanbul ignore next: we don't use this method anywhere, yet */
const getBreakpointsDownCached = () => {
  return Vue.prototype.$bvConfig.getBreakpointsDownCached()
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
  getBreakpointsDown,
  getBreakpointsCached,
  getBreakpointsUpCached,
  getBreakpointsDownCached
}
