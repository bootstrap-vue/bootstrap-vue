import { keys } from './object'
import { isArray } from './array'
import identity from './identity'

/**
 * Given an array of properties or an object of property keys,
 * plucks all the values off the target object, returning copies
 * @param {{}|string[]} keysToPluck
 * @param {{}} objToPluck
 * @param {Function} transformFn
 * @return {{}}
 */
export default function pluckProps(keysToPluck, objToPluck, transformFn = identity) {
  return (isArray(keysToPluck) ? keysToPluck.slice() : keys(keysToPluck)).reduce((memo, prop) => {
    memo[transformFn(prop)] = typeof objToPluck[prop] === 'object'
      ? { ...objToPluck[prop] }
      : objToPluck[prop]
    return memo
  }, {})
}
