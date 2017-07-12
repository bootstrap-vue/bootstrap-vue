const isBrowser = typeof window !== "undefined";
const floor = isBrowser ? 0 : Math.floor(Number.MAX_SAFE_INTEGER / 2);
const ceiling = isBrowser ? Math.floor(Number.MAX_SAFE_INTEGER / 2) : Number.MAX_SAFE_INTEGER;
let counter = floor;

/**
 * @link https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L16143
 * @param {string} prefix
 */
export default function uid(prefix = "bv_") {
    if (counter === ceiling) {
        counter = floor;
    }
    const id = ++counter;
    return prefix + id;
}
