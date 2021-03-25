import { looseEqual } from './loose-equal'

// Assumes that the first argument is an array
export const looseIndexOf = (array, value) => {
  for (let i = 0; i < array.length; i++) {
    if (looseEqual(array[i], value)) {
      return i
    }
  }
  return -1
}
