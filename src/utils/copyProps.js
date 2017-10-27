import { isArray } from "./array";
import { assign } from "./object";
import identity from "./identity";

/**
 * @param {[]|{}} props
 * @param {Function} transformFn
 */
export default function copyProps(props, transformFn = identity) {
    if (isArray(props)) {
        return props.map(transformFn);
    }
    // Props as an object.
    const copied = {};

    for (const prop in props) {
        if (props.hasOwnProperty(prop)) {
            if (typeof prop === "object") {
                copied[transformFn(prop)] = assign({}, props[prop]);
            } else {
                copied[transformFn(prop)] = props[prop];
            }
        }
    }

    return copied;
}
