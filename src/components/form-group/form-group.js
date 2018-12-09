// Mixins
import idMixin from '../../mixins/id'
import formStateMixin from '../../mixins/form-state'
// Utils
import upperFirst from '../../utils/upper-first'
import memoize from '../../utils/memoize'
import { select, selectAll, isVisible, setAttr, removeAttr, getAttr } from '../../utils/dom'
import { arrayIncludes } from '../../utils/array'
import { keys, create } from '../../utils/object'
// Sub components
import bFormRow from '../layout/form-row'
import bCol from '../layout/col'
import bFormText from '../form/form-text'
import bFormInvalidFeedback from '../form/form-invalid-feedback'
import bFormValidFeedback from '../form/form-valid-feedback'

// Selector for finding first input in the form-group
const SELECTOR = 'input:not(:disabled),textarea:not(:disabled),select:not(:disabled)'

// Breakpoint names for label-cols and label-align props
const BREAKPOINTS = ['', 'sm', 'md', 'lg', 'xl']

// Memoize this function to return cached values to save time in computed functions
const makePropName = memoize((bp = '', prefix) => {
  return `${prefix}${upperFirst(bp)}`
})

// Generate the labelCol breakpoint props
const bpLabelColProps = BREAKPOINTS.reduce((props, bp) => {
  // label-cols, label-cols-sm, label-cols-md, ...
  props[makePropName(bp, 'labelCols')] = {
    type: bp === '' ? [Number, String] : [Boolean, Number, String],
    default: null
  }
  return props
}, create(null))

// Generate the labelAlign breakpoint props
const bpLabelAlignProps = BREAKPOINTS.reduce((props, bp) => {
  // label-align, label-align-sm, label-align-md, ...
  props[makePropName(bp, 'labelAlign')] = {
    type: String,
    default: null
  }
  return props
}, create(null))

// render helper functions (here rather than polluting the instance with more methods)
function renderInvalidFeedback (h, ctx) {
  let content = ctx.$slots['invalid-feedback'] || ctx.invalidFeedback
  let invalidFeedback = h(false)
  if (content) {
    invalidFeedback = h(
      'b-form-invalid-feedback',
      {
        props: {
          id: ctx.invalidFeedbackId,
          // If state is explicitly false, always show the feedback
          forceShow: ctx.computedState === false,
          tooltip: ctx.tooltip
        },
        attrs: {
          tabindex: content ? '-1' : null,
          role: 'alert',
          'aria-live': 'assertive',
          'aria-atomic': 'true'
        }
      },
      [content]
    )
  }
  return invalidFeedback
}

function renderValidFeedback (h, ctx) {
  const content = ctx.$slots['valid-feedback'] || ctx.validFeedback
  let validFeedback = h(false)
  if (content) {
    validFeedback = h(
      'b-form-valid-feedback',
      {
        props: {
          id: ctx.validFeedbackId,
          // If state is explicitly true, always show the feedback
          forceShow: ctx.computedState === true,
          tooltip: ctx.tooltip
        },
        attrs: {
          tabindex: '-1',
          role: 'alert',
          'aria-live': 'assertive',
          'aria-atomic': 'true'
        }
      },
      [content]
    )
  }
  return validFeedback
}

function renderHelpText (h, ctx) {
  // Form help text (description)
  const content = ctx.$slots['description'] || ctx.description
  let description = h(false)
  if (content) {
    description = h(
      'b-form-text',
      {
        attrs: {
          id: ctx.descriptionId,
          tabindex: '-1'
        }
      },
      [content]
    )
  }
  return description
}

function renderLabel (h, ctx) {
  // render label/legend
  const content = ctx.$slots['label'] || ctx.label
  let label = h(false)
  if (content) {
    const labelFor = ctx.labelFor
    const isLegend = !labelFor
    const isHorizontal = ctx.isHorizontal
    const isSrOnly = ctx.labelSrOnly
    const on = {}
    if (isLegend && !isSrOnly) {
      // Add the legend click handler
      on.click = ctx.legendClick
    }
    label = h(
      isLegend ? 'legend' : 'label',
      {
        on,
        attrs: {
          id: ctx.labelId,
          for: labelFor || null,
          // We add a tab index to legend so that screen readers will
          // properly read the aria-labelledby in IE.
          tabindex: isLegend ? '-1' : null
        },
        class: [
          // when horizontal or a legend is rendered add col-form-label for correct sizing
          isHorizontal || isLegend ? 'col-form-label' : '',
          // Emulate label padding top of 0 on legend when not horizontal
          !isHorizontal && isLegend ? 'pt-0' : '',
          isSrOnly ? 'sr-only' : '',
          ctx.size ? `col-form-label-${ctx.size}` : '',
          ctx.labelAlignClasses,
          ctx.labelClass
        ]
      },
      [ content ]
    )
  }
  return label
}

