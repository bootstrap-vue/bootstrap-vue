import Vue from '../../../utils/vue'
import { isFunction, isUndefinedOrNull } from '../../../utils/inspect'
import { BVPopper } from './bv-popper'

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
    },
    html: {
      // Used only by the directive versions
      type: Boolean,
      default: false
    },
    scopeId: {
      // Used to pass teh parent's scoped style attribute
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
          // `attachment` will come from BVToolpop
          [`bs-${this.templateType}-${this.attachment}`]: this.attachment
        },
        this.customClass
      ]
    },
    templateAttributes() {
      const attrs = {
        id: this.id,
        role: 'tooltip',
        tabindex: '-1'
      }
      if (this.scopeId) {
        // Add the scoped style attribute if provided
        attrs[this.scopeId] = true
      }
      return attrs
    },
    templateListeners() {
      // Used for hover/focus trigger listeners
      return {
        mouseenter: evt => {
          /* istanbul ignore next: difficult to test in JSDOM */
          this.$emit('mouseenter', evt)
        },
        mouseleave: evt => {
          /* istanbul ignore next: difficult to test in JSDOM */
          this.$emit('mouseleave', evt)
        },
        focusin: evt => {
          /* istanbul ignore next: difficult to test in JSDOM */
          this.$emit('focusin', evt)
        },
        focusout: evt => {
          /* istanbul ignore next: difficult to test in JSDOM */
          this.$emit('focusout', evt)
        }
      }
    }
  },
  methods: {
    renderTemplate(h) {
      // Title can be a scoped slot function
      const $title = isFunction(this.title)
        ? this.title({})
        : isUndefinedOrNull(this.title)
          ? h()
          : this.title

      // Directive versions only
      const domProps = this.html && !isFunction(this.title) ? { innerHTML: this.title } : {}

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
          h('div', { staticClass: 'tooltip-inner', domProps }, [$title])
        ]
      )
    }
  }
})
