import { isArray } from './array'
import { isObject, isPlainObject } from './object'

// --- Convenience inspection utilities ---

export const toType = val => typeof val

export const toRawType = val => Object.prototype.toString.call(val).slice(8, -1)

export const toRawTypeLC = val => toRawType(val).toLowerCase()

export const isUndefined = val => val === undefined

export const isNull = val => val === null

export const isUndefinedOrNull = val => isUndefined(val) || isNull(val)

export const isFunction = val => toType(val) === 'function'

export const isBoolean = val => toType(val) === 'boolean'

export const isString = val => toType(val) === 'string'

export const isNumber = val => toType(val) === 'number'

export const isPrimitive = val => isBoolean(val) || isString(val) || isNumber(val)

export const isDate = val => val instanceof Date

export const isEvent = val => val instanceof Event

export const isRegExp = val => toRawType(val) === 'RegExp'

export const isPromise = val =>
  !isUndefinedOrNull(val) && isFunction(val.then) && isFunction(val.catch)

// Extra convenience named re-exports
export { isArray, isObject, isPlainObject }
