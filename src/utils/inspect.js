import { File } from './safe-types'

// --- Convenience inspection utilities ---

export const toType = val => typeof val

export const toRawType = val => Object.prototype.toString.call(val).slice(8, -1)

export const toRawTypeLC = val => toRawType(val).toLowerCase()

export const isUndefined = val => val === undefined

export const isNull = val => val === null

export const isEmptyString = val => val === ''

export const isUndefinedOrNull = val => isUndefined(val) || isNull(val)

export const isUndefinedOrNullOrEmpty = val => isUndefinedOrNull(val) || isEmptyString(val)

export const isFunction = val => toType(val) === 'function'

export const isBoolean = val => toType(val) === 'boolean'

export const isString = val => toType(val) === 'string'

export const isNumber = val => toType(val) === 'number'

// Is a value number like (i.e. a number or a number as string)
export const isNumeric = value => !isNaN(parseInt(value, 10))

export const isPrimitive = val => isBoolean(val) || isString(val) || isNumber(val)

export const isArray = val => Array.isArray(val)

// Quick object check
// This is primarily used to tell Objects from primitive values
// when we know the value is a JSON-compliant type
// Note object could be a complex type like array, Date, etc.
export const isObject = obj => obj !== null && typeof obj === 'object'

// Strict object type check
// Only returns true for plain JavaScript objects
export const isPlainObject = obj => Object.prototype.toString.call(obj) === '[object Object]'

export const isDate = val => val instanceof Date

export const isEvent = val => val instanceof Event

export const isFile = val => val instanceof File

export const isRegExp = val => toRawType(val) === 'RegExp'

export const isPromise = val =>
  !isUndefinedOrNull(val) && isFunction(val.then) && isFunction(val.catch)
