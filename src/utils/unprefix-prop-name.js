import lowerFirst from './lower-first'

/**
 * @param {string} prefix
 * @param {string} value
 */
export default (prefix, value) => lowerFirst(value.replace(prefix, ''))
