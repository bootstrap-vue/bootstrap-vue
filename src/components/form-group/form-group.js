import { NAME_FORM_GROUP } from '../../constants/components'
import { SLOT_NAME_DESCRIPTION, SLOT_NAME_LABEL } from '../../constants/slot-names'
import cssEscape from '../../utils/css-escape'
import memoize from '../../utils/memoize'
import { arrayIncludes } from '../../utils/array'
import { getBreakpointsUpCached, makePropsConfigurable } from '../../utils/config'
import {
  select,
  selectAll,
  isVisible,
  setAttr,
  removeAttr,
  getAttr,
  attemptFocus
} from '../../utils/dom'
import { isBrowser } from '../../utils/env'
import { isBoolean } from '../../utils/inspect'
import { toInteger } from '../../utils/number'
import { keys, create } from '../../utils/object'
import { upperFirst } from '../../utils/string'
import formStateMixin, { props as formStateProps } from '../../mixins/form-state'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BCol } from '../layout/col'
import { BFormRow } from '../layout/form-row'
import { BFormText } from '../form/form-text'
import { BFormInvalidFeedback } from '../form/form-invalid-feedback'
import { BFormValidFeedback } from '../form/form-valid-feedback'

// --- Constants ---

// Selector for finding first input in the form-group
const INPUT_SELECTOR = 'input:not([disabled]),textarea:not([disabled]),select:not([disabled])'

// A list of interactive elements (tag names) inside `<b-form-group>`'s legend
const LEGEND_INTERACTIVE_ELEMENTS = ['input', 'select', 'textarea', 'label', 'button', 'a']

// -- BFormGroup prop factory -- used for lazy generation of props

// Memoize this function to return cached values to
// save time in computed functions
const makePropName = memoize((breakpoint = '', prefix = '') => `${prefix}${upperFirst(breakpoint)}`)

// BFormGroup prop generator for lazy generation of props
const generateProps = () => {
  const CODE_BREAKPOINTS = getBreakpointsUpCached()

  // Generate the `labelCol` breakpoint props
  const bpLabelColProps = CODE_BREAKPOINTS.reduce((props, breakpoint) => {
    // i.e. 'label-cols', 'label-cols-sm', 'label-cols-md', ...
    props[makePropName(breakpoint, 'labelCols')] = {
      type: [Number, String, Boolean],
      default: breakpoint ? false : null
    }
    return props
  }, create(null))

  // Generate the `labelAlign` breakpoint props
  const bpLabelAlignProps = CODE_BREAKPOINTS.reduce((props, breakpoint) => {
    // 'label-align', 'bel-align-sm', 'label-align-md', ...
    props[makePropName(breakpoint, 'labelAlign')] = {
      type: String // left, right, center
      // default: null
    }
    return props
  }, create(null))

  return makePropsConfigurable(
    {
      ...formStateProps,
      label: {
        type: String
        // default: null
      },
      labelFor: {
        type: String
        // default: null
      },
      labelSize: {
        type: String
        // default: null
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
        type: [String, Array, Object]
        // default: null
      },
      description: {
        type: String
        // default: null
      },
      invalidFeedback: {
        type: String
        // default: null
      },
      validFeedback: {
        type: String
        // default: null
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
      }
    },
    NAME_FORM_GROUP
  )
}

