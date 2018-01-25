import upperFirst from './upper-first'

/**
 * Suffix can be a falsey value so nothing is appended to string.
 * (helps when looping over props & some shouldn't change)
 * Use data last parameters to allow for currying.
 * @param {string} suffix
 * @param {string} str
 */
export default function suffixPropName (suffix, str) {
  return str + (suffix ? upperFirst(suffix) : '')
}
