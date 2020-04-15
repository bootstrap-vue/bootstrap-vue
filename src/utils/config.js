import Vue from './vue'
import cloneDeep from './clone-deep'
import { getRaw } from './get'
import memoize from './memoize'
import DEFAULTS from './config-defaults'

// --- Constants ---

const PROP_NAME = '$bvConfig'
const VueProto = Vue.prototype

// --- Getter methods ---
// All methods return a deep clone (immutable) copy of the config
// value, to prevent mutation of the user config object.

// Get the current user config. For testing purposes only
export const getConfig = () => {
  return VueProto[PROP_NAME] ? VueProto[PROP_NAME].getConfig() : {}
}

// Method to grab a config value based on a dotted/array notation key
export const getConfigValue = key => {
  return VueProto[PROP_NAME]
    ? VueProto[PROP_NAME].getConfigValue(key)
    : cloneDeep(getRaw(DEFAULTS, key))
}

// Method to grab a config value for a particular component
export const getComponentConfig = (cmpName, key = null) => {
  // Return the particular config value for key for if specified,
  // otherwise we return the full config (or an empty object if not found)
  return key ? getConfigValue(`${cmpName}.${key}`) : getConfigValue(cmpName) || {}
}

// Convenience method for getting all breakpoint names
export const getBreakpoints = () => {
  return getConfigValue('breakpoints')
}

// Private function for caching / locking-in breakpoint names
const _getBreakpointsCached = memoize(() => {
  return getBreakpoints()
})

// Convenience method for getting all breakpoint names.
// Caches the results after first access.
export const getBreakpointsCached = () => {
  return cloneDeep(_getBreakpointsCached())
}

// Convenience method for getting breakpoints with
// the smallest breakpoint set as ''.
// Useful for components that create breakpoint specific props.
export const getBreakpointsUp = () => {
  const breakpoints = getBreakpoints()
  breakpoints[0] = ''
  return breakpoints
}

// Convenience method for getting breakpoints with
// the smallest breakpoint set as ''.
// Useful for components that create breakpoint specific props.
// Caches the results after first access.
export const getBreakpointsUpCached = memoize(() => {
  const breakpoints = getBreakpointsCached()
  breakpoints[0] = ''
  return breakpoints
})

// Convenience method for getting breakpoints with
// the largest breakpoint set as ''.
// Useful for components that create breakpoint specific props.
export const getBreakpointsDown = () => {
  const breakpoints = getBreakpoints()
  breakpoints[breakpoints.length - 1] = ''
  return breakpoints
}

// Convenience method for getting breakpoints with
// the largest breakpoint set as ''.
// Useful for components that create breakpoint specific props.
// Caches the results after first access.
/* istanbul ignore next: we don't use this method anywhere, yet */
export const getBreakpointsDownCached = () => /* istanbul ignore next */ {
  const breakpoints = getBreakpointsCached()
  breakpoints[breakpoints.length - 1] = ''
  return breakpoints
}
