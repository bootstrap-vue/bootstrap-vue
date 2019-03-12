import upperFirst from './upper-first'

/**
 * @param {string} prefix
 * @param {string} value
 */
export default (prefix, value) => prefix + upperFirst(value)
