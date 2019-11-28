// Number utilities

// Converts a value (string, number, etc) to an integer number
// Assumes radix base 10
// Returns NaN if the value cannot be converted
export const toInteger = val => parseInt(val, 10)

// Converts a value (string, number, etc) to a number
// Returns NaN if the value cannot be converted
export const toFloat = val => parseFloat(val)

// Converts a value (string, number, etc) to a string
// representation with 'precision' digits after the decimal
// Returns the string 'NaN' if the value cannot be converted
export const toFixed = (val, precision) => toFloat(val).toFixed(toInteger(precision) || 0)