// We do not use Vue.extend here as that would evaluate the props
// immediately, which we do not want to happen
// @vue/component
export const BFormGroup = {
  name: NAME_FORM_GROUP,
  mixins: [idMixin, formStateMixin, normalizeSlotMixin],
  get props() {
    // Allow props to be lazy evaled on first access and
    // then they become a non-getter afterwards
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#Smart_self-overwriting_lazy_getters
    delete this.props
    // eslint-disable-next-line no-return-assign
    return (this.props = generateProps())
  },
  data() {
    return {
      describedByIds: ''
    }
  },
  computed: {
    labelColProps() {
      const props = {}
      getBreakpointsUpCached().forEach(breakpoint => {
        // Grab the value if the label column breakpoint prop
        let propVal = this[makePropName(breakpoint, 'labelCols')]
        // Handle case where the prop's value is an empty string,
        // which represents `true`
        propVal = propVal === '' ? true : propVal || false
        if (!isBoolean(propVal) && propVal !== 'auto') {
          // Convert to column size to number
          propVal = toInteger(propVal, 0)
          // Ensure column size is greater than `0`
          propVal = propVal > 0 ? propVal : false
        }
        if (propVal) {
          // Add the prop to the list of props to give to `<b-col>`
          // If breakpoint is '' (`labelCols` is `true`), then we use the
          // col prop to make equal width at 'xs'
          props[breakpoint || (isBoolean(propVal) ? 'col' : 'cols')] = propVal
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
    }
  },
  watch: {
    describedByIds(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.setInputDescribedBy(newValue, oldValue)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      // Set the `aria-describedby` IDs on the input specified by `label-for`
      // We do this in a `$nextTick()` to ensure the children have finished rendering
      this.setInputDescribedBy(this.describedByIds)
    })
  },
  methods: {
    legendClick(evt) {
      // Don't do anything if labelFor is set
      /* istanbul ignore next: clicking a label will focus the input, so no need to test */
      if (this.labelFor) {
        return
      }
      const { target } = evt
      const tagName = target ? target.tagName : ''
      // If clicked an interactive element inside legend,
      // we just let the default happen
      /* istanbul ignore next */
      if (LEGEND_INTERACTIVE_ELEMENTS.indexOf(tagName) !== -1) {
        return
      }
      const inputs = selectAll(INPUT_SELECTOR, this.$refs.content).filter(isVisible)
      // If only a single input, focus it, emulating label behaviour
      if (inputs && inputs.length === 1) {
        attemptFocus(inputs[0])
      }
    },
    // Sets the `aria-describedby` attribute on the input if label-for is set
    // Optionally accepts a string of IDs to remove as the second parameter
    // Preserves any `aria-describedby` value(s) user may have on input
    setInputDescribedBy(add, remove) {
      if (this.labelFor && isBrowser) {
        // We need to escape `labelFor` since it can be user-provided
        const input = select(`#${cssEscape(this.labelFor)}`, this.$refs.content)
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
    const {
      labelFor,
      tooltip,
      feedbackAriaLive,
      computedState: state,
      isHorizontal,
      normalizeSlot
    } = this
    const isFieldset = !labelFor

    let $label = h()
    const labelContent = normalizeSlot(SLOT_NAME_LABEL) || this.label
    const labelId = labelContent ? this.safeId('_BV_label_') : null
    if (labelContent || isHorizontal) {
      const { labelSize, labelColProps } = this
      const isLegend = isFieldset
      const labelTag = isLegend ? 'legend' : 'label'
      if (this.labelSrOnly) {
        if (labelContent) {
          $label = h(
            labelTag,
            {
              class: 'sr-only',
              attrs: { id: labelId, for: labelFor || null }
            },
            [labelContent]
          )
        }
        $label = h(isHorizontal ? BCol : 'div', { props: isHorizontal ? labelColProps : {} }, [
          $label
        ])
      } else {
        $label = h(
          isHorizontal ? BCol : labelTag,
          {
            on: isLegend ? { click: this.legendClick } : {},
            props: isHorizontal ? { tag: labelTag, ...labelColProps } : {},
            attrs: {
              id: labelId,
              for: labelFor || null,
              // We add a `tabindex` to legend so that screen readers
              // will properly read the `aria-labelledby` in IE
              tabindex: isLegend ? '-1' : null
            },
            class: [
              // Hide the focus ring on the legend
              isLegend ? 'bv-no-focus-ring' : '',
              // When horizontal or if a legend is rendered, add 'col-form-label' class
              // for correct sizing as Bootstrap has inconsistent font styling for
              // legend in non-horizontal form-groups
              // See: https://github.com/twbs/bootstrap/issues/27805
              isHorizontal || isLegend ? 'col-form-label' : '',
              // Emulate label padding top of `0` on legend when not horizontal
              !isHorizontal && isLegend ? 'pt-0' : '',
              // If not horizontal and not a legend, we add 'd-block' class to label
              // so that label-align works
              !isHorizontal && !isLegend ? 'd-block' : '',
              labelSize ? `col-form-label-${labelSize}` : '',
              this.labelAlignClasses,
              this.labelClass
            ]
          },
          [labelContent]
        )
      }
    }

    let $invalidFeedback = h()
    const invalidFeedbackContent = normalizeSlot('invalid-feedback') || this.invalidFeedback
    const invalidFeedbackId = invalidFeedbackContent ? this.safeId('_BV_feedback_invalid_') : null
    if (invalidFeedbackContent) {
      $invalidFeedback = h(
        BFormInvalidFeedback,
        {
          props: {
            id: invalidFeedbackId,
            // If state is explicitly `false`, always show the feedback
            state,
            tooltip,
            ariaLive: feedbackAriaLive,
            role: feedbackAriaLive ? 'alert' : null
          },
          attrs: { tabindex: invalidFeedbackContent ? '-1' : null }
        },
        [invalidFeedbackContent]
      )
    }

    let $validFeedback = h()
    const validFeedbackContent = normalizeSlot('valid-feedback') || this.validFeedback
    const validFeedbackId = validFeedbackContent ? this.safeId('_BV_feedback_valid_') : null
    if (validFeedbackContent) {
      $validFeedback = h(
        BFormValidFeedback,
        {
          props: {
            id: validFeedbackId,
            // If state is explicitly `true`, always show the feedback
            state,
            tooltip,
            ariaLive: feedbackAriaLive,
            role: feedbackAriaLive ? 'alert' : null
          },
          attrs: { tabindex: validFeedbackContent ? '-1' : null }
        },
        [validFeedbackContent]
      )
    }

    let $description = h()
    const descriptionContent = normalizeSlot(SLOT_NAME_DESCRIPTION) || this.description
    const descriptionId = descriptionContent ? this.safeId('_BV_description_') : null
    if (descriptionContent) {
      $description = h(
        BFormText,
        {
          attrs: {
            id: descriptionId,
            tabindex: descriptionContent ? '-1' : null
          }
        },
        [descriptionContent]
      )
    }

    const $content = h(
      isHorizontal ? BCol : 'div',
      {
        ref: 'content',
        // Hide focus ring
        staticClass: 'bv-no-focus-ring',
        attrs: {
          tabindex: isFieldset ? '-1' : null,
          role: isFieldset ? 'group' : null,
          'aria-labelledby': isFieldset ? labelId : null
        }
      },
      [normalizeSlot() || h(), $invalidFeedback, $validFeedback, $description]
    )

    // Update the `aria-describedby` IDs
    // Screen readers will read out any content linked to by `aria-describedby`
    // even if the content is hidden with `display: none;`, hence we only include
    // feedback IDs if the form-group's state is explicitly valid or invalid
    this.describedByIds = [
      descriptionId,
      state === false ? invalidFeedbackId : null,
      state === true ? validFeedbackId : null
    ]
      .filter(Boolean)
      .join(' ')

    // Return it wrapped in a form-group
    // Note: Fieldsets do not support adding `row` or `form-row` directly
    // to them due to browser specific render issues, so we move the `form-row`
    // to an inner wrapper div when horizontal and using a fieldset
    return h(
      isFieldset ? 'fieldset' : isHorizontal ? BFormRow : 'div',
      {
        staticClass: 'form-group',
        class: [this.validated ? 'was-validated' : null, this.stateClass],
        attrs: {
          id: this.safeId(),
          disabled: isFieldset ? this.disabled : null,
          role: isFieldset ? null : 'group',
          'aria-invalid': this.computedAriaInvalid,
          // Only apply aria-labelledby if we are a horizontal fieldset
          // as the legend is no longer a direct child of fieldset
          'aria-labelledby': isFieldset && isHorizontal ? labelId : null,
          // Only apply `aria-describedby` IDs if we are a fieldset
          // as the input will have the IDs when not a fieldset
          'aria-describedby': isFieldset ? this.describedByIds : null
        }
      },
      isHorizontal && isFieldset ? [h(BFormRow, [$label, $content])] : [$label, $content]
    )
  }
}
