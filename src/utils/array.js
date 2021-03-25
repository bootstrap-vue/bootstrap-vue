import { isFunction } from './inspect'

// --- Static ---

export const from = (...args) => Array.from(...args)

// --- Instance ---

export const arrayIncludes = (array, value) => array.indexOf(value) !== -1
export const concat = (...args) => Array.prototype.concat.apply([], args)

// --- Utilities ---

export const createArray = (length, fillFn) => {
  const mapFn = isFunction(fillFn) ? fillFn : () => fillFn
  return Array.apply(null, { length }).map(mapFn)
}

export const flatten = array => array.reduce((result, item) => concat(result, item), [])

export const flattenDeep = array =>
  array.reduce((result, item) => concat(result, Array.isArray(item) ? flattenDeep(item) : item), [])
