// --- Static ---

export const from = (...args) => Array.from(...args)

// --- Instance ---

export const concat = (...args) => Array.prototype.concat.apply([], args)

// --- Utilities ---

export const arrayIncludes = (array, value) => array.indexOf(value) !== -1
