import { defineComponent, h } from '../../vue'
import { EVENT_NAME_CLICK } from '../../constants/events'
import { NAME_DROPDOWN_ITEM_BUTTON } from '../../constants/components'
import attrsMixin from '../../mixins/attrs'
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
export const BDropdownItemButton = /*#__PURE__*/ defineComponent({
  name: NAME_DROPDOWN_ITEM_BUTTON,
  mixins: [attrsMixin, normalizeSlotMixin],
  inject: {
    bvDropdown: {
      default: null
    }
  },
  inheritAttrs: false,
  props,
  emits: [EVENT_NAME_CLICK],
  computed: {
    computedAttrs() {
      return {
        ...this.bvAttrs,
        role: 'menuitem',
        type: 'button',
        disabled: this.disabled
      }
    }
  },
  methods: {
    closeDropdown() {
      if (this.bvDropdown) {
        this.bvDropdown.hide(true)
      }
    },
    onClick(evt) {
      this.$emit(EVENT_NAME_CLICK, evt)
      this.closeDropdown()
    }
  },
  render() {
    const { bvAttrs } = this

    return h(
      'li',
      {
        class: bvAttrs.class,
        style: bvAttrs.style,
        attrs: { role: 'presentation' }
      },
      [
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
            attrs: this.computedAttrs,
            on: { click: this.onClick },
            ref: 'button'
          },
          this.normalizeSlot()
        )
      ]
    )
  }
})
