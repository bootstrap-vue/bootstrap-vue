export const props = {
  active: {
    type: Boolean,
    default: false
  },
  activeClass: {
    type: String,
    default: 'active'
  },
  disabled: {
    type: Boolean,
    default: false
  }
}

// @vue/component
export default {
  name: 'BDropdownItemButton',
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
    },
    onClick(evt) {
      this.$emit('click', evt)
      this.closeDropdown()
    }
  },
  render(h) {
    return h(
      'button',
      {
        staticClass: 'dropdown-item',
        class: { [this.activeClass]: this.active },
        attrs: { role: 'menuitem', type: 'button', disabled: this.disabled },
        on: { click: this.onClick }
      },
      this.$slots.default
    )
  }
}
