import identity from './identity'
import { isArray, isObject } from './inspect'
import { clone } from './object'

/**
 * Copies props from one array/object to a new array/object. Prop values
 * are also cloned as new references to prevent possible mutation of original
 * prop object values. Optionally accepts a function to transform the prop name.
 *
 * @param {[]|{}} props
 * @param {Function} transformFn
 */
const copyProps = (props, transformFn = identity) => {
  if (isArray(props)) {
    return props.map(transformFn)
  }
  // Props as an object.
  const copied = {}

  for (const prop in props) {
    /* istanbul ignore else */
    // eslint-disable-next-line no-prototype-builtins
    if (props.hasOwnProperty(prop)) {
      // If the prop value is an object, do a shallow clone to prevent
      // potential mutations to the original object.
      copied[transformFn(prop)] = isObject(props[prop]) ? clone(props[prop]) : props[prop]
    }
  }

  return copied
}

export default copyProps
