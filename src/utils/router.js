import toString from './to-string'
import { isArray, isNull, isPlainObject, isString, isUndefined } from './inspect'
import { keys } from './object'

const ANCHOR_TAG = 'a'

// Precompile RegExp
const commaRE = /%2C/g
const encodeReserveRE = /[!'()*]/g
// Method to replace reserved chars
const encodeReserveReplacer = c => '%' + c.charCodeAt(0).toString(16)

// Fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
const encode = str =>
  encodeURIComponent(toString(str))
    .replace(encodeReserveRE, encodeReserveReplacer)
    .replace(commaRE, ',')

const decode = decodeURIComponent

// Stringifies an object of query parameters
// See: https://github.com/vuejs/vue-router/blob/dev/src/util/query.js
export const stringifyQueryObj = obj => {
  if (!isPlainObject(obj)) {
    return ''
  }

  const query = keys(obj)
    .map(key => {
      const val = obj[key]
      if (isUndefined(val)) {
        return ''
      } else if (isNull(val)) {
        return encode(key)
      } else if (isArray(val)) {
        return val
          .reduce((results, val2) => {
            if (isNull(val2)) {
              results.push(encode(key))
            } else if (!isUndefined(val2)) {
              // Faster than string interpolation
              results.push(encode(key) + '=' + encode(val2))
            }
            return results
          }, [])
          .join('&')
      }
      // Faster than string interpolation
      return encode(key) + '=' + encode(val)
    })
    /* must check for length, as we only want to filter empty strings, not things that look falsey! */
    .filter(x => x.length > 0)
    .join('&')

  return query ? `?${query}` : ''
}

export const parseQuery = query => {
  const parsed = {}
  query = toString(query)
    .trim()
    .replace(/^(\?|#|&)/, '')

  if (!query) {
    return parsed
  }

  query.split('&').forEach(param => {
    const parts = param.replace(/\+/g, ' ').split('=')
    const key = decode(parts.shift())
    const val = parts.length > 0 ? decode(parts.join('=')) : null

    if (isUndefined(parsed[key])) {
      parsed[key] = val
    } else if (isArray(parsed[key])) {
      parsed[key].push(val)
    } else {
      parsed[key] = [parsed[key], val]
    }
  })

  return parsed
}

export const isRouterLink = tag => toString(tag).toLowerCase() !== ANCHOR_TAG

export const computeTag = ({ to, disabled } = {}, thisOrParent) => {
  return thisOrParent.$router && to && !disabled
    ? thisOrParent.$nuxt
      ? 'nuxt-link'
      : 'router-link'
    : ANCHOR_TAG
}

export const computeRel = ({ target, rel } = {}) => {
  if (target === '_blank' && isNull(rel)) {
    return 'noopener'
  }
  return rel || null
}

export const computeHref = (
  { href, to } = {},
  tag = ANCHOR_TAG,
  fallback = '#',
  toFallback = '/'
) => {
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
    if (isString(to)) {
      return to || toFallback
    }
    // Fallback to `to.path + to.query + to.hash` prop (if `to` is an object)
    if (isPlainObject(to) && (to.path || to.query || to.hash)) {
      const path = toString(to.path)
      const query = stringifyQueryObj(to.query)
      let hash = toString(to.hash)
      hash = !hash || hash.charAt(0) === '#' ? hash : `#${hash}`
      return `${path}${query}${hash}` || toFallback
    }
  }

  // If nothing is provided return the fallback
  return fallback
}
