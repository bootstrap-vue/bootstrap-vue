import Vue from '../../utils/vue'
import normalizeSlotMixin from '../../mixins/normalize-slot'

export const props = {
  active: {
    type: Boolean,
    default: false
  },
  activeClass: {
    type: String,
    default: 'active'
  },
  buttonClass: {
    type: [String, Array, Object]
    // default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String
    // default: null
  }
}

// @vue/component
export const BDropdownItemButton = /*#__PURE__*/ Vue.extend({
  name: 'BDropdownItemButton',
  mixins: [normalizeSlotMixin],
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
    return h('li', { attrs: { role: 'presentation' } }, [
      h(
        'button',
        {
          staticClass: 'dropdown-item',
          class: [
            this.buttonClass,
            {
              [this.activeClass]: this.active,
              [`text-${this.variant}`]: this.variant && !(this.active || this.disabled)
            }
          ],
          attrs: {
            ...this.$attrs,
            role: 'menuitem',
            type: 'button',
            disabled: this.disabled
          },
          on: { click: this.onClick },
          ref: 'button'
        },
        this.normalizeSlot('default')
      )
    ])
  }
})
