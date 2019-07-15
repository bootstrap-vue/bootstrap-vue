import { upperFirst } from './string'

/**
 * @param {string} prefix
 * @param {string} value
 */
const prefixPropName = (prefix, value) => prefix + upperFirst(value)

export default prefixPropName
