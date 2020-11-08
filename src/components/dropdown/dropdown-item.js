import { defineComponent, h } from '../../vue'
import { EVENT_NAME_CLICK } from '../../constants/events'
import { NAME_DROPDOWN_ITEM } from '../../constants/components'
import { requestAF } from '../../utils/dom'
import { omit } from '../../utils/object'
import attrsMixin from '../../mixins/attrs'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BLink, props as BLinkProps } from '../link/link'

// --- Props ---

export const props = omit(BLinkProps, ['event', 'routerTag'])

// --- Main component ---
// @vue/component
export const BDropdownItem = /*#__PURE__*/ defineComponent({
  name: NAME_DROPDOWN_ITEM,
  mixins: [attrsMixin, normalizeSlotMixin],
  inject: {
    bvDropdown: {
      default: null
    }
  },
  inheritAttrs: false,
  props: {
    ...props,
    linkClass: {
      type: [String, Array, Object]
      // default: null
    },
    variant: {
      type: String
      // default: null
    }
  },
  emits: [EVENT_NAME_CLICK],
  computed: {
    computedAttrs() {
      return {
        ...this.bvAttrs,
        role: 'menuitem'
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
  render() {
    const { linkClass, variant, active, disabled, onClick, bvAttrs } = this

    return h(
      'li',
      {
        class: bvAttrs.class,
        style: bvAttrs.style,
        attrs: { role: 'presentation' }
      },
      [
        h(
          BLink,
          {
            staticClass: 'dropdown-item',
            class: [linkClass, { [`text-${variant}`]: variant && !(active || disabled) }],
            props: this.$props,
            attrs: this.computedAttrs,
            on: { click: onClick },
            ref: 'item'
          },
          this.normalizeSlot()
        )
      ]
    )
  }
})
