// Convenience inspection utilities
import { isObject, isPlainObject } from './object'
import { isArray } from './array'

export const toType = val => typeof val

export const toRawType = val => Object.prototype.toString.call(val).slice(8, -1)

export const toRawTypeLC = val => toRawType(val).toLowerCase()

export const isUndef = val => val === undefined

export const isDef = val => !isUndef(val)

export const isNull = val => val === null

export const isFunction = val => toType(val) === 'function'

export const isBoolean = val => toType(val) === 'boolean'

export const isString = val => toType(val) === 'string'

export const isNumber = val => toType(val) === 'number'

export const isPrimitive = val => isBoolean(val) || isString(val) || isNumber(val)

export const isRegExp = val => toRawType(val) === 'RegExp'

export const isPromise = val => isDef(val) && !isNull(val) && isFunction(val.then) && isFunction(val.catch)

// Extra convenience named re-exports
export { isObject, isPlainObject, isArray }
