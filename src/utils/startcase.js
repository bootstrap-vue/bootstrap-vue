/**
 * Converts a string, including strings in camelCase or snake_case, into Start Case (a variant
 * of Title Case where all words start with a capital letter), it keeps original single quote
 * and hyphen in the word.
 *
 * Copyright (c) 2017 Compass (MIT)
 * https://github.com/UrbanCompass/to-start-case
 * @author Zhuoyuan Zhang <https://github.com/drawyan>
 * @author Wei Wang <https://github.com/onlywei>
 *
 *
 *   'management_companies' to 'Management Companies'
 *   'managementCompanies' to 'Management Companies'
 *   `hell's kitchen` to `Hell's Kitchen`
 *   `co-op` to `Co-op`
 *
 * @param {String} str
 * @returns {String}
 */

// Precompile regular expressions for performance
const RX_UNDERSCORE = /_/g
const RX_LOWER_UPPER = /([a-z])([A-Z])/g
const RX_START_SPACE_WORD = /(\s|^)(\w)/g

const startCase = str =>
  str
    .replace(RX_UNDERSCORE, ' ')
    .replace(RX_LOWER_UPPER, (str, $1, $2) => $1 + ' ' + $2)
    .replace(RX_START_SPACE_WORD, (str, $1, $2) => $1 + $2.toUpperCase())

export default startCase
