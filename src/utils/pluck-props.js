import { keys } from './object'
import { isArray } from './array'
import identity from './identity'

/**
 * Given an array of properties or an object of property keys,
 * plucks all the values off the target object, returning a new object
 * that has props that reference the original prop values
 *
 * @param {{}|string[]} keysToPluck
 * @param {{}} objToPluck
 * @param {Function} transformFn
 * @return {{}}
 */
const pluckProps = (keysToPluck, objToPluck, transformFn = identity) => {
  return (isArray(keysToPluck) ? keysToPluck.slice() : keys(keysToPluck)).reduce((memo, prop) => {
    memo[transformFn(prop)] = objToPluck[prop]
    return memo
  }, {})
}

export default pluckProps
