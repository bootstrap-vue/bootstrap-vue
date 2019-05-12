import Vue from '../../../utils/vue'
import { PortalTarget, Wormhole } from 'portal-vue'
import { requestAF } from '../../../utils/dom'

const NAME = 'BModalTarget'

export const modalTargetName = `BV-${NAME}`

// Pivate internal component used by ModalManager.
// Not to be used directly by humans.
// @vue/component
export default Vue.extend({
  name: NAME,
  data() {
    return {
      doRender: false
    }
  },
  destroyed() /* istanbul ignore next */ {
    // Ensure we get removed from DOM when destroyed
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  beforeMount() {
    const self = this
    // There can be only one modal target in the document
    /* istanbul ignore if */
    if (Wormhole.hasTarget(modalTargetName)) {
      this.$once('hook:mounted', () => {
        self.$nextTick(() => {
          requestAF(() => {
            self.$destroy()
          })
        })
      })
    } else {
      this.doRender = true
    }
  },
  render(h) {
    /* istanbul ignore else */
    if (this.doRender) {
      return h(PortalTarget, {
        staticClass: 'b-modal-target',
        props: {
          tag: 'div',
          name: modalTargetName,
          multiple: true,
          transition: null,
          slim: false
        }
      })
    } else {
      return h('div')
    }
  }
})
