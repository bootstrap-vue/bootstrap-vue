import Vue from '../../../utils/vue'
import scopedStyleAttrsMixin from '../../../mixins/scoped-style-attrs'
import { isFunction, isUndefinedOrNull } from '../../../utils/inspect'
import { BVPopper } from './bv-popper'

const NAME = 'BVTooltipTemplate'

// @vue/component
export const BVTooltipTemplate = /*#__PURE__*/ Vue.extend({
  name: NAME,
  extends: BVPopper,
  mixins: [scopedStyleAttrsMixin],
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
    }
  },
  data() {
    // We use data, rather than props to ensure reactivity
    // Parent component will directly set this data
    return {
      title: '',
      content: '',
      variant: null,
      customClass: null,
      interactive: true
    }
  },
  computed: {
    templateType() {
      return 'tooltip'
    },
    templateClasses() {
      return [
        {
          // Disables pointer events to hide the tooltip when the user
          // hovers over its content
          noninteractive: !this.interactive,
          [`b-${this.templateType}-${this.variant}`]: this.variant,
          // `attachment` will come from BVToolpop
          [`bs-${this.templateType}-${this.attachment}`]: this.attachment
        },
        this.customClass
      ]
    },
    templateAttributes() {
      return {
        id: this.id,
        role: 'tooltip',
        tabindex: '-1',
        // Add the scoped style data attribute to the template root element
        ...this.scopedStyleAttrs
      }
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
