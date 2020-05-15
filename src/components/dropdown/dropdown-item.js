import { CLASS_NAME_DROPDOWN_ITEM, CLASS_NAME_TEXT } from '../../constants/class-names'
import { NAME_DROPDOWN_ITEM } from '../../constants/components'
import { EVENT_NAME_CLICK } from '../../constants/events'
import { ROLE_MENUITEM, ROLE_PRESENTATION } from '../../constants/roles'
import { SLOT_NAME_DEFAULT } from '../../constants/slot-names'
import Vue from '../../utils/vue'
import { requestAF } from '../../utils/dom'
import { omit } from '../../utils/object'
import { suffixClass } from '../../utils/string'
import attrsMixin from '../../mixins/attrs'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BLink, props as BLinkProps } from '../link/link'

// --- Props ---

export const props = {
  variant: {
    type: String,
    default: null
  },
  linkClass: {
    type: [String, Array, Object],
    default: null
  },
  ...omit(BLinkProps, ['event', 'routerTag'])
}

// --- Main component ---
// @vue/component
export const BDropdownItem = /*#__PURE__*/ Vue.extend({
  name: NAME_DROPDOWN_ITEM,
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
        role: ROLE_MENUITEM
      }
    }
  },
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
      this.$emit(EVENT_NAME_CLICK, evt)
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
          attrs: this.computedAttrs,
          on: { [EVENT_NAME_CLICK]: this.onClick },
          ref: 'item'
        },
        this.normalizeSlot(SLOT_NAME_DEFAULT)
      )
    ])
  }
})
