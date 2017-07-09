let counter = 0

/**
 * @link https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L16143
 * @param {string} prefix
 */
export default function uid(prefix = "") {
    const id = ++counter
    // Stringify the prefix
    return "" + prefix + id
}
