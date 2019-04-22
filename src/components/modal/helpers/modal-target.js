import Vue from '../../../utils/vue'
import { requestAF } from '../../../utils/dom'
import { PortalTarget, Wormhole } from 'portal-vue'

const NAME = 'BModalTarget'

export const modalTargetName = `BV-${NAME}`

export const BModalTarget = Vue.extend({
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
    // There can be only one Modal target in the document
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
    let $target = h('div', {})
    if (this.doRender) {
      $target = h(PortalTarget, {
        staticClass: 'b-modal-target',
        props: {
          tag: 'div',
          name: modalTargetName,
          multiple: true,
          transition: null,
          slim: false
        }
      })
    }
    return $target
  }
})
