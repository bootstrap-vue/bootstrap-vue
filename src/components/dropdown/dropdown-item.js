import { Vue } from '../../vue'
import { NAME_DROPDOWN_ITEM } from '../../constants/components'
import { EVENT_NAME_CLICK } from '../../constants/events'
import { PROP_TYPE_ARRAY_OBJECT_STRING, PROP_TYPE_STRING } from '../../constants/props'
import { requestAF } from '../../utils/dom'
import { omit, sortKeys } from '../../utils/object'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { attrsMixin } from '../../mixins/attrs'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'
import { BLink, props as BLinkProps } from '../link/link'

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...omit(BLinkProps, ['event', 'routerTag']),
    linkClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    variant: makeProp(PROP_TYPE_STRING)
  }),
  NAME_DROPDOWN_ITEM
)

// --- Main component ---

// @vue/component
export const BDropdownItem = /*#__PURE__*/ Vue.extend({
  name: NAME_DROPDOWN_ITEM,
  mixins: [attrsMixin, normalizeSlotMixin],
  inject: {
    bvDropdown: { default: null }
  },
  inheritAttrs: false,
  props,
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
    onClick(event) {
      this.$emit(EVENT_NAME_CLICK, event)
      this.closeDropdown()
    }
  },
  render(h) {
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
