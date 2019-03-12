import { create } from './object'

export default fn => {
  const cache = create(null)

  return (...args) => {
    const argsKey = JSON.stringify(args)
    return (cache[argsKey] = cache[argsKey] || fn.apply(null, args))
  }
}
