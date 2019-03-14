import { isPlainObject } from './object'

export const isRouterLink = tag => tag !== 'a'

export const computeTag = (props, parent) => {
  return parent.$router && props.to && !props.disabled
    ? parent.$nuxt
      ? 'nuxt-link'
      : 'router-link'
    : 'a'
}

export const computeRel = ({ target, rel }) => {
  if (target === '_blank' && rel === null) {
    return 'noopener'
  }
  return rel || null
}

export const computeHref = ({ disabled, href, to }, tag = 'a') => {
  // We've already checked the parent.$router in computeTag,
  // so isRouterLink(tag) indicates a live router.
  // When deferring to Vue Router's router-link, don't use the href attr at all.
  // We return null, and then remove href from the attributes passed to router-link
  if (isRouterLink(tag)) {
    return null
  }

  // If href explicitly provided
  if (href) {
    return href
  }

  // Reconstruct `href` when `to` used, but no router
  if (to) {
    // Fallback to `to` prop (if `to` is a string)
    if (typeof to === 'string') {
      return to
    }
    // Fallback to `to.path` prop (if `to` is an object)
    if (isPlainObject(to) && typeof to.path === 'string') {
      return to.path
    }
  }

  // If nothing is provided use '#' as a fallback
  return '#'
}
