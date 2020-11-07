import { PortalTarget, Wormhole } from 'portal-vue'
import Vue from '../../vue'
import { NAME_TOASTER } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import { removeClass, requestAF } from '../../utils/dom'
import { warn } from '../../utils/warn'

// --- Props ---

export const props = makePropsConfigurable(
  {
    name: {
      type: String,
      required: true
    },
    ariaLive: {
      type: String,
      default: undefined
    },
    // Allowed: 'true' or 'false' or null
    ariaAtomic: {
      type: String
      // default: undefined
    },
    role: {
      // Aria role
      type: String
      // default: undefined
    }
  },
  NAME_TOASTER
)

// @vue/component
export const DefaultTransition = /*#__PURE__*/ Vue.extend({
  data() {
    return {
      // Transition classes base name
      name: 'b-toaster'
    }
  },
  methods: {
    onAfterEnter(el) {
      // Work around a Vue.js bug where `*-enter-to` class is not removed
      // See: https://github.com/vuejs/vue/pull/7901
      // The `*-move` class is also stuck on elements that moved,
      // but there are no JavaScript hooks to handle after move
      // See: https://github.com/vuejs/vue/pull/7906
      requestAF(() => {
        removeClass(el, `${this.name}-enter-to`)
      })
    }
  },
  render(h) {
    return h(
      'transition-group',
      {
        props: { tag: 'div', name: this.name },
        on: { afterEnter: this.onAfterEnter }
      },
      this.$slots.default
    )
  }
})

// @vue/component
export const BToaster = /*#__PURE__*/ Vue.extend({
  name: NAME_TOASTER,
  props,
  data() {
    return {
      // We don't render on SSR or if a an existing target found
      doRender: false,
      dead: false,
      // Toaster names cannot change once created
      staticName: this.name
    }
  },
  beforeMount() {
    this.staticName = this.name
    /* istanbul ignore if */
    if (Wormhole.hasTarget(this.staticName)) {
      warn(
        `A "<portal-target>" with name "${this.name}" already exists in the document.`,
        NAME_TOASTER
      )
      this.dead = true
    } else {
      this.doRender = true
      this.$once('hook:beforeDestroy', () => {
        // Let toasts made with `this.$bvToast.toast()` know that this toaster
        // is being destroyed and should should also destroy/hide themselves
        this.$root.$emit('bv::toaster::destroyed', this.staticName)
      })
    }
  },
  destroyed() {
    // Remove from DOM if needed
    /* istanbul ignore next: difficult to test */
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  render(h) {
    let $toaster = h('div', { class: ['d-none', { 'b-dead-toaster': this.dead }] })
    if (this.doRender) {
      const $target = h(PortalTarget, {
        staticClass: 'b-toaster-slot',
        props: {
          name: this.staticName,
          multiple: true,
          tag: 'div',
          slim: false,
          // transition: this.transition || DefaultTransition
          transition: DefaultTransition
        }
      })
      $toaster = h(
        'div',
        {
          staticClass: 'b-toaster',
          class: [this.staticName],
          attrs: {
            id: this.staticName,
            role: this.role || null, // Fallback to null to make sure attribute doesn't exist
            'aria-live': this.ariaLive,
            'aria-atomic': this.ariaAtomic
          }
        },
        [$target]
      )
    }
    return $toaster
  }
})
