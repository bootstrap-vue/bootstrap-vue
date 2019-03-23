//
// General Bootstrap Vue config parameters
//
// TODO:
//  - Make this cofigurable before bootstrap Vue is loaded, eitther by
//    passing an expression to Vue.use(BootstrapVue, config = {}) or
//    via global window.BoostrapVue.config (or similar)
//  - Add default variants for each component (that may have a default
//    variant, such as button, etc
//
import get from './get'

const BV_DEFAULTS = {
  breakpoints: ['xs', 'sm', 'md', 'lg', 'xl']
}

// This will be the object that any future user defined
// configuration will be in
const config = {}

// Method to grab a config value based on a dotted/array notation key
const getConfigParam = key => {
  // First we try the user config, and if key not found we
  // fall back to default value.
  return get(config, key, get(BV_DEFAULTS, key))
}

// Convenience method for getting all breakpoint names
const getBreakpointsAll = () => {
  const bpts = getConfigParam('breakpoints').slice()
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
export { getConfigParam, getBreakpointsAll, getBreakpointsUp, getBreakpointsDown }
