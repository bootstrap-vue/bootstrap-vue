// --- Static ---

export const from = Array.from
export const isArray = Array.isArray

// --- Instance ---

export const arrayIncludes = (array, value) => array.indexOf(value) !== -1
export const concat = (...args) => Array.prototype.concat.apply([], args)
