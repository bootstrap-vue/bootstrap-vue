import Vue from '../../utils/vue'

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
export default Vue.extend({
  name: 'BDropdownItemButton',
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
    return h('li', [
      h(
        'button',
        {
          staticClass: 'dropdown-item',
          class: { [this.activeClass]: this.active },
          attrs: {
            role: 'menuitem',
            type: 'button',
            disabled: this.disabled
          },
          on: { click: this.onClick },
          ref: 'button'
        },
        this.$slots.default
      )
    ])
  }
})
