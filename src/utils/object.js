import { isArray } from './array'

// --- Static ---

export const assign = (...args) => Object.assign(...args)
export const create = (proto, optionalProps) => Object.create(proto, optionalProps)
export const defineProperties = (obj, props) => Object.defineProperties(obj, props)
export const defineProperty = (obj, prop, descriptor) =>
  Object.defineProperty(obj, prop, descriptor)
export const freeze = obj => Object.freeze(obj)
export const getOwnPropertyNames = obj => Object.getOwnPropertyNames(obj)
export const getOwnPropertyDescriptor = (obj, prop) => Object.getOwnPropertyDescriptor(obj, prop)
export const getOwnPropertySymbols = obj => Object.getOwnPropertySymbols(obj)
export const getPrototypeOf = obj => Object.getPrototypeOf(obj)
export const is = (value1, value2) => Object.is(value1, value2)
export const isFrozen = obj => Object.isFrozen(obj)
export const keys = obj => Object.keys(obj)

// --- "Instance" ---

export const hasOwnProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
export const toString = obj => Object.prototype.toString.call(obj)

// --- Utilities ---

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 * Note object could be a complex type like array, date, etc.
 */
export const isObject = obj => obj !== null && typeof obj === 'object'

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
export const isPlainObject = obj => Object.prototype.toString.call(obj) === '[object Object]'

/**
 * Shallow copy an object. If the passed in object
 * is null or undefined, returns an empty object
 */
export const clone = obj => ({ ...obj })

/**
 * Return a shallow copy of object with the specified properties only
 * @link https://gist.github.com/bisubus/2da8af7e801ffd813fab7ac221aa7afc
 */
export const pick = (obj, props) =>
  keys(obj)
    .filter(key => props.indexOf(key) !== -1)
    .reduce((result, key) => ({ ...result, [key]: obj[key] }), {})

/**
 * Return a shallow copy of object with the specified properties omitted
 * @link https://gist.github.com/bisubus/2da8af7e801ffd813fab7ac221aa7afc
 */
export const omit = (obj, props) =>
  keys(obj)
    .filter(key => props.indexOf(key) === -1)
    .reduce((result, key) => ({ ...result, [key]: obj[key] }), {})

/**
 * Convenience method to create a read-only descriptor
 */
export const readonlyDescriptor = () => ({ enumerable: true, configurable: false, writable: false })

/**
 * Deep-freezes and object, making it immutable / read-only.
 * Returns the same object passed-in, but frozen.
 * Freezes inner object/array/values first.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 * Note: this method will not work for property values using Symbol() as a key
 */
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
