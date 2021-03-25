import { PROP_TYPE_ANY } from '../constants/props'
import { cloneDeep } from './clone-deep'
import { getComponentConfig } from './config'
import { identity } from './identity'
import { isArray, isFunction, isObject, isUndefined } from './inspect'
import { clone, hasOwnProperty, keys } from './object'
import { lowerFirst, upperFirst } from './string'

// Prefix a property
export const prefixPropName = (prefix, value) => prefix + upperFirst(value)

// Remove a prefix from a property
export const unprefixPropName = (prefix, value) => lowerFirst(value.replace(prefix, ''))

// Suffix can be a falsey value so nothing is appended to string
// (helps when looping over props & some shouldn't change)
// Use data last parameters to allow for currying
export const suffixPropName = (suffix, value) => value + (suffix ? upperFirst(suffix) : '')

// Generates a prop object
export const makeProp = (
  type = PROP_TYPE_ANY,
  value = undefined,
  requiredOrValidator = undefined,
  validator = undefined
) => {
  const required = requiredOrValidator === true
  validator = required ? validator : requiredOrValidator

  return {
    ...(type ? { type } : {}),
    ...(required
      ? { required }
      : isUndefined(value)
        ? {}
        : { default: isObject(value) ? () => value : value }),
    ...(isUndefined(validator) ? {} : { validator })
  }
}

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

// Make a prop object configurable by global configuration
// Replaces the current `default` key of each prop with a `getComponentConfig()`
// call that falls back to the current default value of the prop
export const makePropConfigurable = (prop, key, componentKey) => ({
  ...cloneDeep(prop),
  default: function bvConfigurablePropDefault() {
    const value = getComponentConfig(componentKey, key, prop.default)
    return isFunction(value) ? value() : value
  }
})

// Make a props object configurable by global configuration
// Replaces the current `default` key of each prop with a `getComponentConfig()`
// call that falls back to the current default value of the prop
export const makePropsConfigurable = (props, componentKey) =>
  keys(props).reduce(
    (result, key) => ({ ...result, [key]: makePropConfigurable(props[key], key, componentKey) }),
    {}
  )

// Get function name we use in `makePropConfigurable()`
// for the prop default value override to compare
// against in `hasPropFunction()`
const configurablePropDefaultFnName = makePropConfigurable({}, '', '').default.name

// Detect wether the given value is currently a function
// and isn't the props default function
export const hasPropFunction = fn =>
  isFunction(fn) && fn.name && fn.name !== configurablePropDefaultFnName
