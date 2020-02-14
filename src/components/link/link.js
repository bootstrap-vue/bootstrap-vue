import Vue from '../../utils/vue'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { concat } from '../../utils/array'
import { isEvent, isFunction, isUndefined } from '../../utils/inspect'
import { computeHref, computeRel, computeTag, isRouterLink } from '../../utils/router'

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
export const propsFactory = () => ({
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
})

export const props = propsFactory()

// @vue/component
export const BLink = /*#__PURE__*/ Vue.extend({
  name: 'BLink',
  mixins: [normalizeSlotMixin],
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
    },
    computedProps() {
      return this.isRouterLink ? { ...this.$props, tag: this.routerTag } : {}
    }
  },
  methods: {
    onClick(evt) {
      const evtIsEvent = isEvent(evt)
      const isRouterLink = this.isRouterLink
      const suppliedHandler = this.$listeners.click
      if (evtIsEvent && this.disabled) {
        // Stop event from bubbling up
        evt.stopPropagation()
        // Kill the event loop attached to this specific `EventTarget`
        // Needed to prevent `vue-router` for doing its thing
        evt.stopImmediatePropagation()
      } else {
        /* istanbul ignore next: difficult to test, but we know it works */
        if (isRouterLink && evt.currentTarget.__vue__) {
          // Router links do not emit instance `click` events, so we
          // add in an `$emit('click', evt)` on its Vue instance
          evt.currentTarget.__vue__.$emit('click', evt)
        }
        // Call the suppliedHandler(s), if any provided
        concat(suppliedHandler)
          .filter(h => isFunction(h))
          .forEach(handler => {
            handler(...arguments)
          })
        // Emit the global `$root` click event
        this.$root.$emit('clicked::link', evt)
      }
      // Stop scroll-to-top behavior or navigation on
      // regular links when href is just '#'
      if (evtIsEvent && (this.disabled || (!isRouterLink && this.computedHref === '#'))) {
        evt.preventDefault()
      }
    },
    focus() {
      if (this.$el && this.$el.focus) {
        this.$el.focus()
      }
    },
    blur() {
      if (this.$el && this.$el.blur) {
        this.$el.blur()
      }
    }
  },
  render(h) {
    const tag = this.computedTag
    const rel = this.computedRel
    const href = this.computedHref
    const isRouterLink = this.isRouterLink

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
      props: this.computedProps
    }
    // Add the event handlers. We must use `nativeOn` for
    // `<router-link>`/`<nuxt-link>` instead of `on`
    componentData[isRouterLink ? 'nativeOn' : 'on'] = {
      // Transfer all listeners (native) to the root element
      ...this.$listeners,
      // We want to overwrite any click handler since our callback
      // will invoke the user supplied handler(s) if `!this.disabled`
      click: this.onClick
    }

    // If href attribute exists on <router-link> (even undefined or null) it fails working on
    // SSR, so we explicitly add it here if needed (i.e. if computedHref() is truthy)
    if (href) {
      componentData.attrs.href = href
    } else {
      // Ensure the prop HREF does not exist for router links
      delete componentData.props.href
    }

    return h(tag, componentData, this.normalizeSlot('default'))
  }
})
