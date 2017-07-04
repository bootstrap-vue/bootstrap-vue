/**
 * Merges properties one level deep via `Object.assign`.
 * Returns new object.
 *
 * @param {object} original
 * @param {object} newProps
 * @return {object}
 */
export default function mergeProps(original, newProps) {
    let mergeProps = Object.create(null)

    for (const prop in Object.getOwnPropertyNames(newProps)) {
        const createElementOption = newProps[prop]

        if (original[prop] !== undefined) {
            Object.assign(mergeProps, original[prop], createElementOption)
        } else {
            mergeProps[prop] = createElementOption
        }
    }

    return Object.assign({}, original, mergeProps)
}
