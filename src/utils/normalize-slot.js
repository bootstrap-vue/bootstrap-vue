/**
 * Returns vNodes for named slot either scoped or unscoped
 *
 * @param {String} name
 * @param {String} scope
 * @param {Object} scopedSlots
 * @param {Object} slots
 * @returns {Array|undefined} vNodes
 */

export default function normalizeSlot(name, scope = {}, $scopedSlots = {}, $slots = {}) {
  const slot = $scopedSlots[name] || $slots[name]
  return typeof slot === 'function' ? slot(scope) : slot
}
