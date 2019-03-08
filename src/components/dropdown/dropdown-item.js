import BLink, { propsFactory as linkPropsFactory } from '../link/link'

export const props = linkPropsFactory()

// @vue/component
export default {
  name: 'BDropdownItem',
  inject: {
    bvDropdown: {
      default: null
    }
  },
  props,
  methods: {
    closeDropdown() {
      if (this.bvDropdown) {
        this.bvDropdown.hide(true)
      }
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
}
