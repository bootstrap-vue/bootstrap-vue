import upperFirst from './upper-first'

/**
 * @param {string} prefix
 * @param {string} value
 */
export default function prefixPropName (prefix, value) {
  return prefix + upperFirst(value)
}