// bFormGroup
export default {
  mixins: [
    idMixin,
    formStateMixin
  ],
  components: {
    bFormRow,
    bCol,
    bFormInvalidFeedback,
    bFormValidFeedback,
    bFormText
  },
  render (h) {
    const isFieldset = !this.labelFor
    const isHorizontal = this.isHorizontal
    // Generate the label col
    const label = h(
      isHorizontal ? 'b-col' : 'div',
      { props: this.labelColProps },
      [ renderLabel(h, this) ]
    )
    // Generate the content col
    const content = h(
      isHorizontal ? 'b-col' : 'div',
      {
        ref: 'content',
        attrs: {
          tabindex: isFieldset ? '-1' : null,
          role: isFieldset ? 'group' : null,
          'aria-labelledby': isFieldset ? this.labelId : null,
          'aria-describedby': isFieldset ? this.ariaDescribedBy : null
        }
      },
      [
        this.$slots['default'] || h(false),
        renderInvalidFeedback(h, this),
        renderValidFeedback(h, this),
        renderHelpText(h, this)
      ]
    )
    // Create the form-group
    const data = {
      staticClass: 'form-group b-form-group',
      class: [
        this.validated ? 'was-validated' : null,
        this.stateClass // from form-state mixin
      ],
      attrs: {
        id: this.safeId(),
        disabled: isFieldset ? this.disabled : null,
        role: isFieldset ? null : 'group',
        'aria-invalid': this.computedState === false ? 'true' : null,
        'aria-labelledby': this.labelId || null,
        'aria-describedby': this.ariaDescribedBy || null
      }
    }
    // Return it wrapped in a form-group.
    // Note: fieldsets do not support adding `row` or `form-row` directly to them
    // due to browser specific render issues, so we move the form-row to an
    // inner wrapper div when horizontal
    return h(
      isFieldset ? 'fieldset' : (isHorizontal ? 'b-form-row' : 'div'),
      data,
      isHorizontal && isFieldset ? [h('b-form-row', {}, [label, content])] : [label, content]
    )
  },
  props: {
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
      type: [String, Array, Object],
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
    validFeedback: {
      type: String,
      default: null
    },
    tooltip: {
      // Enable tooltip style feedback
      type: Boolean,
      default: false
    },
    validated: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // label-cols prop and all label-cols-{bp} props
    ...bpLabelColProps,
    // label-align prop and all label-align-{bp} props
    ...bpLabelAlignProps,
    horizontal: {
      // Deprecated
      type: Boolean,
      default: false
    },
    breakpoint: {
      // Deprecated
      type: String,
      default: null // legacy value 'sm'
    }
  },
  computed: {
    labelColProps () {
      const props = {}
      if (this.horizontal) {
        // Deprecated setting of horizontal prop
        // Legacy default is breakpoint sm and cols 3
        const bp = this.breakpoint || 'sm'
        const cols = parseInt(this.labelCols, 10) || 3
        props[bp] = cols > 0 ? cols : 3
      }
      BREAKPOINTS.forEach(bp => {
        // Assemble the label column breakpoint props
        let propVal = this[makePropName(bp, 'labelCols')]
        propVal = propVal === '' ? Boolean(bp) : (propVal || false)
        if (typeof propVal !== 'boolean') {
          // Convert to column size
          propVal = parseInt(propVal, 10) || 0
          // Ensure column size is greater than 0
          propVal = propVal > 0 ? propVal : false
        }
        if (propVal) {
          props[bp || 'cols'] = propVal
        }
      })
      return props
    },
    labelAlignClasses () {
      const classes = []
      BREAKPOINTS.forEach(bp => {
        // assemble the label column breakpoint align classes
        const propVal = this[makePropName(bp, 'labelAlign')] || null
        if (propVal) {
          const className = bp ? `text-${bp}-${propVal}` : `text-${propVal}`
          classes.push(className)
        }
      })
      return classes
    },
    isHorizontal () {
      // Determine if the resultant form-group will be rendered
      // horizontal (meaning it has label-col breakpoints)
      return keys(this.labelColProps).length > 0
    },
    labelId () {
      return (this.$slots['label'] || this.label) ? this.safeId('_BV_label_') : null
    },
    descriptionId () {
      return (this.$slots['description'] || this.description) ? this.safeId('_BV_description_') : null
    },
    hasInvalidFeedback () {
      // used for computing aria-describedby
      const $slots = this.$slots
      return this.computedState === false && ($slots['invalid-feedback'] || this.invalidFeedback)
    },
    invalidFeedbackId () {
      return this.hasInvalidFeedback ? this.safeId('_BV_feedback_invalid_') : null
    },
    hasValidFeedback () {
      // used for computing aria-describedby
      return this.computedState === true && (this.$slots['valid-feedback'] || this.validFeedback)
    },
    validFeedbackId () {
      return this.hasValidFeedback ? this.safeId('_BV_feedback_valid_') : null
    },
    describedByIds () {
      // Screen readers will read out any content linked to by aria-describedby
      // even if the content is hidden with 'display: none', hence we only include
      // feedback IDs if the form-group's state is explicitly valid or invalid.
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
      if (this.labelFor) {
        // don't do anything if labelFor is set
        return
      }
      const tagName = evt.target ? evt.target.tagName : ''
      if (/^(input|select|textarea|label|button|a)$/i.test(tagName)) {
        // If clicked an interactive element inside legend, we just let the default happen
        return
      }
      const inputs = selectAll(SELECTOR, this.$refs.content).filter(isVisible)
      if (inputs && inputs.length === 1 && inputs[0].focus) {
        // if only a single input, focus it
        inputs[0].focus()
      } else {
        // Focus the content group
        if (this.$refs.content && this.$refs.content.focus) {
          this.$refs.content.focus()
        }
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
          ids = ids.filter(id => !arrayIncludes(remove, id)).concat(add || '').join(' ').trim()
          if (ids) {
            setAttr(input, adb, ids)
          } else {
            // No IDs, so remove the attribute
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
