import Vue from 'vue'
import { PortalTarget, Wormhole } from 'portal-vue'
import warn from '../../utils/warn'
import { getById } from '../../utils/dom'

/* istanbul ignore file: for now until ready for testing */

const NAME = 'BToaster'

export default Vue.extend({
  name: NAME,
  props: {
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
  },
  data() {
    return {
      // We don't render on SSR or if a an existing target found
      doRender: false
    }
  },
  beforeMount() {
    /* istanbul ignore if */
    if (getById(this.name) || Wormhole.targets[this.name]) {
      warn(`b-toaster: A <portal-target> name '${this.name}' already eixsts in the document`)
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
    /* istanbul ignore else */
    if (this.doRender) {
      return h(PortalTarget, {
        staticClass: 'b-toaster',
        class: [this.name],
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
          transition: this.transition
        }
      })
    } else {
      return h('div', {})
    }
  }
})
