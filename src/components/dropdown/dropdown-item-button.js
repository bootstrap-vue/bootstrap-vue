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
  },
  variant: {
    type: String,
    default: null
  }
}

// @vue/component
export default Vue.extend({
  name: 'BDropdownItemButton',
  inheritAttrs: false,
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
          class: {
            [this.activeClass]: this.active,
            [`text-${this.variant}`]: this.variant && !(this.active || this.disabled)
          },
          attrs: {
            ...this.$attrs,
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
