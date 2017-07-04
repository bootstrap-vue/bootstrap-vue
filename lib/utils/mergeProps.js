import isArray from "../utils/isArray"

/**
 * Merges new props first with original props into an array.
 * New props like event listeners should then be called BEFORE original (passed from template).
 * @param {*} originalProp
 * @param {*} newProp
 */
function mergeToArray(originalProp, newProp) {
    let ret = []

    if (newProp) {
        ret = ret.concat(isArray(newProp) ? newProp : [newProp])
    }

    if (originalProp) {
        ret = ret.concat(isArray(originalProp) ? originalProp : [originalProp])
    }

    return ret
}

/**
 * Merges properties one level deep for createElement.
 * Returns new object.
 *
 * @param {object} original
 * @param {object} newProps
 * @return {object}
 */
export default function mergeProps(original, newProps) {
    let mergeProps = {}

    Object.keys(newProps).forEach(prop => {
        // If a prop is not defined, just set the local prop
        if (original[prop] === undefined) {
            return (mergeProps[prop] = newProps[prop])
        }

        switch (prop) {
            // These API's have a flexible signature (Array|Object[|string]).
            case "class":
            case "style":
                // Repackaging in an array seems to allow Vue runtime to merge properly.
                mergeProps[prop] = mergeToArray(original[prop], newProps[prop])
                break

            // Merge event handlers into array
            case "on":
            case "nativeOn":
                mergeProps[prop] = Object.keys(newProps[prop]).reduce((on, event) => {
                    return Object.assign(on, mergeToArray(original[prop], newProps[prop][event]))
                }, {})
                break

            default:
                // Local props should override supplied props for the rest of the fields.
                Object.assign(mergeProps, original[prop], newProps[prop])
                break
        }
    })

    // Now that props one level deep have been merged,
    // we can merge those onto the supplied props with `Object.assign`.
    return Object.assign({}, original, mergeProps)
}
