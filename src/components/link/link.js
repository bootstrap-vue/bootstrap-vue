import Vue from '../../utils/vue'
import { arrayIncludes, concat } from '../../utils/array'
import { isFunction, isUndefined } from '../../utils/inspect'
import { keys } from '../../utils/object'
import { isRouterLink, computeTag, computeRel, computeHref } from '../../utils/router'

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
export const propsFactory = () => {
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

// Return a fresh copy of <b-link> props
// Containing only the specified prop(s)
export const pickLinkProps = propsToPick => {
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

// Return a fresh copy of <b-link> props
// Keeping all but the specified omitting prop(s)
export const omitLinkProps = propsToOmit => {
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

// @vue/component
export const BLink = /*#__PURE__*/ Vue.extend({
  name: 'BLink',
  inheritAttrs: false,
  props: propsFactory(),
  computed: {
    computedTag() {
      // We don't pass `this` as the first arg as we need reactivity of the props
      return computeTag({ to: this.to, disabled: this.disabled }, this)
    },
    isRouterLink() {
      return isRouterLink(this.computedTag)
    },
    computedRel() {
      // We don't pass `this` as the first arg as we need reactivity of the props
      return computeRel({ target: this.target, rel: this.rel })
    },
    computedHref() {
      // We don't pass `this` as the first arg as we need reactivity of the props
      return computeHref({ to: this.to, href: this.href }, this.computedTag)
    }
  },
  methods: {
    onClick(evt) {
      const isRouterLink = this.isRouterLink
      const suppliedHandler = this.$listeners.click
      if (this.disabled && evt instanceof Event) {
        // Stop event from bubbling up.
        evt.stopPropagation()
        // Kill the event loop attached to this specific EventTarget.
        // Needed to prevent vue-router for doing its thing
        evt.stopImmediatePropagation()
      } else {
        if (isRouterLink && evt.currentTarget.__vue__) {
          // Router links do not emit instance 'click' events, so we
          // add in an $emit('click', evt) on it's vue instance
          /* istanbul ignore next: difficult to test, but we know it works */
          evt.currentTarget.__vue__.$emit('click', evt)
        }
        // Call the suppliedHandler(s), if any provided
        concat(suppliedHandler)
          .filter(h => isFunction(h))
          .forEach(handler => {
            handler(...arguments)
          })
        // Emit the global $root click event
        this.$root.$emit('clicked::link', evt)
      }
      if ((!isRouterLink && this.computedHref === '#') || this.disabled) {
        // Stop scroll-to-top behavior or navigation on
        // regular links when href is just '#'
        evt && evt.preventDefault()
      }
    }
  },
  render(h) {
    const tag = this.computedTag
    const rel = this.computedRel
    const href = this.computeHref
    const isRouterLink = this.isRouterLink

    // We want to overwrite any click handler since our callback
    // will invoke the user supplied handler9s) if !props.disabled
    const handlers = { ...this.$listeners, click: this.onClick }

    const componentData = {
      class: { active: this.active, disabled: this.disabled },
      attrs: {
        ...this.$attrs,
        rel,
        target: this.target,
        tabindex: this.disabled
          ? '-1'
          : isUndefined(this.$attrs.tabindex)
            ? null
            : this.$attrs.tabindex,
        'aria-disabled': this.disabled ? 'true' : null
      },
      props: isRouterLink ? { ...this.$props, tag: this.routerTag } : {},
      on: isRouterLink ? {} : handlers,
      nativeOn: isRouterLink ? handlers : {}
    }

    // If href attribute exists on <router-link> (even undefined or null) it fails working on
    // SSR, so we explicitly add it here if needed (i.e. if computedHref() is truthy)
    if (href) {
      componentData.attrs.href = href
    } else {
      // Ensure the prop HREF does not exist for router links
      delete componentData.props.href
    }

    return h(tag, componentData, this.$slots.default)
  }
})

export default BLink
