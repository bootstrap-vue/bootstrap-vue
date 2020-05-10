import { CLASS_NAME_DROPDOWN_ITEM, CLASS_NAME_TEXT } from '../../constants/class-names'
import { NAME_DROPDOWN_ITEM } from '../../constants/components'
import { ROLE_MENUITEM, ROLE_PRESENTATION } from '../../constants/roles'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import Vue from '../../utils/vue'
import { requestAF } from '../../utils/dom'
import { suffixClass } from '../../utils/string'
import { BLink, propsFactory as linkPropsFactory } from '../link/link'

// --- Props ---
export const props = {
  ...linkPropsFactory(),
  linkClass: {
    type: [String, Array, Object],
    default: null
  },
  variant: {
    type: String,
    default: null
  }
}

// --- Main component ---
// @vue/component
export const BDropdownItem = /*#__PURE__*/ Vue.extend({
  name: NAME_DROPDOWN_ITEM,
  mixins: [normalizeSlotMixin],
  inheritAttrs: false,
  inject: {
    bvDropdown: { default: null }
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
    return h('li', { attrs: { role: ROLE_PRESENTATION } }, [
      h(
        BLink,
        {
          props: this.$props,
          staticClass: CLASS_NAME_DROPDOWN_ITEM,
          class: [
            this.linkClass,
            {
              [suffixClass(CLASS_NAME_TEXT, props.variant)]:
                this.variant && !(this.active || this.disabled)
            }
          ],
          attrs: { ...this.$attrs, role: ROLE_MENUITEM },
          on: { click: this.onClick },
          ref: 'item'
        },
        this.normalizeSlot('default')
      )
    ])
  }
})
