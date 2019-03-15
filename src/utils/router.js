import { isPlainObject, keys } from './object'
import { isArray } from './array'

const ANCHOR_TAG = 'a'

// Precompile RegExp
const commaRE = /%2C/g
const encodeReserveRE = /[!'()*]/g
// Method to replace reserved chars
const encodeReserveReplacer = c => '%' + c.charCodeAt(0).toString(16)

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
const encode = str =>
  encodeURIComponent(str)
    .replace(encodeReserveRE, encodeReserveReplacer)
    .replace(commaRE, ',')

// Stringifies an object of query parameters
// Borrowed from vue-router
// https://github.com/vuejs/vue-router/blob/dev/src/util/query.js
export const stringifyQueryObj = (obj = {}) => {
  const res = obj
    ? keys(obj)
        .map(key => {
          const val = obj[key]
          if (val === undefined) {
            return ''
          } else if (val === null) {
            return encode(key)
          } else if (isArray(val)) {
            const result = []
            val.forEach(val2 => {
              if (val2 === null) {
                result.push(encode(key))
              } else if (val2 !== undefined){
                // faster than string interpolation
                result.push(encode(key) + '=' + encode(val))
              }
            })
            return result.join('&')
          } else {
            // faster than string interpolation
            return encode(key) + '=' + encode(val)
          }
        })
        .filter(x => x.length > 0)
        .join('&')
    : null

  return res ? `?${res}` : ''
}

export const isRouterLink = tag => tag !== ANCHOR_TAG

export const computeTag = ({ to, disabled }, thisOrParent) => {
  return thisOrParent.$router && to && !disabled
    ? thisOrParent.$nuxt
      ? 'nuxt-link'
      : 'router-link'
    : ANCHOR_TAG
}

export const computeRel = ({ target, rel }) => {
  if (target === '_blank' && rel === null) {
    return 'noopener'
  }
  return rel || null
}

export const computeHref = ({ href, to }, tag = ANCHOR_TAG, fallback = '#', toFallback = '/') => {
  // We've already checked the $router in computeTag(), so isRouterLink() indicates a live router.
  // When deferring to Vue Router's router-link, don't use the href attribute at all.
  // We return null, and then remove href from the attributes passed to router-link
  if (isRouterLink(tag)) {
    return null
  }

  // Return `href` when explicitly provided
  if (href) {
    return href
  }

  // Reconstruct `href` when `to` used, but no router
  if (to) {
    // Fallback to `to` prop (if `to` is a string)
    if (typeof to === 'string') {
      return to || toFallback
    }
    // Fallback to `to.path` prop (if `to` is an object)
    if (isPlainObject(to) && typeof to.path === 'string') {
      const query = stringifyQueryObj(to.query)
      const hash = to.hash || ''
      return `${to.path}${query}${hash}` || toFallback
    }
  }

  // If nothing is provided return the fallback
  return fallback
}
