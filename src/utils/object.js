import assignPolyfill from 'core-js/library/fn/object/assign'
import isPolyfill from 'core-js/library/fn/object/is'

// --- Static ---

export const assign = Object.assign || assignPolyfill
export const getOwnPropertyNames = Object.getOwnPropertyNames
export const keys = Object.keys
export const defineProperties = Object.defineProperties
export const defineProperty = Object.defineProperty
export const freeze = Object.freeze
export const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor
export const getOwnPropertySymbols = Object.getOwnPropertySymbols
export const getPrototypeOf = Object.getPrototypeOf
export const create = Object.create
export const isFrozen = Object.isFrozen
export const is = Object.is || isPolyfill

// --- "Instance" ---

export const hasOwnProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)

// --- Utilities ---

/**
 * Deep-freezes and object, making it immutable / read-only.
 * Returns the same object passed-in, but frozen.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 */
export const deepFreeze = obj => {
  // Retrieve the property names defined on object
  const props = getOwnPropertyNames(obj)
  // Freeze properties before freezing self
  for (let prop of props) {
    let value = obj[prop]
    obj[prop] = value && isObject(value) ? deepFreeze(value) : value
  }
  return freeze(obj)
}

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

// @link https://gist.github.com/bisubus/2da8af7e801ffd813fab7ac221aa7afc
export const omit = (obj, props) =>
  keys(obj)
    .filter(key => props.indexOf(key) === -1)
    .reduce((result, key) => ({ ...result, [key]: obj[key] }), {})

export const readonlyDescriptor = () => ({ enumerable: true, configurable: false, writable: false })
