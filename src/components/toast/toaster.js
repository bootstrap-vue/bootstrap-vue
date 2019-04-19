import Vue from '../../utils/vue'
import { PortalTarget, Wormhole } from 'portal-vue'
import warn from '../../utils/warn'
import { getById, removeClass, requestAF } from '../../utils/dom'

/* istanbul ignore file: for now until ready for testing */

// --- Constants ---

const NAME = 'BToaster'

export const props = {
  name: {
    type: String,
    required: true
  },
  ariaLive: {
    type: String,
    default: 'polite'
  },
  ariaAtomic: {
    type: String,
    default: 'true' // Allowed: 'true' or 'false'
  },
  role: {
    // Aria role
    type: String,
    default: null
  }
  /*
  transition: {
    type: [Boolean, String, Object],
    default: false
  }
  */
}

// @vue/component
export const DefaultTransition = Vue.extend({
  // functional: true,
  // render(h, { children }) {
  //   return h('transition-group', { props: { tag: 'div', name: 'b-toaster' } }, children)
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
export default Vue.extend({
  name: NAME,
  props,
  data() {
    return {
      // We don't render on SSR or if a an existing target found
      doRender: false,
      dead: false
    }
  },
  beforeMount() {
    /* istanbul ignore if */
    if (getById(this.name) || Wormhole.hasTarget(this.name)) {
      warn(`b-toaster: A <portal-target> with name '${this.name}' already exists in the document.`)
      this.dead = true
    } else {
      this.doRender = true
      this.$once('hook:beforeDestroy', () => {
        // Let toasts made with `this.$bvToast.toast()` know that this toaster
        // is being destroyed and should should also destroy/hide themselves
        this.$root.$emit('bv::toaster::destroyed', this.name)
      })
    }
  },
  destroyed() {
    // Remove from DOM if needed
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  render(h) {
    let $target = h('div', { class: ['d-none', { 'b-dead-toaster': this.dead }] })
    if (this.doRender) {
      $target = h(PortalTarget, {
        staticClass: 'b-toaster',
        class: this.name,
        attrs: {
          id: this.name,
          role: this.role,
          'aria-live': this.ariaLive,
          'aria-atomic': this.ariaAtomic
        },
        props: {
          name: this.name,
          multiple: true,
          tag: 'div',
          slim: false,
          // transition: this.transition || DefaultTransition
          transition: DefaultTransition
        }
      })
    }
    return $target
  }
})
