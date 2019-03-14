import lowerFirst from './lower-first'

/**
 * @param {string} prefix
 * @param {string} value
 */
const unprefixPropName = (prefix, value) => lowerFirst(value.replace(prefix, ''))

export default unprefixPropName
