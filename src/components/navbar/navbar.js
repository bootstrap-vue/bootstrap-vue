import { NAME_NAVBAR } from '../../constants/components'
import Vue from '../../utils/vue'
import { getComponentConfig, getBreakpoints } from '../../utils/config'
import { isTag } from '../../utils/dom'
import { isString } from '../../utils/inspect'
import normalizeSlotMixin from '../../mixins/normalize-slot'

// --- Props ---

export const props = {
  tag: {
    type: String,
    default: 'nav'
  },
  type: {
    type: String,
    default: 'light'
  },
  variant: {
    type: String,
    default: () => getComponentConfig(NAME_NAVBAR, 'variant')
  },
  toggleable: {
    type: [Boolean, String],
    default: false
  },
  fixed: {
    type: String
  },
  sticky: {
    type: Boolean,
    default: false
  },
  print: {
    type: Boolean,
    default: false
  }
}

// --- Main component ---
// @vue/component
export const BNavbar = /*#__PURE__*/ Vue.extend({
  name: NAME_NAVBAR,
  mixins: [normalizeSlotMixin],
  props,
  provide() {
    return { bvNavbar: this }
  },
  computed: {
    breakpointClass() {
      let breakpoint = null
      const xs = getBreakpoints()[0]
      const toggleable = this.toggleable
      if (toggleable && isString(toggleable) && toggleable !== xs) {
        breakpoint = `navbar-expand-${toggleable}`
      } else if (toggleable === false) {
        breakpoint = 'navbar-expand'
      }

      return breakpoint
    }
  },
  render(h) {
    return h(
      this.tag,
      {
        staticClass: 'navbar',
        class: [
          {
            'd-print': this.print,
            'sticky-top': this.sticky,
            [`navbar-${this.type}`]: this.type,
            [`bg-${this.variant}`]: this.variant,
            [`fixed-${this.fixed}`]: this.fixed
          },
          this.breakpointClass
        ],
        attrs: {
          role: isTag(this.tag, 'nav') ? null : 'navigation'
        }
      },
      [this.normalizeSlot()]
    )
  }
})
