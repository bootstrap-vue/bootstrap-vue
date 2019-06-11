import Vue from '../../utils/vue'
import { PortalTarget, Wormhole } from 'portal-vue'
import warn from '../../utils/warn'
import { getComponentConfig } from '../../utils/config'
import { removeClass, requestAF } from '../../utils/dom'

// --- Constants ---

const NAME = 'BToaster'

export const props = {
  name: {
    type: String,
    required: true
  },
  ariaLive: {
    type: String,
    default: () => getComponentConfig(NAME, 'ariaLive')
  },
  ariaAtomic: {
    type: String,
    default: () => getComponentConfig(NAME, 'ariaAtomic') // Allowed: 'true' or 'false' or null
  },
  role: {
    // Aria role
    type: String,
    default: () => getComponentConfig(NAME, 'role')
  }
  /*
  transition: {
    type: [Boolean, String, Object],
    default: false
  }
  */
}

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
      // Handle bug where enter-to class is not removed.
      // Bug is related to portal-vue and transition-groups.
      requestAF(() => {
        removeClass(el, `${this.name}-enter-to`)
        // The *-move class is also stuck on elements that moved,
        // but there are no javascript hooks to handle after move.
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
  name: NAME,
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
      warn(`b-toaster: A <portal-target> with name '${this.name}' already exists in the document.`)
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

export default BToaster
