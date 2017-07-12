import { keys } from "./object";
import { isArray } from "./array";

/**
 * Given an array of properties or an object of property keys,
 * plucks all the values off the target object.
 * @param {object|Array} props
 * @param {object} toPluck
 * @return {object}
 */
export default function pluckProps(props, toPluck) {
    return (isArray(props) ? props.slice() : keys(props)).reduce((memo, prop) => {
        return (memo[prop] = toPluck[prop]), memo;
    }, {});
}
