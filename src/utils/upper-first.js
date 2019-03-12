/**
 * @param {string} str
 */
export default function upperFirst(str) {
  if (typeof str !== 'string') {
    str = String(str)
  }
  str = str.trim()
  return str.charAt(0).toUpperCase() + str.slice(1)
}
