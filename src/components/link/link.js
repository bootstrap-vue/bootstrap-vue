import Vue from '../../vue'
import { NAME_LINK } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import { concat } from '../../utils/array'

import { attemptBlur, attemptFocus, isTag } from '../../utils/dom'
import { stopEvent } from '../../utils/events'
import { isBoolean, isEvent, isFunction, isUndefined } from '../../utils/inspect'
import { pluckProps } from '../../utils/props'
import { computeHref, computeRel, computeTag, isRouterLink } from '../../utils/router'
import attrsMixin from '../../mixins/attrs'
import listenersMixin from '../../mixins/listeners'
import normalizeSlotMixin from '../../mixins/normalize-slot'

// --- Props ---

// <router-link> specific props
export const routerLinkProps = {
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
  }
}

// <nuxt-link> specific props
export const nuxtLinkProps = {
  prefetch: {
    type: Boolean,
    // Must be `null` to fall back to the value defined in the
    // `nuxt.config.js` configuration file for `router.prefetchLinks`
    // We convert `null` to `undefined`, so that Nuxt.js will use the
    // compiled default. Vue treats `undefined` as default of `false`
    // for Boolean props, so we must set it as `null` here to be a
    // true tri-state prop
    default: null
  },
  noPrefetch: {
    type: Boolean,
    default: false
  }
}

export const props = makePropsConfigurable(
  {
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
    ...routerLinkProps,
    ...nuxtLinkProps,
    // To support 3rd party router links based on `<router-link>` (i.e. `g-link` for Gridsome)
    // Default is to auto choose between `<router-link>` and `<nuxt-link>`
    // Gridsome doesn't provide a mechanism to auto detect and has caveats
    // such as not supporting FQDN URLs or hash only URLs
    routerComponentName: {
      type: String
      // default: undefined
    }
  },
  NAME_LINK
)

// --- Main component ---
// @vue/component
export const BLink = /*#__PURE__*/ Vue.extend({
  name: NAME_LINK,
  // Mixin order is important!
  mixins: [attrsMixin, listenersMixin, normalizeSlotMixin],
  inheritAttrs: false,
  props,
  computed: {
    computedTag() {
      // We don't pass `this` as the first arg as we need reactivity of the props
      const { to, disabled, routerComponentName } = this
      return computeTag({ to, disabled, routerComponentName }, this)
    },
    isRouterLink() {
      return isRouterLink(this.computedTag)
    },
    computedRel() {
      // We don't pass `this` as the first arg as we need reactivity of the props
      const { target, rel } = this
      return computeRel({ target, rel })
    },
    computedHref() {
      // We don't pass `this` as the first arg as we need reactivity of the props
      const { to, href } = this
      return computeHref({ to, href }, this.computedTag)
    },
    computedProps() {
      const { prefetch } = this
      return this.isRouterLink
        ? {
            ...pluckProps({ ...routerLinkProps, ...nuxtLinkProps }, this),
            // Coerce `prefetch` value `null` to be `undefined`
            prefetch: isBoolean(prefetch) ? prefetch : undefined,
            // Pass `router-tag` as `tag` prop
            tag: this.routerTag
          }
        : {}
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
        // (i.e. if `computedHref` is truthy)
        ...(href ? { href } : {}),
        // We don't render `rel` or `target` on non link tags when using `vue-router`
        ...(isRouterLink && !isTag(routerTag, 'a') ? {} : { rel, target }),
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
        // Kill the event loop attached to this specific `EventTarget`
        // Needed to prevent `vue-router` for doing its thing
        stopEvent(evt, { immediatePropagation: true })
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
      if (evtIsEvent && !isRouterLink && this.computedHref === '#') {
        stopEvent(evt, { propagation: false })
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
      this.normalizeSlot()
    )
  }
})
