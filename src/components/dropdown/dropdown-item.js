import Vue from '../../utils/vue'
import BLink, { propsFactory as linkPropsFactory } from '../link/link'
import { requestAF } from '../../utils/dom'
import nomalizeSlotMixin from '../../mixins/normalize-slot'

export const props = linkPropsFactory()

// @vue/component
export default Vue.extend({
  name: 'BDropdownItem',
  mixins: [nomalizeSlotMixin],
  inject: {
    bvDropdown: {
      default: null
    }
  },
  props,
  methods: {
    closeDropdown() {
      // Close on next animation frame to allow <b-link> time to process
      requestAF(() => {
        if (this.bvDropdown) {
          this.bvDropdown.hide(true)
        }
      })
    },
    onClick(evt) {
      this.$emit('click', evt)
      this.closeDropdown()
    }
  },
  render(h) {
    return h('li', [
      h(
        BLink,
        {
          props: this.$props,
          staticClass: 'dropdown-item',
          attrs: { role: 'menuitem' },
          on: { click: this.onClick },
          ref: 'item'
        },
        this.normalizeSlot('default')
      )
    ])
  }
})
