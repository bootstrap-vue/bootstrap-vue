// --- Static ---

export const from = Array.from
export const isArray = Array.isArray

// --- Instance ---

export const arrayIncludes = (array, value) => array.indexOf(value) !== -1
export const concat = (...args) => Array.prototype.concat.apply([], args)

// --- Utilities ---

export const flattenDeep = array =>
  concat(array).reduce(
    (result, item) => result.concat(isArray(item) ? flattenDeep(item) : item),
    []
  )
