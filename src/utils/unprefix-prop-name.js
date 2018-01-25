import lowerFirst from './lower-first'

/**
 * @param {string} prefix
 * @param {string} value
 */
export default function unPrefixPropName (prefix, value) {
  return lowerFirst(value.replace(prefix, ''))
}
