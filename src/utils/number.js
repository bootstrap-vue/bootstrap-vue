// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger#Polyfill
// Needed for IE support
/* istanbul ignore if */
if (!Number.isInteger) {
  Number.isInteger = value =>
    typeof value === 'number' && isFinite(value) && Math.floor(value) === value
}

// Static
export const isInteger = Number.isInteger
