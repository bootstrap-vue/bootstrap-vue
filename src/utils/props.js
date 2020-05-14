import identity from './identity'
import { isArray, isObject } from './inspect'
import { clone, hasOwnProperty, keys } from './object'
import { lowerFirst, upperFirst } from './string'

// Prefix a property
export const prefixPropName = (prefix, value) => prefix + upperFirst(value)

// Remove a prefix from a property
export const unprefixPropName = (prefix, value) => lowerFirst(value.replace(prefix, ''))

// Suffix can be a falsey value so nothing is appended to string
// (helps when looping over props & some shouldn't change)
// Use data last parameters to allow for currying
export const suffixPropName = (suffix, str) => str + (suffix ? upperFirst(suffix) : '')

// Copies props from one array/object to a new array/object
// Prop values are also cloned as new references to prevent possible
// mutation of original prop object values
// Optionally accepts a function to transform the prop name
export const copyProps = (props, transformFn = identity) => {
  if (isArray(props)) {
    return props.map(transformFn)
  }
  const copied = {}
  for (const prop in props) {
    /* istanbul ignore else */
    if (hasOwnProperty(props, prop)) {
      // If the prop value is an object, do a shallow clone
      // to prevent potential mutations to the original object
      copied[transformFn(prop)] = isObject(props[prop]) ? clone(props[prop]) : props[prop]
    }
  }
  return copied
}

// Given an array of properties or an object of property keys,
// plucks all the values off the target object, returning a new object
// that has props that reference the original prop values
export const pluckProps = (keysToPluck, objToPluck, transformFn = identity) =>
  (isArray(keysToPluck) ? keysToPluck.slice() : keys(keysToPluck)).reduce((memo, prop) => {
    memo[transformFn(prop)] = objToPluck[prop]
    return memo
  }, {})
