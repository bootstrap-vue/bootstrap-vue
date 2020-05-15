// Number utilities

// Converts a value (string, number, etc) to an integer number
// Assumes radix base 10
export const toInteger = (value, defaultValue = NaN) => {
  const integer = parseInt(value, 10)
  return isNaN(integer) ? defaultValue : integer
}

// Converts a value (string, number, etc) to a number
export const toFloat = (value, defaultValue = NaN) => {
  const float = parseFloat(value)
  return isNaN(float) ? defaultValue : float
}

// Converts a value (string, number, etc) to a string
// representation with `precision` digits after the decimal
// Returns the string 'NaN' if the value cannot be converted
export const toFixed = (val, precision) => toFloat(val).toFixed(toInteger(precision, 0))
