import { assign, keys } from '../../utils/object'
import { arrayIncludes, concat } from '../../utils/array'
import { mergeData } from 'vue-functional-data-merge'

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
export function propsFactory() {
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
    disabled: {
      type: Boolean,
      default: false
    },
    // router-link specific props
    to: {
      type: [String, Object],
      default: null
    },
    append: {
      type: Boolean,
      default: false
    },
    replace: {
      type: Boolean,
      default: false
    },
    event: {
      type: [String, Array],
      default: 'click'
    },
    activeClass: {
      type: String
      // default: undefined
    },
    exact: {
      type: Boolean,
      default: false
    },
    exactActiveClass: {
      type: String
      // default: undefined
    },
    routerTag: {
      type: String,
      default: 'a'
    },
    // nuxt-link specific prop(s)
    noPrefetch: {
      type: Boolean,
      default: false
    }
  }
}

export const props = propsFactory()

export function pickLinkProps(propsToPick) {
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

export function omitLinkProps(propsToOmit) {
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
  linkProps() {
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

function computeTag(props, parent) {
  return parent.$router && props.to && !props.disabled
    ? parent.$nuxt
      ? 'nuxt-link'
      : 'router-link'
    : 'a'
}

function isRouterLink(tag) {
  return tag !== 'a'
}

function computeHref({ disabled, href, to }, tag) {
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
    if (typeof to === 'object' && typeof to.path === 'string') {
      return to.path
    }
  }

  // If nothing is provided use '#' as a fallback
  return '#'
}

function computeRel({ target, rel }) {
  if (target === '_blank' && rel === null) {
    return 'noopener'
  }
  return rel || null
}

function clickHandlerFactory({ disabled, tag, href, suppliedHandler, parent }) {
  return function onClick(e) {
    if (disabled && e instanceof Event) {
      // Stop event from bubbling up.
      e.stopPropagation()
      // Kill the event loop attached to this specific EventTarget.
      e.stopImmediatePropagation()
    } else {
      if (isRouterLink(tag) && e.target.__vue__) {
        e.target.__vue__.$emit('click', e)
      }
      if (typeof suppliedHandler === 'function') {
        suppliedHandler(...arguments)
      }
      parent.$root.$emit('clicked::link', e)
    }

    if ((!isRouterLink(tag) && href === '#') || disabled) {
      // Stop scroll-to-top behavior or navigation.
      e.preventDefault()
    }
  }
}

// @vue/component
export default {
  name: 'BLink',
  functional: true,
  props: propsFactory(),
  render(h, { props, data, parent, children }) {
    const tag = computeTag(props, parent)
    const rel = computeRel(props)
    const href = computeHref(props, tag)
    const eventType = isRouterLink(tag) ? 'nativeOn' : 'on'
    const suppliedHandler = (data[eventType] || {}).click
    const handlers = {
      click: clickHandlerFactory({ tag, href, disabled: props.disabled, suppliedHandler, parent })
    }

    const componentData = mergeData(data, {
      class: { active: props.active, disabled: props.disabled },
      attrs: {
        rel,
        target: props.target,
        tabindex: props.disabled ? '-1' : data.attrs ? data.attrs.tabindex : null,
        'aria-disabled': props.disabled ? 'true' : null
      },
      props: assign(props, { tag: props.routerTag })
    })

    // If href attribute exists on router-link (even undefined or null) it fails working on SSR
    // So we explicitly add it here if needed (i.e. if computeHref() is truthy)
    if (href) {
      componentData.attrs.href = href
    }

    // We want to overwrite any click handler since our callback
    // will invoke the user supplied handler if !props.disabled
    componentData[eventType] = assign(componentData[eventType] || {}, handlers)

    return h(tag, componentData, children)
  }
}
