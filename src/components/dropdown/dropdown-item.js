import BLink, { propsFactory as linkPropsFactory } from '../link/link'

export const props = linkPropsFactory()

// @vue/component
export default {
  name: 'BDropdownItem',
  inject: {
    dropdown: {
      from: 'dropdown',
      default: null
    }
  },
  props,
  methods: {
    closeDropdown() {
      if (this.dropdown) {
        this.dropdown.hide(true)
      }
    }
  },
  render(h) {
    return h(
      BLink,
      {
        props: this.$props,
        staticClass: 'dropdown-item',
        attrs: { role: 'menuitem' },
        on: { click: this.closeDropdown }
      },
      this.$slots.default
    )
  }
}
