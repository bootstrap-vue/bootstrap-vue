import upperFirst from './upper-first'

/**
 * Suffix can be a falsey value so nothing is appended to string.
 * (helps when looping over props & some shouldn't change)
 * Use data last parameters to allow for currying.
 * @param {string} suffix
 * @param {string} str
 */
const suffixPropName = (suffix, str) => str + (suffix ? upperFirst(suffix) : '')

export default suffixPropName
