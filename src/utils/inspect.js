import { RX_NUMBER } from '../constants/regex'
import { File } from '../constants/safe-types'

// --- Convenience inspection utilities ---

export const toType = value => typeof value

export const toRawType = value => Object.prototype.toString.call(value).slice(8, -1)

export const toRawTypeLC = value => toRawType(value).toLowerCase()

export const isUndefined = value => value === undefined

export const isNull = value => value === null

export const isEmptyString = value => value === ''

export const isUndefinedOrNull = value => isUndefined(value) || isNull(value)

export const isUndefinedOrNullOrEmpty = value => isUndefinedOrNull(value) || isEmptyString(value)

export const isFunction = value => toType(value) === 'function'

export const isBoolean = value => toType(value) === 'boolean'

export const isString = value => toType(value) === 'string'

export const isNumber = value => toType(value) === 'number'

export const isNumeric = value => RX_NUMBER.test(String(value))

export const isPrimitive = value => isBoolean(value) || isString(value) || isNumber(value)

export const isArray = value => Array.isArray(value)

// Quick object check
// This is primarily used to tell Objects from primitive values
// when we know the value is a JSON-compliant type
// Note object could be a complex type like array, Date, etc.
export const isObject = obj => obj !== null && typeof obj === 'object'

// Strict object type check
// Only returns true for plain JavaScript objects
export const isPlainObject = obj => Object.prototype.toString.call(obj) === '[object Object]'

export const isDate = value => value instanceof Date

export const isEvent = value => value instanceof Event

export const isFile = value => value instanceof File

export const isRegExp = value => toRawType(value) === 'RegExp'

export const isPromise = value =>
  !isUndefinedOrNull(value) && isFunction(value.then) && isFunction(value.catch)
