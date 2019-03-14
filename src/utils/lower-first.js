/**
 * @param {string} str
 */
const lowerFirst = str => {
  str = String(str)
  return str.charAt(0).toLowerCase() + str.slice(1)
}

export default lowerFirst
