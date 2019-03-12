import { isArray } from './array'
import { isPlainObject } from './object'
import identity from './identity'

/**
 * Copies props from one array/object to a new aray/object. Prop values
 * are also cloned as new references to prevent possible mution of original
 * prop object values. Optionally accepts a function to transform the prop name.
 *
 * @param {[]|{}} props
 * @param {Function} transformFn
 */
export default function copyProps(props, transformFn = identity) {
  if (isArray(props)) {
    return props.map(transformFn)
  }
  // Props as an object.
  const copied = {}

  for (const prop in props) {
    /* istanbul ignore else */
    if (props.hasOwnProperty(prop)) {
      copied[transformFn(prop)] = isPlainObject(props[prop]) ? { ...props[prop] } : props[prop]
    }
  }

  return copied
}
