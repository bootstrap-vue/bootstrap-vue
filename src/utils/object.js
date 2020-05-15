import { isArray, isPlainObject, isUndefinedOrNull } from './inspect'

// --- Constants ---

const o = Object
const oProto = o.prototype

// --- Static ---

export const assign = (...args) => o.assign(...args)
export const create = (proto, optionalProps) => o.create(proto, optionalProps)
export const defineProperties = (obj, props) => o.defineProperties(obj, props)
export const defineProperty = (obj, prop, descriptor) => o.defineProperty(obj, prop, descriptor)
export const freeze = obj => o.freeze(obj)
export const getOwnPropertyNames = obj => o.getOwnPropertyNames(obj)
export const getOwnPropertyDescriptor = (obj, prop) => o.getOwnPropertyDescriptor(obj, prop)
export const getOwnPropertySymbols = obj => o.getOwnPropertySymbols(obj)
export const getPrototypeOf = obj => o.getPrototypeOf(obj)
export const is = (obj1, obj2) => o.is(obj1, obj2)
export const isFrozen = obj => o.isFrozen(obj)
export const keys = obj => o.keys(obj)

// --- Instance ---

export const hasOwnProperty = (obj, prop) => oProto.hasOwnProperty.call(obj, prop)
export const toString = obj => oProto.toString.call(obj)

// --- Utilities ---

// Shallow copy an object
// If the passed in object is `null` or `undefined`, returns an empty object
export const clone = obj => ({ ...obj })

// Return a shallow copy of object with the specified properties only
// https://gist.github.com/bisubus/2da8af7e801ffd813fab7ac221aa7afc
export const pick = (obj, propsOrCondition) => {
  const filterFn = isArray(propsOrCondition)
    ? key => propsOrCondition.indexOf(key) !== -1
    : key => propsOrCondition(obj[key], key)

  return keys(obj)
    .filter(filterFn)
    .reduce((result, key) => ({ ...result, [key]: obj[key] }), {})
}

// Return a shallow copy of object with the specified properties omitted
// https://gist.github.com/bisubus/2da8af7e801ffd813fab7ac221aa7afc
export const omit = (obj, propsOrCondition) => {
  const filterFn = isArray(propsOrCondition)
    ? key => propsOrCondition.indexOf(key) === -1
    : key => !propsOrCondition(obj[key], key)

  return keys(obj)
    .filter(filterFn)
    .reduce((result, key) => ({ ...result, [key]: obj[key] }), {})
}

/**
 * Convenience method to create a read-only descriptor
 */
export const readonlyDescriptor = () => ({ enumerable: true, configurable: false, writable: false })

// Deep-freezes and object, making it immutable/read-only
// Returns the same object passed-in, but frozen
// Freezes inner object/array/values first
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
// Note: This method will not work for property values using `Symbol()` as a key
export const deepFreeze = obj => {
  // Retrieve the property names defined on object/array
  // Note: `keys` will ignore properties that are keyed by a `Symbol()`
  const props = keys(obj)

  // Iterate over each prop and recursively freeze it
  props.forEach(prop => {
    const value = obj[prop]
    // If value is a plain object or array, we deepFreeze it
    obj[prop] = value && (isPlainObject(value) || isArray(value)) ? deepFreeze(value) : value
  })

  return freeze(obj)
}

// Build an object from an array of key-value pairs
// - `[['a', 'b'], ['c', 'd']]` => `{ a: 'b', c 'd' }`
// It is also possible to pass in an object instead of the key-value pair
// which will be merged with the other data
// - `[['a', 'b'], { c: 'd' }]` => `{ a: 'b', c 'd' }`
// The order of the key-value pairs is important, the last one takes precedence
// The second argument takes in a loose expression wether to return an empty object
// By default `null` and `undefined` values are omitted from the object
// It's possible to pass in a custom `omitFn` as third argument
export const buildObject = (props, empty = false, omitFn = isUndefinedOrNull) => {
  if (empty) {
    return {}
  }

  return props.reduce((obj, prop) => {
    if (isPlainObject(prop)) {
      return assign(obj, omit(prop, omitFn))
    }

    const [key, value, force = false] = prop
    if (force || !omitFn(value)) {
      obj[key] = value
    }

    return obj
  }, {})
}
