import Vue from './vue'
import { BVPopper } from './bv-popper'
import { isFunction, isUndefinedOrNull } from './inspect'

const NAME = 'BVTooltipTemplate'

// @vue/component
export const BVTooltipTemplate = /*#__PURE__*/ Vue.extend({
  name: NAME,
  extends: BVPopper,
  props: {
    // Other non-reactive (while open) props are pulled in from BVPopper
    id: {
      type: String,
      default: null
    }
  },
  data() {
    // We use data, rather than props to ensure reactivity
    // Parent component will directly set this data
    return {
      title: '',
      content: '',
      variant: null,
      customClass: null
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
      // title can be a scoped slot function
      const $title = isFunction(this.title)
        ? this.title({})
        : isUndefinedOrNull(this.title)
          ? h()
          : this.title

      return h(
        'div',
        {
          staticClass: 'tooltip b-tooltip',
          class: this.templateClasses,
          attrs: this.templateAttributes,
          on: this.templateListeners
        },
        [
          h('div', { ref: 'arrow', staticClass: 'arrow' }),
          h('div', { staticClass: 'tooltip-inner' }, [$title])
        ]
      )
    }
  }
})
