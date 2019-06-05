import Vue from './vue'
import cloneDeep from './clone-deep'
import get from './get'
import memoize from './memoize'
import DEFAULTS from './config-defaults'

// TODO: Temporary, until plugin installers are updated and tests are updated
export { setConfig } from './config-set'

// Method to get a deep clone (immutable) copy of the defaults
// For testing purposes only
export const getDefaults = () => {
  return cloneDeep(DEFAULTS)
}

// Reset the user config to default
// For testing purposes only
// TODO: MOVE to config-set.js
export const resetConfig = () => {
  Vue.prototype.$bvConfig && Vue.prototype.$bvConfig.resetConfig()
}

// Get the current user config
// For testing purposes only
export const getConfig = () => {
  return Vue.prototype.$bvConfig ? Vue.prototype.$bvConfig.getConfig() : {}
}

// Method to grab a config value based on a dotted/array notation key
// Returns a deep clone (immutable) copy
export const getConfigValue = key => {
  return Vue.prototype.$bvConfig
    ? Vue.prototype.$bvConfig.getConfigValue(key)
    : cloneDeep(get(DEFAULTS, key))
}

// Method to grab a config value for a particular component.
// Returns a deep clone (immutable) copy
export const getComponentConfig = (cmpName, key = null) => {
  // Return the particular config value for key for if specified,
  // otherwise we return the full config (or an empty object if not found)
  return key ? getConfigValue(`${cmpName}.${key}`) : getConfigValue(cmpName) || {} 
}

// Convenience method for getting all breakpoint names
// Returns a deep clone (immutable) copy
export const getBreakpoints = () => {
  return getConfigValue('breakpoints')
}

// Private function for caching / locking-in breakpoint names
// Returns a deep clone (immutable) copy
const _getBreakpointsCached = memoize(() => {
  return getBreakpoints()
})

// Convenience method for getting all breakpoint names
// Caches the results after first access
// Returns a deep clone (immutable) copy
export const getBreakpointsCached = () => {
  return cloneDeep(_getBreakpointsCached())
}

// Convenience method for getting breakpoints with
// the smallest breakpoint set as ''.
// Useful for components that create breakpoint specific props.
// Returns a deep clone (immutable) copy.
export const getBreakpointsUp = () => {
  const breakpoints = getBreakpoints()
  breakpoints[0] = ''
  return breakpoints
}

// Convenience method for getting breakpoints with
// the smallest breakpoint set as ''.
// Useful for components that create breakpoint specific props.
// Caches the results after first access.
// Returns a deep clone (immutable) copy.
export const getBreakpointsUpCached = memoize(() => {
  const breakpoints = getBreakpointsCached()
  breakpoints[0] = ''
  return breakpoints
})

// Convenience method for getting breakpoints with
// the largest breakpoint set as ''.
// Useful for components that create breakpoint specific props.
// Returns a deep clone (immutable) copy.
export const getBreakpointsDown = () => {
  const breakpoints = getBreakpoints()
  breakpoints[breakpoints.length - 1] = ''
  return breakpoints
}

// Convenience method for getting breakpoints with
// the largest breakpoint set as ''.
// Useful for components that create breakpoint specific props.
// Caches the results after first access.
// Returns a deep clone (immutable) copy.
/* istanbul ignore next: we don't use this method anywhere, yet */
export const getBreakpointsDownCached = () => {
  const breakpoints = getBreakpointsCached()
  breakpoints[breakpoints.length - 1] = ''
  return breakpoints
}
