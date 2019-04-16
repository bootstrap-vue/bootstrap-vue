import Vue from 'vue'
import { PortalTarget, Wormhole } from 'portal-vue'
import warn from '../../utils/warn'
import { getById } from '../../utils/dom'

/* istanbul ignore file: for now until ready for testing */

const NAME = 'BToaster'

// @vue/component
export const DefaultTransition = Vue.extend({
  functional: true,
  render(h, { children }) {
    return h('transition-group', { props: { tag: 'div', name: 'b-toaster' } }, children)
  }
})

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
    default: 'true' // allowed: 'true' or 'false'
  },
  role: {
    // Aria role
    type: String,
    default: null
  },
  transition: {
    type: [Boolean, String, Object],
    default: false
  }
}

// @vue/component
export default Vue.extend({
  name: NAME,
  props,
  data() {
    return {
      // We don't render on SSR or if a an existing target found
      doRender: false
    }
  },
  beforeMount() {
    /* istanbul ignore if */
    if (getById(this.name) || Wormhole.targets[this.name]) {
      warn(`b-toaster: A <portal-target> name '${this.name}' already exists in the document.`)
    } else {
      this.doRender = true
    }
  },
  destroyed() {
    // Remove from DOM if needed
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  render(h) {
    let $target = h('div', { class: 'd-none' })
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
          transition: this.transition || DefaultTransition
        }
      })
    }
    return $target
  }
})
