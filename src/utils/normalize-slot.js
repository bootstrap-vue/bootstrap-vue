import identity from './identity'
import { concat } from './array'
import { isFunction } from './inspect'

// Note for functional components:
// In functional components, `slots` is a function so it must be called
// first before passing to the below methods. `scopedSlots` is always an
// object and may be undefined (for Vue < 2.6.x)

/**
 * Returns true if either scoped or unscoped named slot exists
 *
 * @param {String, Array} name or name[]
 * @param {Object} scopedSlots
 * @param {Object} slots
 * @returns {Array|undefined} VNodes
 */
const hasNormalizedSlot = (names, $scopedSlots = {}, $slots = {}) => {
  // Ensure names is an array
  names = concat(names).filter(identity)
  // Returns true if the either a $scopedSlot or $slot exists with the specified name
  return names.some(name => $scopedSlots[name] || $slots[name])
}

/**
 * Returns VNodes for named slot either scoped or unscoped
 *
 * @param {String, Array} name or name[]
 * @param {String} scope
 * @param {Object} scopedSlots
 * @param {Object} slots
 * @returns {Array|undefined} VNodes
 */
const normalizeSlot = (names, scope = {}, $scopedSlots = {}, $slots = {}) => {
  // Ensure names is an array
  names = concat(names).filter(identity)
  let slot
  for (let i = 0; i < names.length && !slot; i++) {
    const name = names[i]
    slot = $scopedSlots[name] || $slots[name]
  }
  // Note: in Vue 2.6.x, all named slots are also scoped slots
  return isFunction(slot) ? slot(scope) : slot
}

// Named exports
export { hasNormalizedSlot, normalizeSlot }

// Default export (backwards compatibility)
export default normalizeSlot
