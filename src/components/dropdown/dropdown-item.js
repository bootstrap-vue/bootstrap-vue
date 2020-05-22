import Vue from '../../utils/vue'
import { requestAF } from '../../utils/dom'
import { omit } from '../../utils/object'
import attrsMixin from '../../mixins/attrs'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BLink, props as BLinkProps } from '../link/link'

export const props = omit(BLinkProps, ['event', 'routerTag'])

// @vue/component
export const BDropdownItem = /*#__PURE__*/ Vue.extend({
  name: 'BDropdownItem',
  mixins: [attrsMixin, normalizeSlotMixin],
  inheritAttrs: false,
  inject: {
    bvDropdown: {
      default: null
    }
  },
  props: {
    ...props,
    linkClass: {
      type: [String, Array, Object],
      default: null
    },
    variant: {
      type: String,
      default: null
    }
  },
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
      this.$emit('click', evt)
      this.closeDropdown()
    }
  },
  render(h) {
    return h('li', { attrs: { role: 'presentation' } }, [
      h(
        BLink,
        {
          props: this.$props,
          staticClass: 'dropdown-item',
          class: [
            this.linkClass,
            {
              [`text-${this.variant}`]: this.variant && !(this.active || this.disabled)
            }
          ],
          attrs: this.computedAttrs,
          on: { click: this.onClick },
          ref: 'item'
        },
        this.normalizeSlot('default')
      )
    ])
  }
})
