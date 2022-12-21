import { extend } from '../../vue'
import { NAME_NAVBAR } from '../../constants/components'
import {
  PROP_TYPE_BOOLEAN,
  PROP_TYPE_BOOLEAN_STRING,
  PROP_TYPE_STRING
} from '../../constants/props'
import { getBreakpoints } from '../../utils/config'
import { isTag } from '../../utils/dom'
import { isString } from '../../utils/inspect'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'

// --- Props ---

export const props = makePropsConfigurable(
  {
    fixed: makeProp(PROP_TYPE_STRING),
    print: makeProp(PROP_TYPE_BOOLEAN, false),
    sticky: makeProp(PROP_TYPE_BOOLEAN, false),
    tag: makeProp(PROP_TYPE_STRING, 'nav'),
    toggleable: makeProp(PROP_TYPE_BOOLEAN_STRING, false),
    type: makeProp(PROP_TYPE_STRING, 'light'),
    variant: makeProp(PROP_TYPE_STRING)
  },
  NAME_NAVBAR
)

// --- Main component ---

// @vue/component
export const BNavbar = /*#__PURE__*/ extend({
  name: NAME_NAVBAR,
  mixins: [normalizeSlotMixin],
  provide() {
    return { getBvNavbar: () => this }
  },
  props,
  computed: {
    breakpointClass() {
      const { toggleable } = this
      const xs = getBreakpoints()[0]

      let breakpoint = null
      if (toggleable && isString(toggleable) && toggleable !== xs) {
        breakpoint = `navbar-expand-${toggleable}`
      } else if (toggleable === false) {
        breakpoint = 'navbar-expand'
      }

      return breakpoint
    }
  },
  render(h) {
    const { tag, type, variant, fixed } = this

    return h(
      tag,
      {
        staticClass: 'navbar',
        class: [
          {
            'd-print': this.print,
            'sticky-top': this.sticky,
            [`navbar-${type}`]: type,
            [`bg-${variant}`]: variant,
            [`fixed-${fixed}`]: fixed
          },
          this.breakpointClass
        ],
        attrs: {
          role: isTag(tag, 'nav') ? null : 'navigation'
        }
      },
      [this.normalizeSlot()]
    )
  }
})
