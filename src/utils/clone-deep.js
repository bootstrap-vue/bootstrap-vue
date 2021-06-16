import { isArray, isFile, isPlainObject } from './inspect'
import { keys } from './object'

export const cloneDeep = (obj, defaultValue = obj) => {
  if (isArray(obj)) {
    return obj.reduce((result, val) => [...result, cloneDeep(val, val)], [])
  }
  if (isPlainObject(obj)) {
    return keys(obj).reduce(
      (result, key) => ({ ...result, [key]: cloneDeep(obj[key], obj[key]) }),
      {}
    )
  }
  if (isFile(obj)) {
    return new File([obj], obj.name, {
      lastModified: obj.lastModified,
      type: obj.type
    })
  }
  return defaultValue
}
