// Utils
import memoize from '../../utils/memoize'
import upperFirst from '../../utils/upper-first'
import warn from '../../utils/warn'
import { arrayIncludes } from '../../utils/array'
import { getBreakpointsUpCached } from '../../utils/config'
import { select, selectAll, isVisible, setAttr, removeAttr, getAttr } from '../../utils/dom'
import { isBrowser } from '../../utils/env'
import { isBoolean } from '../../utils/inspect'
import { keys, create } from '../../utils/object'
// Mixins
import formStateMixin from '../../mixins/form-state'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'
// Sub components
import BCol from '../layout/col'
import BFormInvalidFeedback from '../form/form-invalid-feedback'
import BFormRow from '../layout/form-row'
import BFormText from '../form/form-text'
import BFormValidFeedback from '../form/form-valid-feedback'

// Component name
const NAME = 'BFormGroup'

// Selector for finding first input in the form-group
const SELECTOR = 'input:not([disabled]),textarea:not([disabled]),select:not([disabled])'

const DEPRECATED_MSG =
  'Props "horizontal" and "breakpoint" are deprecated. Use "label-cols(-{breakpoint})" props instead.'

// Render helper functions (here rather than polluting the instance with more methods)
const renderInvalidFeedback = (h, ctx) => {
  let content = ctx.normalizeSlot('invalid-feedback') || ctx.invalidFeedback
  let invalidFeedback = h(false)
  if (content) {
    invalidFeedback = h(
      BFormInvalidFeedback,
      {
        props: {
          id: ctx.invalidFeedbackId,
          // If state is explicitly false, always show the feedback
          state: ctx.computedState,
          tooltip: ctx.tooltip,
          ariaLive: ctx.feedbackAriaLive,
          role: ctx.feedbackAriaLive ? 'alert' : null
        },
        attrs: { tabindex: content ? '-1' : null }
      },
      [content]
    )
  }
  return invalidFeedback
}

const renderValidFeedback = (h, ctx) => {
  const content = ctx.normalizeSlot('valid-feedback') || ctx.validFeedback
  let validFeedback = h(false)
  if (content) {
    validFeedback = h(
      BFormValidFeedback,
      {
        props: {
          id: ctx.validFeedbackId,
          // If state is explicitly true, always show the feedback
          state: ctx.computedState,
          tooltip: ctx.tooltip,
          ariaLive: ctx.feedbackAriaLive,
          role: ctx.feedbackAriaLive ? 'alert' : null
        },
        attrs: { tabindex: content ? '-1' : null }
      },
      [content]
    )
  }
  return validFeedback
}

const renderHelpText = (h, ctx) => {
  // Form help text (description)
  const content = ctx.normalizeSlot('description') || ctx.description
  let description = h(false)
  if (content) {
    description = h(
      BFormText,
      {
        attrs: {
          id: ctx.descriptionId,
          tabindex: content ? '-1' : null
        }
      },
      [content]
    )
  }
  return description
}

const renderLabel = (h, ctx) => {
  // Render label/legend inside b-col if necessary
  const content = ctx.normalizeSlot('label') || ctx.label
  const labelFor = ctx.labelFor
  const isLegend = !labelFor
  const isHorizontal = ctx.isHorizontal
  const labelTag = isLegend ? 'legend' : 'label'
  if (!content && !isHorizontal) {
    return h(false)
  } else if (ctx.labelSrOnly) {
    let label = h(false)
    if (content) {
      label = h(
        labelTag,
        {
          class: 'sr-only',
          attrs: { id: ctx.labelId, for: labelFor || null }
        },
        [content]
      )
    }
    return h(isHorizontal ? BCol : 'div', { props: isHorizontal ? ctx.labelColProps : {} }, [label])
  } else {
    return h(
      isHorizontal ? BCol : labelTag,
      {
        on: isLegend ? { click: ctx.legendClick } : {},
        props: isHorizontal ? { tag: labelTag, ...ctx.labelColProps } : {},
        attrs: {
          id: ctx.labelId,
          for: labelFor || null,
          // We add a tab index to legend so that screen readers
          // will properly read the aria-labelledby in IE.
          tabindex: isLegend ? '-1' : null
        },
        class: [
          // When horizontal or if a legend is rendered, add col-form-label
          // for correct sizing as Bootstrap has inconsistent font styling
          // for legend in non-horizontal form-groups.
          // See: https://github.com/twbs/bootstrap/issues/27805
          isHorizontal || isLegend ? 'col-form-label' : '',
          // Emulate label padding top of 0 on legend when not horizontal
          !isHorizontal && isLegend ? 'pt-0' : '',
          // If not horizontal and not a legend, we add d-block to label
          // so that label-align works
          !isHorizontal && !isLegend ? 'd-block' : '',
          ctx.labelSize ? `col-form-label-${ctx.labelSize}` : '',
          ctx.labelAlignClasses,
          ctx.labelClass
        ]
      },
      [content]
    )
  }
}

