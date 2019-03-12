import { isArray } from './array'
import identity from './identity'

/**
 * Copies props from one array/object to a new aray/object. Prop values
 * are also cloned as new references to prevent possible mution of original
 * prop object values.
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
      if (typeof props[prop] === 'object') {
        // If the prop value is an object, do a shallow clone
        copied[transformFn(prop)] = { ...props[prop] }
      } else {
        copied[transformFn(prop)] = props[prop]
      }
    }
  }

  return copied
}
