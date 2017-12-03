import { warn } from '../../utils'
import { selectAll, isVisible } from '../../utils/dom'
import { idMixin, formStateMixin } from '../../mixins'
import bFormRow from '../layout/form-row'
import bFormText from '../form/form-text'
import bFormInvalidFeedback from '../form/form-invalid-feedback'
import bFormValidFeedback from '../form/form-valid-feedback'

const SELECTOR = 'input:not(:disabled),textarea:not(:disabled),select:not(:disabled)'

export default {
  mixins: [idMixin, formStateMixin],
  components: { bFormRow, bFormText, bFormInvalidFeedback, bFormValidFeedback },
  render (h) {
    const t = this
    const $slots = t.$slots
    // Label
    let legend = h(false)
    if (t.hasLabel || t.horizontal) {
      // In horizontal mode, if there is no label, we still need to offset the input
      const tag = t.hasLabel ? (t.labelFor ? 'label' : 'legend') : 'div'
      const domProps = $slots.label ? {} : { innerHTML: t.label || '' }
      let children = $slots.label
      if (t.horizontal && t.labelSrOnly) {
        children = [ h('span', { class: 'sr-only', domProps: domProps }, children) ]
      }
      legend = h(
        tag,
        {
          class: t.labelClasses,
          attrs: { id: t.labelId, for: t.labelFor || null },
          domProps: t.labelSrOnly ? {} : domProps,
          on: t.labelFor ? {} : { click: t.legendClick }
        },
        children
      )
    }
    // Invalid feeback text (explicitly hidden if state is valid)
    let invalidFeedback = h(false)
    if (t.hasInvalidFeedback) {
      let domProps = {}
      if (!$slots['invalid-feedback'] && !$slots['feedback']) {
        domProps = { innerHTML: t.invalidFeedback || t.feedback || '' }
      }
      invalidFeedback = h(
        'b-form-invalid-feedback',
        {
          props: {
            id: t.invalidFeedbackId,
            forceShow: t.computedState === false
          },
          attrs: {
            role: 'alert',
            'aria-live': 'assertive',
            'aria-atomic': 'true'
          },
          domProps: domProps
        },
        $slots['invalid-feedback'] || $slots['feedback']
      )
    }
    // Valid feeback text (explicitly hidden if state is invalid)
    let validFeedback = h(false)
    if (t.hasValidFeedback) {
      const domProps = $slots['valid-feedback'] ? {} : { innerHTML: t.validFeedback || '' }
      validFeedback = h(
        'b-form-valid-feedback',
        {
          props: {
            id: t.validFeedbackId,
            forceShow: t.computedState === true
          },
          attrs: {
            role: 'alert',
            'aria-live': 'assertive',
            'aria-atomic': 'true'
          },
          domProps: domProps
        },
        $slots['valid-feedback']
      )
    }
    // Form help text (description)
    let description = h(false)
    if (t.hasDescription) {
      const domProps = $slots['description'] ? {} : { innerHTML: t.description || '' }
      description = h(
        'b-form-text',
        { attrs: { id: t.descriptionId }, domProps: domProps },
        $slots['description']
      )
    }
    // Build layout
    const content = h(
      'div',
      { ref: 'content', class: t.inputLayoutClasses },
      [ $slots.default, invalidFeedback, validFeedback, description ]
    )
    // Generate fieldset wrapper
    return h(
      'fieldset',
      {
        class: t.groupClasses,
        attrs: {
          id: t.safeId(),
          disabled: t.disabled,
          'aria-disabled': t.disabled ? 'true' : null,
          'aria-invalid': t.computedState === false ? 'true' : null,
          'aria-labelledby': t.labelId,
          'aria-describedby': t.describedByIds
        }
      },
      [ h('b-form-row', {}, [ legend, content ]) ]
    )
  },
  props: {
    horizontal: {
      type: Boolean,
      default: false
    },
    labelCols: {
      type: Number,
      default: 3,
      validator (value) {
        if (value >= 1 && value <= 11) {
          return true
        }
        warn('b-form-group: label-cols must be a value between 1 and 11')
        return false
      }
    },
    breakpoint: {
      type: String,
      default: 'sm'
    },
    labelTextAlign: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    labelFor: {
      type: String,
      default: null
    },
    labelSize: {
      type: String,
      default: null
    },
    labelSrOnly: {
      type: Boolean,
      default: false
    },
    labelClass: {
      type: [String, Array],
      default: null
    },
    description: {
      type: String,
      default: null
    },
    invalidFeedback: {
      type: String,
      default: null
    },
    feedback: {
      // Deprecated in favor of invalid-feedback
      type: String,
      default: null
    },
    validFeedback: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    validated: {
      type: Boolean,
      value: false
    }
  },
  computed: {
    groupClasses () {
      return [
        'b-form-group',
        'form-group',
        this.validated ? 'was-validated' : null,
        this.stateClass
      ]
    },
    labelClasses () {
      return [
        // BS V4.beta.3 will replace .col-form-legend with .col-form-label
        // so this line will change to just: 'col-form-label',
        (this.labelSize || this.labelFor) ? 'col-form-label' : 'col-form-legend',
        this.labelSizeClass,
        (this.labelSrOnly && !this.horizontal) ? 'sr-only' : '',
        this.labelLayout,
        this.labelAlignClass,
        this.labelClass
      ]
    },
    labelLayout () {
      if (this.labelSrOnly) {
        return null
      }
      return this.horizontal ? `col-${this.breakpoint}-${this.labelCols}` : 'col-12'
    },
    labelAlignClass () {
      if (this.labelSrOnly) {
        return null
      }
      return this.labelTextAlign ? `text-${this.labelTextAlign}` : null
    },
    labelSizeClass () {
      if (this.labelSrOnly) {
        return null
      }
      return this.labelSize ? `col-form-label-${this.labelSize}` : null
    },
    inputLayoutClasses () {
      return [
        this.horizontal ? `col-${this.breakpoint}-${12 - this.labelCols}` : 'col-12'
      ]
    },
    hasLabel () {
      return this.label || this.$slots['label']
    },
    hasDescription () {
      return this.description || this.$slots['description']
    },
    hasInvalidFeedback () {
      if (this.computedState === true) {
        // If the form-group state is explicityly valid, we return false
        return false
      }
      return this.invalidFeedback || this.feedback || this.$slots['invalid-feedback'] || this.$slots['feedback']
    },
    hasValidFeedback () {
      if (this.computedState === false) {
        // If the form-group state is explicityly invalid, we return false
        return false
      }
      return this.validFeedback || this.$slots['valid-feedback']
    },
    labelId () {
      return this.hasLabel ? this.safeId('_BV_label_') : null
    },
    descriptionId () {
      return this.hasDescription ? this.safeId('_BV_description_') : null
    },
    invalidFeedbackId () {
      return this.hasInvalidFeedback ? this.safeId('_BV_feedback_invalid_') : null
    },
    validFeedbackId () {
      return this.hasValidFeedback ? this.safeId('_BV_feedback_valid_') : null
    },
    describedByIds () {
      return [
        this.descriptionId,
        this.invalidFeedbackId,
        this.validFeedbackId
      ].filter(i => i).join(' ') || null
    }
  },
  methods: {
    legendClick (evt) {
      // Focus the first non-disabled visible input when the legend element is clicked
      const inputs = selectAll(SELECTOR, this.$refs.content).filter(isVisible)
      if (inputs[0] && inputs[0].focus) {
        inputs[0].focus()
      }
    }
  }
}