// -- BFormGroup Prop factory -- used for lazy generation of props

// Memoize this function to return cached values to
// save time in computed functions
const makePropName = memoize((breakpoint = '', prefix) => {
  return `${prefix}${upperFirst(breakpoint)}`
})

// BFormgroup prop generator for lazy generation of props
const generateProps = () => {
  const BREAKPOINTS = getBreakpointsUpCached()

  // Generate the labelCol breakpoint props
  const bpLabelColProps = BREAKPOINTS.reduce((props, breakpoint) => {
    // i.e. label-cols, label-cols-sm, label-cols-md, ...
    props[makePropName(breakpoint, 'labelCols')] = {
      type: [Number, String, Boolean],
      default: breakpoint ? false : null
    }
    return props
  }, create(null))

  // Generate the labelAlign breakpoint props
  const bpLabelAlignProps = BREAKPOINTS.reduce((props, breakpoint) => {
    // label-align, label-align-sm, label-align-md, ...
    props[makePropName(breakpoint, 'labelAlign')] = {
      type: String, // left, right, center
      default: null
    }
    return props
  }, create(null))

  return {
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
    // label-cols prop and all label-cols-{bp} props
    ...bpLabelColProps,
    // label-align prop and all label-align-{bp} props
    ...bpLabelAlignProps,
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
    feedbackAriaLive: {
      type: String,
      default: 'assertive'
    },
    validated: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    horizontal: {
      // Deprecated
      type: Boolean,
      default: false,
      deprecated: DEPRECATED_MSG
    },
    breakpoint: {
      // Deprecated (ignored if horizontal is not true)
      type: String,
      default: null, // legacy value 'sm',
      deprecated: DEPRECATED_MSG
    }
  }
}

