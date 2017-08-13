import { keys } from "./object";
import { isArray } from "./array";

/**
 * Given an array of properties or an object of property keys,
 * plucks all the values off the target object.
 * @param {{}|string[]} keysToPluck
 * @param {{}} objToPluck
 * @return {{}}
 */
export default function pluckProps(keysToPluck, objToPluck) {
    return (isArray(keysToPluck) ? keysToPluck.slice() : keys(keysToPluck)).reduce((memo, prop) => {
        return (memo[prop] = objToPluck[prop]), memo;
    }, {});
}
