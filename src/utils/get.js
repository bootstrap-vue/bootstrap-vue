/**
 * Get property defined by dot notation in string.
 *
 * Copyright (C) 2014 (UNLICENSE)
 * @author Dmitry Yv <https://github.com/dy>
 *
 * @param  {Object} holder   Target object where to look property up
 * @param  {string} propName Dot notation, like 'this.a.b.c'
 * @return {*}          A property value
 */
export default function get(holder, propName) {
  if (propName === undefined) {
    return holder
  }

  const propParts = (propName + '').split('.')
  let result = holder
  let lastPropName

  while ((lastPropName = propParts.shift()) !== undefined) {
    if (result[lastPropName] === undefined) return undefined
    result = result[lastPropName]
  }

  return result
}
