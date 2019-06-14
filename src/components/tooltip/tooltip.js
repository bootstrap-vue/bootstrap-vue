import Vue from '../../utils/vue'
import ToolTip from '../../utils/tooltip.class'
import warn from '../../utils/warn'
import { isArray, arrayIncludes } from '../../utils/array'
import { getComponentConfig } from '../../utils/config'
import { HTMLElement } from '../../utils/safe-types'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import toolpopMixin from '../../mixins/toolpop'

const NAME = 'BTooltip'

// @vue/component
export const BTooltip = /*#__PURE__*/ Vue.extend({
  name: NAME,
  mixins: [toolpopMixin, normalizeSlotMixin],
  props: {
    title: {
      type: String,
      default: ''
    },
    triggers: {
      type: [String, Array],
      default: 'hover focus'
    },
    placement: {
      type: String,
      default: 'top'
    },
    fallbackPlacement: {
      type: [String, Array],
      default: 'flip',
      validator(value) {
        return isArray(value) || arrayIncludes(['flip', 'clockwise', 'counterclockwise'], value)
      }
    },
    delay: {
      type: [Number, Object, String],
      default: () => getComponentConfig(NAME, 'delay')
    },
    boundary: {
      // String: scrollParent, window, or viewport
      // Element: element reference
      type: [String, HTMLElement],
      default: () => getComponentConfig(NAME, 'boundary')
    },
    boundaryPadding: {
      type: Number,
      default: () => getComponentConfig(NAME, 'boundaryPadding')
    }
  },
  data() {
    return {}
  },
  methods: {
    createToolpop() {
      // getTarget is in toolpop mixin
      const target = this.getTarget()
      /* istanbul ignore else */
      if (target) {
        this._toolpop = new ToolTip(target, this.getConfig(), this.$root)
      } else {
        this._toolpop = null
        warn("b-tooltip: 'target' element not found!")
      }
      return this._toolpop
    }
  },
  render(h) {
    return h(
      'div',
      { class: ['d-none'], style: { display: 'none' }, attrs: { 'aria-hidden': true } },
      [h('div', { ref: 'title' }, this.normalizeSlot('default'))]
    )
  }
})

export default BTooltip
