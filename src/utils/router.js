import { isPlainObject } from './object'

const ANCHOR_TAG = 'a'

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

// Note: Doesn't handle query params or hash in to object.
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
  // TODO: Could be updated to better handle `to.search` and `to.hash` properties
  if (to) {
    // Fallback to `to` prop (if `to` is a string)
    if (typeof to === 'string') {
      return to || toFallback
    }
    // Fallback to `to.path` prop (if `to` is an object)
    if (isPlainObject(to) && typeof to.path === 'string') {
      return to.path || toFallback
    }
  }

  // If nothing is provided return the fallback
  return fallback
}
