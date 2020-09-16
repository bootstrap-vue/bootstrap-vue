// String utilities
import {
  RX_HYPHENATE,
  RX_LOWER_UPPER,
  RX_REGEXP_REPLACE,
  RX_START_SPACE_WORD,
  RX_TRIM_LEFT,
  RX_TRIM_RIGHT,
  RX_UNDERSCORE,
  RX_UN_KEBAB
} from '../constants/regex'
import { isArray, isPlainObject, isString, isUndefinedOrNull } from './inspect'

// --- Utilities ---

// Converts PascalCase or camelCase to kebab-case
export const kebabCase = str => {
  return str.replace(RX_HYPHENATE, '-$1').toLowerCase()
}

// Converts a kebab-case or camelCase string to PascalCase
export const pascalCase = str => {
  str = kebabCase(str).replace(RX_UN_KEBAB, (_, c) => (c ? c.toUpperCase() : ''))
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Converts a string, including strings in camelCase or snake_case, into Start Case
// It keeps original single quote and hyphen in the word
// https://github.com/UrbanCompass/to-start-case
export const startCase = str =>
  str
    .replace(RX_UNDERSCORE, ' ')
    .replace(RX_LOWER_UPPER, (str, $1, $2) => $1 + ' ' + $2)
    .replace(RX_START_SPACE_WORD, (str, $1, $2) => $1 + $2.toUpperCase())

// Lowercases the first letter of a string and returns a new string
export const lowerFirst = str => {
  str = isString(str) ? str.trim() : String(str)
  return str.charAt(0).toLowerCase() + str.slice(1)
}

// Uppercases the first letter of a string and returns a new string
export const upperFirst = str => {
  str = isString(str) ? str.trim() : String(str)
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Escape characters to be used in building a regular expression
export const escapeRegExp = str => str.replace(RX_REGEXP_REPLACE, '\\$&')

// Convert a value to a string that can be rendered
// `undefined`/`null` will be converted to `''`
// Plain objects and arrays will be JSON stringified
export const toString = (val, spaces = 2) => {
  return isUndefinedOrNull(val)
    ? ''
    : isArray(val) || (isPlainObject(val) && val.toString === Object.prototype.toString)
      ? JSON.stringify(val, null, spaces)
      : String(val)
}

// Remove leading white space from a string
export const trimLeft = str => toString(str).replace(RX_TRIM_LEFT, '')

// Remove Trailing white space from a string
export const trimRight = str => toString(str).replace(RX_TRIM_RIGHT, '')

// Remove leading and trailing white space from a string
export const trim = str => toString(str).trim()

// Lower case a string
export const lowerCase = str => toString(str).toLowerCase()

// Upper case a string
export const upperCase = str => toString(str).toUpperCase()
