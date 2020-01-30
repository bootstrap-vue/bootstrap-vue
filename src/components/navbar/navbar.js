import Vue from '../../utils/vue'
import { getComponentConfig, getBreakpoints } from '../../utils/config'
import { isString } from '../../utils/inspect'
import normalizeSlotMixin from '../../mixins/normalize-slot'

const NAME = 'BNavbar'

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
    default: () => getComponentConfig(NAME, 'variant')
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

// @vue/component
export const BNavbar = /*#__PURE__*/ Vue.extend({
  name: NAME,
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
          role: this.tag === 'nav' ? null : 'navigation'
        }
      },
      [this.normalizeSlot('default')]
    )
  }
})
