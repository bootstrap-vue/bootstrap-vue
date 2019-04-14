import Vue from 'vue'
import { PortalTarget } from 'portal-vue'

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
  render(h) {
    render(h) {
      return h(
        Portaltarget,
        {
          class: [ this.name ],
          attrs: {
            id: this.name
          },
          props: {
            name: this.name,
            multiple: true,
            tag: 'div',
            slim: false,
            transition: this.transition
          }
        }
      )
    }
  }
})
