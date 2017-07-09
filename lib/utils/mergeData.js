import { assign, keys } from "./object"

/**
 * Merges new props first with original props into an array.
 * @param {*} originalProp
 * @param {*} newProp
 * @return {Array}
 */
export function mergeToArray(originalProp, newProp) {
    let ret = []

    if (originalProp) {
        ret = ret.concat(originalProp)
    }

    if (newProp) {
        ret = ret.concat(newProp)
    }

    return ret
}

/**
 * Takes the supplied object of event handlers
 * and merges all the handlers into an array at the event key.
 * @param {object} supplied
 * @param {object} defined
 */
export function mergeEvents(supplied, defined) {
    return keys(defined).reduce((handlers, event) => {
        handlers[event] = mergeToArray(defined[event], supplied[event])
        return handlers
    }, assign({}, supplied))
}

/**
 * Intelligently merges data for createElement.
 * Takes the supplied data object from the context
 * and merges it with the data defined on the component.
 * Returns new data object.
 * @param {object} suppliedData
 * @param {object} componentData
 * @return {object}
 */
export default function mergeData(suppliedData, componentData) {
    return assign(
        {},
        suppliedData,
        keys(componentData).reduce((mergedData, prop) => {
            // If a prop is null or undefined, just set the local prop
            if (suppliedData[prop] == null) {
                mergedData[prop] = componentData[prop]
                return mergedData
            }

            switch (prop) {
                // These API's have a flexible signature (Array|Object|string).
                case "class":
                case "style":
                    // Repackaging in an array allows Vue runtime to merge properly.
                    mergedData[prop] = mergeToArray(suppliedData[prop], componentData[prop])
                    break

                // Basic string concatenation
                case "staticClass":
                    mergedData[prop] = ""
                    if (suppliedData[prop]) {
                        mergedData[prop] += suppliedData[prop] + " "
                    }
                    mergedData[prop] += componentData[prop]
                    break

                // Merge event handlers into array of handlers.
                case "on":
                case "nativeOn":
                    mergedData[prop] = mergeEvents(suppliedData[prop], componentData[prop])
                    break

                default:
                    // Local props should override supplied props for the rest of the fields.
                    mergedData[prop] = assign({}, suppliedData[prop], componentData[prop])
                    break
            }

            return mergedData
        }, {})
    )
}
