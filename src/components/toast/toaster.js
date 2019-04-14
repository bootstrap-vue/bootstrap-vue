import Vue from 'vue'
import { PortalTarget } from 'portal-vue'
import { requestAF } from '../../utils/dom'

/* istanbul ignore file: for now until ready for testing */

const NAME = 'BToaster'

export default Vue.extend({
  name: NAME,
  props: {
    name: {
      type: String,
      required: true
    },
    transition: {
      type: [Boolean, String, Object],
      default: false
    }
  },
  data() {
    return {
      doRender: false
    }
  },
  beforeMount() {
    // TODO: Check for already existing <portal-target> with same
    //       name/id and don't set doRender to true
    requestAF(() => {
      // We don't render on SSR
      this.doRender = true
    })
  },
  render(h) {
    /* istanbul ignore else */
    if (this.doRender) {
      return h(PortalTarget, {
        staticClass: 'b-toaster',
        class: [this.name],
        attrs: { id: this.name },
        props: {
          name: this.name,
          multiple: true,
          tag: 'div',
          slim: false,
          transition: this.transition
        }
      })
    } else {
      return h(false)
    }
  }
})