// We do not use Vue.extend here as that would evaluate the props
// immediately, which we do not want to happen
// @vue/component
export default {
  name: NAME,
  mixins: [idMixin, formStateMixin, normalizeSlotMixin],
  get props() {
    // Allow props to be lazy evaled on first access and
    // then they become a non-getter afterwards.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#Smart_self-overwriting_lazy_getters
    delete this.props
    // eslint-disable-next-line no-return-assign
    return (this.props = generateProps())
  },
  computed: {
    labelColProps() {
      const props = {}
      /* istanbul ignore next: deprecated */
      if (this.horizontal) {
        // Deprecated setting of horizontal/breakpoint props
        /* istanbul ignore next */
        warn(`b-form-group: ${DEPRECATED_MSG}`)
        // Legacy default is breakpoint sm and cols 3
        const bp = this.breakpoint || getBreakpointsUpCached()[1] // 'sm'
        const cols = parseInt(this.labelCols, 10) || 3
        props[bp] = cols > 0 ? cols : 3
        // We then return the single breakpoint prop for legacy compatibility
        return props
      }
      getBreakpointsUpCached().forEach(breakpoint => {
        // Grab the value if the label column breakpoint prop
        let propVal = this[makePropName(breakpoint, 'labelCols')]
        // Handle case where the prop's value is an empty string,
        // which represents true
        propVal = propVal === '' ? true : propVal || false
        if (!isBoolean(propVal)) {
          // Convert to column size to number
          propVal = parseInt(propVal, 10) || 0
          // Ensure column size is greater than 0
          propVal = propVal > 0 ? propVal : false
        }
        if (propVal) {
          // Add the prop to the list of props to give to b-col
          // If breakpoint is '' (labelCols=true), then we use the
          // col prop to make equal width at xs
          const bColPropName = breakpoint || (isBoolean(propVal) ? 'col' : 'cols')
          // Add it to the props
          props[bColPropName] = propVal
        }
      })
      return props
    },
    labelAlignClasses() {
      const classes = []
      getBreakpointsUpCached().forEach(breakpoint => {
        // Assemble the label column breakpoint align classes
        const propVal = this[makePropName(breakpoint, 'labelAlign')] || null
        if (propVal) {
          const className = breakpoint ? `text-${breakpoint}-${propVal}` : `text-${propVal}`
          classes.push(className)
        }
      })
      return classes
    },
    isHorizontal() {
      // Determine if the resultant form-group will be rendered
      // horizontal (meaning it has label-col breakpoints)
      return keys(this.labelColProps).length > 0
    },
    labelId() {
      return this.$slots['label'] || this.label ? this.safeId('_BV_label_') : null
    },
    descriptionId() {
      return this.$slots['description'] || this.description ? this.safeId('_BV_description_') : null
    },
    hasInvalidFeedback() {
      // Used for computing aria-describedby
      const $slots = this.$slots
      return this.computedState === false && ($slots['invalid-feedback'] || this.invalidFeedback)
    },
    invalidFeedbackId() {
      return this.hasInvalidFeedback ? this.safeId('_BV_feedback_invalid_') : null
    },
    hasValidFeedback() {
      // Used for computing aria-describedby
      return this.computedState === true && (this.$slots['valid-feedback'] || this.validFeedback)
    },
    validFeedbackId() {
      return this.hasValidFeedback ? this.safeId('_BV_feedback_valid_') : null
    },
    describedByIds() {
      // Screen readers will read out any content linked to by aria-describedby
      // even if the content is hidden with `display: none;`, hence we only include
      // feedback IDs if the form-group's state is explicitly valid or invalid.
      return (
        [this.descriptionId, this.invalidFeedbackId, this.validFeedbackId]
          .filter(Boolean)
          .join(' ') || null
      )
    }
  },
  watch: {
    describedByIds(add, remove) {
      if (add !== remove) {
        this.setInputDescribedBy(add, remove)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      // Set the aria-describedby IDs on the input specified by label-for
      // We do this in a nextTick to ensure the children have finished rendering
      this.setInputDescribedBy(this.describedByIds)
    })
  },
  methods: {
    legendClick(evt) {
      if (this.labelFor) {
        // Don't do anything if labelFor is set
        /* istanbul ignore next: clicking a label will focus the input, so no need to test */
        return
      }
      const tagName = evt.target ? evt.target.tagName : ''
      if (/^(input|select|textarea|label|button|a)$/i.test(tagName)) {
        // If clicked an interactive element inside legend,
        // we just let the default happen
        /* istanbul ignore next */
        return
      }
      const inputs = selectAll(SELECTOR, this.$refs.content).filter(isVisible)
      if (inputs && inputs.length === 1 && inputs[0].focus) {
        // if only a single input, focus it, emulating label behaviour
        inputs[0].focus()
      }
    },
    setInputDescribedBy(add, remove) {
      // Sets the `aria-describedby` attribute on the input if label-for is set.
      // Optionally accepts a string of IDs to remove as the second parameter.
      // Preserves any aria-describedby value(s) user may have on input.
      if (this.labelFor && isBrowser) {
        const input = select(`#${this.labelFor}`, this.$refs.content)
        if (input) {
          const adb = 'aria-describedby'
          let ids = (getAttr(input, adb) || '').split(/\s+/)
          add = (add || '').split(/\s+/)
          remove = (remove || '').split(/\s+/)
          // Update ID list, preserving any original IDs
          // and ensuring the ID's are unique
          ids = ids
            .filter(id => !arrayIncludes(remove, id))
            .concat(add)
            .filter(Boolean)
          ids = keys(ids.reduce((memo, id) => ({ ...memo, [id]: true }), {}))
            .join(' ')
            .trim()
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
  render(h) {
    const isFieldset = !this.labelFor
    const isHorizontal = this.isHorizontal
    // Generate the label
    const label = renderLabel(h, this)
    // Generate the content
    const content = h(
      isHorizontal ? BCol : 'div',
      {
        ref: 'content',
        attrs: {
          tabindex: isFieldset ? '-1' : null,
          role: isFieldset ? 'group' : null
        }
      },
      [
        this.normalizeSlot('default') || h(false),
        renderInvalidFeedback(h, this),
        renderValidFeedback(h, this),
        renderHelpText(h, this)
      ]
    )
    // Create the form-group
    const data = {
      staticClass: 'form-group',
      class: [this.validated ? 'was-validated' : null, this.stateClass],
      attrs: {
        id: this.safeId(),
        disabled: isFieldset ? this.disabled : null,
        role: isFieldset ? null : 'group',
        'aria-invalid': this.computedState === false ? 'true' : null,
        // Only apply aria-labelledby if we are a horizontal fieldset
        // as the legend is no longer a direct child of fieldset
        'aria-labelledby': isFieldset && isHorizontal ? this.labelId : null,
        // Only apply aria-describedby IDs if we are a fieldset
        // as the input will have the IDs when not a fieldset
        'aria-describedby': isFieldset ? this.describedByIds : null
      }
    }
    // Return it wrapped in a form-group
    // Note: Fieldsets do not support adding `row` or `form-row` directly
    // to them due to browser specific render issues, so we move the `form-row`
    // to an inner wrapper div when horizontal and using a fieldset
    return h(
      isFieldset ? 'fieldset' : isHorizontal ? BFormRow : 'div',
      data,
      isHorizontal && isFieldset ? [h(BFormRow, {}, [label, content])] : [label, content]
    )
  }
}
