import fromPolyfill from 'core-js/library/fn/array/from'
import isArrayPolyfill from 'core-js/library/fn/array/is-array'

// --- Static ---

export const from = Array.from || fromPolyfill
export const isArray = Array.isArray || isArrayPolyfill

// --- Instance ---

export const arrayIncludes = (array, value) => array.indexOf(value) !== -1
export const concat = (...args) => Array.prototype.concat.apply([], args)
