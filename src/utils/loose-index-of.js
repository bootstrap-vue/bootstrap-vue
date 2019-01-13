import looseEqual from './loose-equal'

export default function(arr, val) {
  // Assumes that the first argument is an array
  for (let i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i
    }
  }
  return -1
}
