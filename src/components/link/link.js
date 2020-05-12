import Vue from '../../utils/vue'
import { concat } from '../../utils/array'
import { attemptBlur, attemptFocus } from '../../utils/dom'
import { isEvent, isFunction, isUndefined } from '../../utils/inspect'
import { computeHref, computeRel, computeTag, isRouterLink } from '../../utils/router'
import { omit } from '../../utils/object'
import attrsMixin from '../../mixins/attrs'
import listenersMixin from '../../mixins/listeners'
import normalizeSlotMixin from '../../mixins/normalize-slot'

/**
 * The Link component is used in many other BV components
 * As such, sharing its props makes supporting all its features easier
 * However, some components need to modify the defaults for their own purpose
 * Prefer sharing a fresh copy of the props to ensure mutations
 * do not affect other component references to the props
 *
 * See: https://github.com/vuejs/vue-router/blob/dev/src/components/link.js
 */
export const propsFactory = () => ({
  href: {
    type: String,
    default: null
  },
  rel: {
    type: String,
    // Must be `null` if no value provided
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
  // Mixin order is important!
  mixins: [attrsMixin, listenersMixin, normalizeSlotMixin],
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
      const props = this.isRouterLink ? { ...this.$props, tag: this.routerTag } : {}
      // Ensure the `href` prop does not exist for router links
      return this.computedHref ? props : omit(props, ['href'])
    },
    computedAttrs() {
      const {
        bvAttrs,
        computedHref: href,
        computedRel: rel,
        disabled,
        target,
        routerTag,
        isRouterLink
      } = this

      return {
        ...bvAttrs,
        // If `href` attribute exists on `<router-link>` (even `undefined` or `null`)
        // it fails working on SSR, so we explicitly add it here if needed
        // (i.e. if `computedHref()` is truthy)
        ...(href ? { href } : {}),
        // We don't render `rel` or `target` on non link tags when using `vue-router`
        ...(isRouterLink && routerTag !== 'a' && routerTag !== 'area' ? {} : { rel, target }),
        tabindex: disabled ? '-1' : isUndefined(bvAttrs.tabindex) ? null : bvAttrs.tabindex,
        'aria-disabled': disabled ? 'true' : null
      }
    },
    computedListeners() {
      return {
        // Transfer all listeners (native) to the root element
        ...this.bvListeners,
        // We want to overwrite any click handler since our callback
        // will invoke the user supplied handler(s) if `!this.disabled`
        click: this.onClick
      }
    }
  },
  methods: {
    onClick(evt) {
      const evtIsEvent = isEvent(evt)
      const isRouterLink = this.isRouterLink
      const suppliedHandler = this.bvListeners.click
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
      attemptFocus(this.$el)
    },
    blur() {
      attemptBlur(this.$el)
    }
  },
  render(h) {
    const { active, disabled } = this

    return h(
      this.computedTag,
      {
        class: { active, disabled },
        attrs: this.computedAttrs,
        props: this.computedProps,
        // We must use `nativeOn` for `<router-link>`/`<nuxt-link>` instead of `on`
        [this.isRouterLink ? 'nativeOn' : 'on']: this.computedListeners
      },
      this.normalizeSlot('default')
    )
  }
})
