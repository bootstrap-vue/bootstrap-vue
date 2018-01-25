import upperFirst from './upperFirst'

/**
 * @param {string} prefix
 * @param {string} value
 */
export default function prefixPropName (prefix, value) {
  return prefix + upperFirst(value)
}
