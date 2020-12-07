import { Vue } from '../vue'
import { DEFAULT_BREAKPOINT, PROP_NAME } from '../constants/config'
import { cloneDeep } from './clone-deep'
import { memoize } from './memoize'

// --- Constants ---

const VueProto = Vue.prototype

// --- Getter methods ---
// All methods return a deep clone (immutable) copy of the config value,
// to prevent mutation of the user config object

// Get the current config
export const getConfig = () => {
  const bvConfig = VueProto[PROP_NAME]
  return bvConfig ? bvConfig.getConfig() : {}
}

// Method to grab a config value based on a dotted/array notation key
export const getConfigValue = (key, defaultValue = undefined) => {
  const bvConfig = VueProto[PROP_NAME]
  return bvConfig ? bvConfig.getConfigValue(key, defaultValue) : cloneDeep(defaultValue)
}

// Method to grab a config value for a particular component
export const getComponentConfig = (key, propKey = null, defaultValue = undefined) => {
  // Return the particular config value for key if specified,
  // otherwise we return the full config (or an empty object if not found)
  return propKey ? getConfigValue(`${key}.${propKey}`, defaultValue) : getConfigValue(key, {})
}

// Get all breakpoint names
export const getBreakpoints = () => getConfigValue('breakpoints', DEFAULT_BREAKPOINT)

// Private method for caching breakpoint names
const _getBreakpointsCached = memoize(() => getBreakpoints())

// Get all breakpoint names (cached)
export const getBreakpointsCached = () => cloneDeep(_getBreakpointsCached())

// Get breakpoints with the smallest breakpoint set as ''
// Useful for components that create breakpoint specific props
export const getBreakpointsUp = () => {
  const breakpoints = getBreakpoints()
  breakpoints[0] = ''
  return breakpoints
}

// Get breakpoints with the smallest breakpoint set as '' (cached)
// Useful for components that create breakpoint specific props
export const getBreakpointsUpCached = memoize(() => {
  const breakpoints = getBreakpointsCached()
  breakpoints[0] = ''
  return breakpoints
})

// Get breakpoints with the largest breakpoint set as ''
export const getBreakpointsDown = () => {
  const breakpoints = getBreakpoints()
  breakpoints[breakpoints.length - 1] = ''
  return breakpoints
}

// Get breakpoints with the largest breakpoint set as '' (cached)
// Useful for components that create breakpoint specific props
/* istanbul ignore next: we don't use this method anywhere, yet */
export const getBreakpointsDownCached = () => {
  const breakpoints = getBreakpointsCached()
  breakpoints[breakpoints.length - 1] = ''
  return breakpoints
}
