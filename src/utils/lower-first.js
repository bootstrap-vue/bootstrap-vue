/**
 * @param {string} str
 */
export default function lowerFirst(str) {
  str = String(str)
  return str.charAt(0).toLowerCase() + str.slice(1)
}
