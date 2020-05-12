import { CLASS_NAME_DROPDOWN_ITEM, CLASS_NAME_TEXT } from '../../constants/class-names'
import { NAME_DROPDOWN_ITEM_BUTTON } from '../../constants/components'
import { ROLE_MENUITEM, ROLE_PRESENTATION } from '../../constants/roles'
import Vue from '../../utils/vue'
import attrsMixin from '../../mixins/attrs'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { suffixClass } from '../../utils/string'

// --- Props ---
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

// --- Main component ---
// @vue/component
export const BDropdownItemButton = /*#__PURE__*/ Vue.extend({
  name: NAME_DROPDOWN_ITEM_BUTTON,
  mixins: [attrsMixin, normalizeSlotMixin],
  inheritAttrs: false,
  inject: {
    bvDropdown: { default: null }
  },
  props,
  computed: {
    computedAttrs() {
      return {
        ...this.bvAttrs,
        role: ROLE_MENUITEM,
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
      this.$emit('click', evt)
      this.closeDropdown()
    }
  },
  render(h) {
    return h('li', { attrs: { role: ROLE_PRESENTATION } }, [
      h(
        'button',
        {
          staticClass: CLASS_NAME_DROPDOWN_ITEM,
          class: [
            this.buttonClass,
            {
              [this.activeClass]: this.active,
              [suffixClass(CLASS_NAME_TEXT, props.variant)]:
                this.variant && !(this.active || this.disabled)
            }
          ],
          attrs: this.computedAttrs,
          on: { click: this.onClick },
          ref: 'button'
        },
        this.normalizeSlot('default')
      )
    ])
  }
})
