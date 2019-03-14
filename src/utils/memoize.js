import { create } from './object'

const memoize = fn => {
  const cache = create(null)

  return (...args) => {
    const argsKey = JSON.stringify(args)
    return (cache[argsKey] = cache[argsKey] || fn.apply(null, args))
  }
}

export default memoize
