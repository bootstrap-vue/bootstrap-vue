import { RX_ENCODED_COMMA, RX_ENCODE_REVERSE, RX_PLUS, RX_QUERY_START } from '../constants/regex'
import { isTag } from './dom'
import { isArray, isNull, isPlainObject, isString, isUndefined } from './inspect'
import { keys } from './object'
import { toString } from './string'

const ANCHOR_TAG = 'a'

// Method to replace reserved chars
const encodeReserveReplacer = c => '%' + c.charCodeAt(0).toString(16)

// Fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
const encode = str =>
  encodeURIComponent(toString(str))
    .replace(RX_ENCODE_REVERSE, encodeReserveReplacer)
    .replace(RX_ENCODED_COMMA, ',')

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
    .replace(RX_QUERY_START, '')

  if (!query) {
    return parsed
  }

  query.split('&').forEach(param => {
    const parts = param.replace(RX_PLUS, ' ').split('=')
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

export const isLink = props => !!(props.href || props.to)

export const isRouterLink = tag => !!(tag && !isTag(tag, 'a'))

export const computeTag = ({ to, disabled, routerComponentName } = {}, thisOrParent) => {
  const hasRouter = !!thisOrParent.$router
  if (!hasRouter || (hasRouter && (disabled || !to))) {
    return ANCHOR_TAG
  }

  // TODO:
  //   Check registered components for existence of user supplied router link component name
  //   We would need to check PascalCase, kebab-case, and camelCase versions of name:
  //   const name = routerComponentName
  //   const names = [name, PascalCase(name), KebabCase(name), CamelCase(name)]
  //   exists = names.some(name => !!thisOrParent.$options.components[name])
  //   And may want to cache the result for performance or we just let the render fail
  //   if the component is not registered
  return routerComponentName || (thisOrParent.$nuxt ? 'nuxt-link' : 'router-link')
}

export const computeRel = ({ target, rel } = {}) =>
  target === '_blank' && isNull(rel) ? 'noopener' : rel || null

export const computeHref = (
  { href, to } = {},
  tag = ANCHOR_TAG,
  fallback = '#',
  toFallback = '/'
) => {
  // Return `href` when explicitly provided
  if (href) {
    return href
  }

  // We've checked for `$router` in `computeTag()`, so `isRouterLink()` indicates a live router
  // When deferring to Vue Router's `<router-link>`, don't use the `href` attribute at all
  // We return `null`, and then remove `href` from the attributes passed to `<router-link>`
  if (isRouterLink(tag)) {
    return null
  }

  // Fallback to `to` prop (if `to` is a string)
  if (isString(to)) {
    return to || toFallback
  }
  // Fallback to `to.path' + `to.query` + `to.hash` prop (if `to` is an object)
  if (isPlainObject(to) && (to.path || to.query || to.hash)) {
    const path = toString(to.path)
    const query = stringifyQueryObj(to.query)
    let hash = toString(to.hash)
    hash = !hash || hash.charAt(0) === '#' ? hash : `#${hash}`
    return `${path}${query}${hash}` || toFallback
  }

  // If nothing is provided return the fallback
  return fallback
}
