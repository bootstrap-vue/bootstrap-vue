import Vue from './vue'
import { BVPopper } from './bv-popper'
import { isFunction } from './inspect'

const NAME = 'BVTooltipTemplate'

// @vue/component
export const BVTooltipTemplate = /*#__PURE__*/ Vue.extend({
  name: NAME,
  extends: BVPopper,
  props: {
    id: {
      type: String,
      default: null
    },
    title: {
      // Text string, Slot Function, Array<vNode>, vNode
      type: [String, Function, Array, Object],
      default: ''
    },
    content: {
      // Text string, Slot Function, Array<vNode>, vNode
      // Alias/Alternate for title for tolltip
      type: [String, Function, Array, Object],
      default: ''
    },
    variant: {
      type: String,
      default: null
    },
    customClass: {
      type: [String, Array, Object],
      default: null
    }
  },
  computed: {
    templateType() {
      return 'tooltip'
    },
    templateClasses() {
      return [
        {
          [`b-${this.templateType}-${this.variant}`]: this.variant,
          // `atachment` will come from BVToolpop
          [`bs-${this.templateType}-${this.attachment}`]: this.attachment
        },
        this.customClass
      ]
    },
    templateAttributes() {
      return {
        id: this.id,
        role: 'tooltip',
        tabindex: '-1'
      }
    },
    templateListeners() {
      // Used for hover / focus trigger listeners
      return {
        mouseenter: evt => {
          this.$emit('mouseenter', evt)
        },
        mouseleave: evt => {
          this.$emit('mouseleave', evt)
        },
        focusin: evt => {
          this.$emit('focusin', evt)
        },
        focusout: evt => {
          this.$emit('focusout', evt)
        }
      }
    }
  },
  methods: {
    renderTemplate(h) {
      return h(
        'div',
        {
          staticClass: 'tooltip b-tooltip',
          class: this.templateClasses,
          attrs: this.templateAttributes,
          on: this.templateListeners
        },
        [
          h('div', { ref: 'arrow',staticClass: 'arrow' }),
          h('div', { staticClass: 'tooltip-inner' }, [
            isFunction(this.title) ? [this.title({})] : this.title || [h()]
          ])
        ]
      )
    }
  }
})
