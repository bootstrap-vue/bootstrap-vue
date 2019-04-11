import Vue from 'vue'
import BLink, { propsFactory as linkPropsFactory } from '../link/link'
import { requstAF } from '../../utils/dom'

export const props = linkPropsFactory()

// @vue/component
export default Vue.extend({
  name: 'BDropdownItem',
  inject: {
    bvDropdown: {
      default: null
    }
  },
  props,
  methods: {
    closeDropdown() {
      // Close on next animation frame to allow BLink time to process
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
    return h(
      BLink,
      {
        props: this.$props,
        staticClass: 'dropdown-item',
        attrs: { role: 'menuitem' },
        on: { click: this.onClick }
      },
      this.$slots.default
    )
  }
})
