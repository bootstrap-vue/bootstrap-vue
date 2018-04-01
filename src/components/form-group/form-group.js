import warn from '../../utils/warn'
import { select, selectAll, isVisible, setAttr, removeAttr, getAttr } from '../../utils/dom'
import idMixin from '../../mixins/id'
import formStateMixin from '../../mixins/form-state'
import bFormRow from '../layout/form-row'
import bFormText from '../form/form-text'
import bFormInvalidFeedback from '../form/form-invalid-feedback'
import bFormValidFeedback from '../form/form-valid-feedback'

// Selector for finding firt input in the form-group
const SELECTOR = 'input:not(:disabled),textarea:not(:disabled),select:not(:disabled)'

export default {
  mixins: [ idMixin, formStateMixin ],
  components: { bFormRow, bFormText, bFormInvalidFeedback, bFormValidFeedback },
  render (h) {
    const $slots = this.$slots

    // Label / Legend
    let legend = h(false)
    if (this.hasLabel) {
      let children = $slots['label']
      const legendTag = this.labelFor ? 'label' : 'legend'
      const legendDomProps = children ? {} : { innerHTML: this.label }
      const legendAttrs = { id: this.labelId, for: this.labelFor || null }
      const legendClick = (this.labelFor || this.labelSrOnly) ? {} : { click: this.legendClick }
      if (this.horizontal) {
        // Horizontal layout with label
        if (this.labelSrOnly) {
          // SR Only we wrap label/legend in a div to preserve layout
          children = h(
            legendTag,
            { class: [ 'sr-only' ], attrs: legendAttrs, domProps: legendDomProps },
            children
          )
          legend = h('div', { class: this.labelLayoutClasses }, [ children ])
        } else {
          legend = h(
            legendTag,
            {
              class: [ this.labelLayoutClasses, this.labelClasses ],
              attrs: legendAttrs,
              domProps: legendDomProps,
              on: legendClick
            },
            children
          )
        }
      } else {
        // Vertical layout with label
        legend = h(
          legendTag,
          {
            class: this.labelSrOnly ? [ 'sr-only' ] : this.labelClasses,
            attrs: legendAttrs,
            domProps: legendDomProps,
            on: legendClick
          },
          children
        )
      }
    } else if (this.horizontal) {
      // No label but has horizontal layout, so we need a spacer element for layout
      legend = h('div', { class: this.labelLayoutClasses })
    }

    // Invalid feeback text (explicitly hidden if state is valid)
    let invalidFeedback = h(false)
    if (this.hasInvalidFeedback) {
      let domProps = {}
      if (!$slots['invalid-feedback'] && !$slots['feedback']) {
        domProps = { innerHTML: this.invalidFeedback || this.feedback || '' }
      }
      invalidFeedback = h(
        'b-form-invalid-feedback',
        {
          props: {
            id: this.invalidFeedbackId,
            forceShow: this.computedState === false
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
    if (this.hasValidFeedback) {
      const domProps = $slots['valid-feedback'] ? {} : { innerHTML: this.validFeedback || '' }
      validFeedback = h(
        'b-form-valid-feedback',
        {
          props: {
            id: this.validFeedbackId,
            forceShow: this.computedState === true
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
    if (this.hasDescription) {
      const domProps = $slots['description'] ? {} : { innerHTML: this.description || '' }
      description = h(
        'b-form-text',
        { attrs: { id: this.descriptionId }, domProps: domProps },
        $slots['description']
      )
    }

    // Build content layout
    const content = h(
      'div',
      {
        ref: 'content',
        class: this.inputLayoutClasses,
        attrs: this.labelFor ? {} : { role: 'group', 'aria-labelledby': this.labelId }
      },
      [ $slots['default'], invalidFeedback, validFeedback, description ]
    )

    // Generate main form-group wrapper
    return h(
      this.labelFor ? 'div' : 'fieldset',
      {
        class: this.groupClasses,
        attrs: {
          id: this.safeId(),
          disabled: this.disabled,
          role: 'group',
          'aria-invalid': this.computedState === false ? 'true' : null,
          'aria-labelledby': this.labelId,
          'aria-describedby': this.labelFor ? null : this.describedByIds
        }
      },
      this.horizontal ? [ h('b-form-row', {}, [ legend, content ]) ] : [ legend, content ]
    )
  },
  props: {
    horizontal: {
      type: Boolean,
      default: false
    },
    labelCols: {
      type: [Number, String],
      default: 3,
      validator (value) {
        if (Number(value) >= 1 && Number(value) <= 11) {
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
    validated: {
      type: Boolean,
      default: false
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
        'col-form-label',
        this.labelSize ? `col-form-label-${this.labelSize}` : null,
        this.labelTextAlign ? `text-${this.labelTextAlign}` : null,
        this.horizontal ? null : 'pt-0',
        this.labelClass
      ]
    },
    labelLayoutClasses () {
      return [
        this.horizontal ? `col-${this.breakpoint}-${this.labelCols}` : null
      ]
    },
    inputLayoutClasses () {
      return [
        this.horizontal ? `col-${this.breakpoint}-${12 - Number(this.labelCols)}` : null
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
  watch: {
    describedByIds (add, remove) {
      if (add !== remove) {
        this.setInputDescribedBy(add, remove)
      }
    }
  },
  methods: {
    legendClick (evt) {
      const tagName = evt.target ? evt.target.tagName : ''
      if (/^(input|select|textarea|label)$/i.test(tagName)) {
        // If clicked an input inside legend, we just let the default happen
        return
      }
      // Focus the first non-disabled visible input when the legend element is clicked
      const inputs = selectAll(SELECTOR, this.$refs.content).filter(isVisible)
      if (inputs[0] && inputs[0].focus) {
        inputs[0].focus()
      }
    },
    setInputDescribedBy (add, remove) {
      // Sets the `aria-describedby` attribute on the input if label-for is set.
      // Optionally accepts a string of IDs to remove as the second parameter
      if (this.labelFor && typeof document !== 'undefined') {
        const input = select(`#${this.labelFor}`, this.$refs.content)
        if (input) {
          const adb = 'aria-describedby'
          let ids = (getAttr(input, adb) || '').split(/\s+/)
          remove = (remove || '').split(/\s+/)
          // Update ID list, preserving any original IDs
          ids = ids.filter(id => remove.indexOf(id) === -1).concat(add || '').join(' ').trim()
          if (ids) {
            setAttr(input, adb, ids)
          } else {
            removeAttr(input, adb)
          }
        }
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      // Set the adia-describedby IDs on the input specified by label-for
      // We do this in a nextTick to ensure the children have finished rendering
      this.setInputDescribedBy(this.describedByIds)
    })
  }
}
