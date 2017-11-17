import { assign, keys } from '../../utils/object'
import { arrayIncludes, concat } from '../../utils/array'
import { mergeData } from '../../utils'

/**
 * The Link component is used in many other BV components.
 * As such, sharing its props makes supporting all its features easier.
 * However, some components need to modify the defaults for their own purpose.
 * Prefer sharing a fresh copy of the props to ensure mutations
 * do not affect other component references to the props.
 *
 * https://github.com/vuejs/vue-router/blob/dev/src/components/link.js
 * @return {{}}
 */
export function propsFactory () {
  return {
    href: {
      type: String,
      default: null
    },
    rel: {
      type: String,
      default: null
    },
    target: {
      type: String,
      default: '_self'
    },
    active: {
      type: Boolean,
      default: false
    },
    activeClass: {
      type: String,
      default: 'active'
    },
    append: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    event: {
      type: [String, Array],
      default: 'click'
    },
    exact: {
      type: Boolean,
      default: false
    },
    exactActiveClass: {
      type: String,
      default: 'active'
    },
    replace: {
      type: Boolean,
      default: false
    },
    routerTag: {
      type: String,
      default: 'a'
    },
    to: {
      type: [String, Object],
      default: null
    }
  }
}

export const props = propsFactory()

export function pickLinkProps (propsToPick) {
  const freshLinkProps = propsFactory()
  // Normalize everything to array.
  propsToPick = concat(propsToPick)

  return keys(freshLinkProps).reduce((memo, prop) => {
    if (arrayIncludes(propsToPick, prop)) {
      memo[prop] = freshLinkProps[prop]
    }

    return memo
  }, {})
}

export function omitLinkProps (propsToOmit) {
  const freshLinkProps = propsFactory()
  // Normalize everything to array.
  propsToOmit = concat(propsToOmit)

  return keys(props).reduce((memo, prop) => {
    if (!arrayIncludes(propsToOmit, prop)) {
      memo[prop] = freshLinkProps[prop]
    }

    return memo
  }, {})
}

export const computed = {
  linkProps () {
    let linkProps = {}
    let propKeys = keys(props)

    for (let i = 0; i < propKeys.length; i++) {
      const prop = propKeys[i]
      // Computed Vue getters are bound to the instance.
      linkProps[prop] = this[prop]
    }

    return linkProps
  }
}

function computeTag (props, parent) {
  return Boolean(parent.$router) && props.to && !props.disabled ? 'router-link' : 'a'
}

function computeHref ({ disabled, href, to }, tag) {
  // We've already checked the parent.$router in computeTag,
  // so router-link means live router.
  // When deferring to Vue Router's router-link,
  // don't use the href attr at all.
  // Must return undefined for router-link to populate href.
  if (tag === 'router-link') return void 0
  // If href explicitly provided
  if (href) return href
  // Reconstruct href when `to` used, but no router
  if (to) {
    // Fallback to `to` prop (if `to` is a string)
    if (typeof to === 'string') return to
    // Fallback to `to.path` prop (if `to` is an object)
    if (typeof to === 'object' && typeof to.path === 'string') return to.path
  }
  // If nothing is provided use '#'
  return '#'
}

function computeRel ({ target, rel }) {
  if (target === '_blank' && rel === null) {
    return 'noopener'
  }
  return rel || null
}

function clickHandlerFactory ({ disabled, tag, href, suppliedHandler, parent }) {
  const isRouterLink = tag === 'router-link'

  return function onClick (e) {
    if (disabled && e instanceof Event) {
      // Stop event from bubbling up.
      e.stopPropagation()
      // Kill the event loop attached to this specific EventTarget.
      e.stopImmediatePropagation()
    } else {
      parent.$root.$emit('clicked::link', e)

      if (isRouterLink && e.target.__vue__) {
        e.target.__vue__.$emit('click', e)
      }
      if (typeof suppliedHandler === 'function') {
        suppliedHandler(...arguments)
      }
    }

    if ((!isRouterLink && href === '#') || disabled) {
      // Stop scroll-to-top behavior or navigation.
      e.preventDefault()
    }
  }
}

export default {
  functional: true,
  props: propsFactory(),
  render (h, { props, data, parent, children }) {
    const tag = computeTag(props, parent)
    const rel = computeRel(props)
    const href = computeHref(props, tag)
    const eventType = tag === 'router-link' ? 'nativeOn' : 'on'
    const suppliedHandler = (data[eventType] || {}).click
    const handlers = { click: clickHandlerFactory({ tag, href, disabled: props.disabled, suppliedHandler, parent }) }

    const componentData = mergeData(data, {
      class: [
        props.active ? (props.exact ? props.exactActiveClass : props.activeClass) : null,
        { disabled: props.disabled }
      ],
      attrs: {
        rel,
        href,
        target: props.target,
        tabindex: props.disabled ? '-1' : (data.attrs ? data.attrs.tabindex : null),
        'aria-disabled': (tag === 'a' && props.disabled) ? 'true' : null
      },
      props: assign(props, { tag: props.routerTag })
    })

    // If href prop exists on router-link (even undefined or null) it fails working on SSR
    if (!componentData.attrs.href) {
      delete componentData.attrs.href
    }

    // We want to overwrite any click handler since our callback
    // will invoke the supplied handler if !props.disabled
    componentData[eventType] = assign(componentData[eventType] || {}, handlers)

    return h(tag, componentData, children)
  }
}
