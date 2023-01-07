import { extend } from '../../vue'
import { NAME_LINK } from '../../constants/components'
import { EVENT_NAME_CLICK } from '../../constants/events'
import {
  PROP_TYPE_ARRAY_STRING,
  PROP_TYPE_BOOLEAN,
  PROP_TYPE_OBJECT_STRING,
  PROP_TYPE_STRING
} from '../../constants/props'
import { concat } from '../../utils/array'
import { attemptBlur, attemptFocus, isTag } from '../../utils/dom'
import { getRootEventName, stopEvent } from '../../utils/events'
import { isBoolean, isEvent, isFunction, isUndefined } from '../../utils/inspect'
import { omit, sortKeys } from '../../utils/object'
import { makeProp, makePropsConfigurable, pluckProps } from '../../utils/props'
import { computeHref, computeRel, computeTag, isRouterLink } from '../../utils/router'
import { attrsMixin } from '../../mixins/attrs'
import { listenOnRootMixin } from '../../mixins/listen-on-root'
import { listenersMixin } from '../../mixins/listeners'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'

// --- Constants ---

const ROOT_EVENT_NAME_CLICKED = getRootEventName(NAME_LINK, 'clicked')

// --- Props ---

// `<router-link>` specific props
export const routerLinkProps = {
  activeClass: makeProp(PROP_TYPE_STRING),
  append: makeProp(PROP_TYPE_BOOLEAN, false),
  event: makeProp(PROP_TYPE_ARRAY_STRING),
  exact: makeProp(PROP_TYPE_BOOLEAN, false),
  exactActiveClass: makeProp(PROP_TYPE_STRING),
  exactPath: makeProp(PROP_TYPE_BOOLEAN, false),
  exactPathActiveClass: makeProp(PROP_TYPE_STRING),
  replace: makeProp(PROP_TYPE_BOOLEAN, false),
  routerTag: makeProp(PROP_TYPE_STRING),
  to: makeProp(PROP_TYPE_OBJECT_STRING)
}

// `<nuxt-link>` specific props
export const nuxtLinkProps = {
  noPrefetch: makeProp(PROP_TYPE_BOOLEAN, false),
  // Must be `null` to fall back to the value defined in the
  // `nuxt.config.js` configuration file for `router.prefetchLinks`
  // We convert `null` to `undefined`, so that Nuxt.js will use the
  // compiled default
  // Vue treats `undefined` as default of `false` for Boolean props,
  // so we must set it as `null` here to be a true tri-state prop
  prefetch: makeProp(PROP_TYPE_BOOLEAN, null)
}

// All `<b-link>` props
export const props = makePropsConfigurable(
  sortKeys({
    ...nuxtLinkProps,
    ...routerLinkProps,
    active: makeProp(PROP_TYPE_BOOLEAN, false),
    disabled: makeProp(PROP_TYPE_BOOLEAN, false),
    href: makeProp(PROP_TYPE_STRING),
    // Must be `null` if no value provided
    rel: makeProp(PROP_TYPE_STRING, null),
    // To support 3rd party router links based on `<router-link>` (i.e. `g-link` for Gridsome)
    // Default is to auto choose between `<router-link>` and `<nuxt-link>`
    // Gridsome doesn't provide a mechanism to auto detect and has caveats
    // such as not supporting FQDN URLs or hash only URLs
    routerComponentName: makeProp(PROP_TYPE_STRING),
    target: makeProp(PROP_TYPE_STRING, '_self')
  }),
  NAME_LINK
)

// --- Main component ---

// @vue/component
export const BLink = /*#__PURE__*/ extend({
  name: NAME_LINK,
  // Mixin order is important!
  mixins: [attrsMixin, listenersMixin, listenOnRootMixin, normalizeSlotMixin],
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
      const { event, prefetch, routerTag } = this
      return this.isRouterLink
        ? {
            ...pluckProps(
              omit(
                { ...routerLinkProps, ...(this.computedTag === 'nuxt-link' ? nuxtLinkProps : {}) },
                ['event', 'prefetch', 'routerTag']
              ),
              this
            ),
            // Only add these props, when actually defined
            ...(event ? { event } : {}),
            ...(isBoolean(prefetch) ? { prefetch } : {}),
            // Pass `router-tag` as `tag` prop
            ...(routerTag ? { tag: routerTag } : {})
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
        ...(isRouterLink && routerTag && !isTag(routerTag, 'a') ? {} : { rel, target }),
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
    onClick(event) {
      const eventIsEvent = isEvent(event)
      const isRouterLink = this.isRouterLink
      const suppliedHandler = this.bvListeners.click
      if (eventIsEvent && this.disabled) {
        // Stop event from bubbling up
        // Kill the event loop attached to this specific `EventTarget`
        // Needed to prevent `vue-router` for doing its thing
        stopEvent(event, { immediatePropagation: true })
      } else {
        // Router links do not emit instance `click` events, so we
        // add in an `$emit('click', event)` on its Vue instance
        //
        // seems not to be required for Vue3 compat build
        /* istanbul ignore next: difficult to test, but we know it works */
        if (isRouterLink) {
          event.currentTarget.__vue__?.$emit(EVENT_NAME_CLICK, event)
        }
        // Call the suppliedHandler(s), if any provided
        concat(suppliedHandler)
          .filter(h => isFunction(h))
          .forEach(handler => {
            handler(...arguments)
          })
        // Emit the global `$root` click event
        this.emitOnRoot(ROOT_EVENT_NAME_CLICKED, event)
        // TODO: Remove deprecated 'clicked::link' event with next major release
        this.emitOnRoot('clicked::link', event)
      }
      // Stop scroll-to-top behavior or navigation on
      // regular links when href is just '#'
      if (eventIsEvent && !isRouterLink && this.computedHref === '#') {
        stopEvent(event, { propagation: false })
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
