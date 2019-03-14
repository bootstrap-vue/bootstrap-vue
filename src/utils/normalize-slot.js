/**
 * Returns vNodes for named slot either scoped or unscoped
 *
 * @param {String} name
 * @param {String} scope
 * @param {Object} scopedSlots
 * @param {Object} slots
 * @returns {Array|undefined} vNodes
 */
const normalizeSlot = (name, scope = {}, $scopedSlots = {}, $slots = {}) => {
  // Note: in Vue 2.6.x, all names slots are also scoped slots
  const slot = $scopedSlots[name] || $slots[name]
  return typeof slot === 'function' ? slot(scope) : slot
}

export default normalizeSlot
