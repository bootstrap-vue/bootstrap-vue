import { NAME_FORM_GROUP } from '../../constants/components'
import { IS_BROWSER } from '../../constants/env'
import {
  PROP_TYPE_ARRAY_OBJECT_STRING,
  PROP_TYPE_BOOLEAN,
  PROP_TYPE_BOOLEAN_NUMBER_STRING,
  PROP_TYPE_STRING
} from '../../constants/props'
import { RX_SPACE_SPLIT } from '../../constants/regex'
import {
  SLOT_NAME_DEFAULT,
  SLOT_NAME_DESCRIPTION,
  SLOT_NAME_INVALID_FEEDBACK,
  SLOT_NAME_LABEL,
  SLOT_NAME_VALID_FEEDBACK
} from '../../constants/slots'
import { arrayIncludes } from '../../utils/array'
import { getBreakpointsUpCached } from '../../utils/config'
import { cssEscape } from '../../utils/css-escape'
import {
  select,
  selectAll,
  isVisible,
  setAttr,
  removeAttr,
  getAttr,
  attemptFocus
} from '../../utils/dom'
import { identity } from '../../utils/identity'
import { isBoolean } from '../../utils/inspect'
import { toInteger } from '../../utils/number'
import { create, keys, sortKeys } from '../../utils/object'
import { makeProp, makePropsConfigurable, suffixPropName } from '../../utils/props'
import { formStateMixin, props as formStateProps } from '../../mixins/form-state'
import { idMixin, props as idProps } from '../../mixins/id'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'
import { BCol } from '../layout/col'
import { BFormRow } from '../layout/form-row'
import { BFormText } from '../form/form-text'
import { BFormInvalidFeedback } from '../form/form-invalid-feedback'
import { BFormValidFeedback } from '../form/form-valid-feedback'

// --- Constants ---

const INPUTS = ['input', 'select', 'textarea']

// Selector for finding first input in the form group
const INPUT_SELECTOR = INPUTS.map(v => `${v}:not([disabled])`).join()

// A list of interactive elements (tag names) inside `<b-form-group>`'s legend
const LEGEND_INTERACTIVE_ELEMENTS = [...INPUTS, 'a', 'button', 'label']

// --- Props ---

// Prop generator for lazy generation of props
export const generateProps = () =>
  makePropsConfigurable(
    sortKeys({
      ...idProps,
      ...formStateProps,
      ...getBreakpointsUpCached().reduce((props, breakpoint) => {
        // i.e. 'content-cols', 'content-cols-sm', 'content-cols-md', ...
        props[suffixPropName(breakpoint, 'contentCols')] = makeProp(PROP_TYPE_BOOLEAN_NUMBER_STRING)
        // i.e. 'label-align', 'label-align-sm', 'label-align-md', ...
        props[suffixPropName(breakpoint, 'labelAlign')] = makeProp(PROP_TYPE_STRING)
        // i.e. 'label-cols', 'label-cols-sm', 'label-cols-md', ...
        props[suffixPropName(breakpoint, 'labelCols')] = makeProp(PROP_TYPE_BOOLEAN_NUMBER_STRING)
        return props
      }, create(null)),
      description: makeProp(PROP_TYPE_STRING),
      disabled: makeProp(PROP_TYPE_BOOLEAN, false),
      feedbackAriaLive: makeProp(PROP_TYPE_STRING, 'assertive'),
      invalidFeedback: makeProp(PROP_TYPE_STRING),
      label: makeProp(PROP_TYPE_STRING),
      labelClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
      labelFor: makeProp(PROP_TYPE_STRING),
      labelSize: makeProp(PROP_TYPE_STRING),
      labelSrOnly: makeProp(PROP_TYPE_BOOLEAN, false),
      tooltip: makeProp(PROP_TYPE_BOOLEAN, false),
      validFeedback: makeProp(PROP_TYPE_STRING),
      validated: makeProp(PROP_TYPE_BOOLEAN, false)
    }),
    NAME_FORM_GROUP
  )

// --- Main component ---

// We do not use `Vue.extend()` here as that would evaluate the props
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
      ariaDescribedby: null
    }
  },
  computed: {
    contentColProps() {
      return this.getColProps(this.$props, 'content')
    },
    labelAlignClasses() {
      return this.getAlignClasses(this.$props, 'label')
    },
    labelColProps() {
      return this.getColProps(this.$props, 'label')
    },
    isHorizontal() {
      // Determine if the form group will be rendered horizontal
      // based on the existence of 'content-col' or 'label-col' props
      return keys(this.contentColProps).length > 0 || keys(this.labelColProps).length > 0
    }
  },
  watch: {
    ariaDescribedby(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.updateAriaDescribedby(newValue, oldValue)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      // Set `aria-describedby` on the input specified by `labelFor`
      // We do this in a `$nextTick()` to ensure the children have finished rendering
      this.updateAriaDescribedby(this.ariaDescribedby)
    })
  },
  methods: {
    getAlignClasses(props, prefix) {
      return getBreakpointsUpCached().reduce((result, breakpoint) => {
        const propValue = props[suffixPropName(breakpoint, `${prefix}Align`)] || null
        if (propValue) {
          result.push(['text', breakpoint, propValue].filter(identity).join('-'))
        }

        return result
      }, [])
    },
    getColProps(props, prefix) {
      return getBreakpointsUpCached().reduce((result, breakpoint) => {
        let propValue = props[suffixPropName(breakpoint, `${prefix}Cols`)]

        // Handle case where the prop's value is an empty string,
        // which represents `true`
        propValue = propValue === '' ? true : propValue || false

        if (!isBoolean(propValue) && propValue !== 'auto') {
          // Convert to column size to number
          propValue = toInteger(propValue, 0)
          // Ensure column size is greater than `0`
          propValue = propValue > 0 ? propValue : false
        }

        // Add the prop to the list of props to give to `<b-col>`
        // If breakpoint is '' (`${prefix}Cols` is `true`), then we use
        // the 'col' prop to make equal width at 'xs'
        if (propValue) {
          result[breakpoint || (isBoolean(propValue) ? 'col' : 'cols')] = propValue
        }

        return result
      }, {})
    },
    // Sets the `aria-describedby` attribute on the input if `labelFor` is set
    // Optionally accepts a string of IDs to remove as the second parameter
    // Preserves any `aria-describedby` value(s) user may have on input
    updateAriaDescribedby(newValue, oldValue) {
      const { labelFor } = this
      if (IS_BROWSER && labelFor) {
        // We need to escape `labelFor` since it can be user-provided
        const $input = select(`#${cssEscape(labelFor)}`, this.$refs.content)
        if ($input) {
          const attr = 'aria-describedby'
          const newIds = (newValue || '').split(RX_SPACE_SPLIT)
          const oldIds = (oldValue || '').split(RX_SPACE_SPLIT)

          // Update ID list, preserving any original IDs
          // and ensuring the ID's are unique
          const ids = (getAttr($input, attr) || '')
            .split(RX_SPACE_SPLIT)
            .filter(id => !arrayIncludes(oldIds, id))
            .concat(newIds)
            .filter((id, index, ids) => ids.indexOf(id) === index)
            .filter(identity)
            .join(' ')
            .trim()

          if (ids) {
            setAttr($input, attr, ids)
          } else {
            removeAttr($input, attr)
          }
        }
      }
    },
    onLegendClick(event) {
      // Don't do anything if `labelFor` is set
      /* istanbul ignore next: clicking a label will focus the input, so no need to test */
      if (this.labelFor) {
        return
      }

      const { target } = event
      const tagName = target ? target.tagName : ''

      // If clicked an interactive element inside legend,
      // we just let the default happen
      /* istanbul ignore next */
      if (LEGEND_INTERACTIVE_ELEMENTS.indexOf(tagName) !== -1) {
        return
      }

      // If only a single input, focus it, emulating label behaviour
      const inputs = selectAll(INPUT_SELECTOR, this.$refs.content).filter(isVisible)
      if (inputs.length === 1) {
        attemptFocus(inputs[0])
      }
    }
  },
  render(h) {
    const {
      computedState: state,
      feedbackAriaLive,
      isHorizontal,
      labelFor,
      normalizeSlot,
      safeId,
      tooltip
    } = this
    const id = safeId()
    const isFieldset = !labelFor

    let $label = h()
    const labelContent = normalizeSlot(SLOT_NAME_LABEL) || this.label
    const labelId = labelContent ? safeId('_BV_label_') : null
    if (labelContent || isHorizontal) {
      const { labelSize, labelColProps } = this
      const labelTag = isFieldset ? 'legend' : 'label'
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
            on: isFieldset ? { click: this.onLegendClick } : {},
            props: isHorizontal ? { ...labelColProps, tag: labelTag } : {},
            attrs: {
              id: labelId,
              for: labelFor || null,
              // We add a `tabindex` to legend so that screen readers
              // will properly read the `aria-labelledby` in IE
              tabindex: isFieldset ? '-1' : null
            },
            class: [
              // Hide the focus ring on the legend
              isFieldset ? 'bv-no-focus-ring' : '',
              // When horizontal or if a legend is rendered, add 'col-form-label' class
              // for correct sizing as Bootstrap has inconsistent font styling for
              // legend in non-horizontal form groups
              // See: https://github.com/twbs/bootstrap/issues/27805
              isHorizontal || isFieldset ? 'col-form-label' : '',
              // Emulate label padding top of `0` on legend when not horizontal
              !isHorizontal && isFieldset ? 'pt-0' : '',
              // If not horizontal and not a legend, we add 'd-block' class to label
              // so that label-align works
              !isHorizontal && !isFieldset ? 'd-block' : '',
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
    const invalidFeedbackContent = normalizeSlot(SLOT_NAME_INVALID_FEEDBACK) || this.invalidFeedback
    const invalidFeedbackId = invalidFeedbackContent ? safeId('_BV_feedback_invalid_') : null
    if (invalidFeedbackContent) {
      $invalidFeedback = h(
        BFormInvalidFeedback,
        {
          props: {
            ariaLive: feedbackAriaLive,
            id: invalidFeedbackId,
            // If state is explicitly `false`, always show the feedback
            state,
            tooltip
          },
          attrs: { tabindex: invalidFeedbackContent ? '-1' : null }
        },
        [invalidFeedbackContent]
      )
    }

    let $validFeedback = h()
    const validFeedbackContent = normalizeSlot(SLOT_NAME_VALID_FEEDBACK) || this.validFeedback
    const validFeedbackId = validFeedbackContent ? safeId('_BV_feedback_valid_') : null
    if (validFeedbackContent) {
      $validFeedback = h(
        BFormValidFeedback,
        {
          props: {
            ariaLive: feedbackAriaLive,
            id: validFeedbackId,
            // If state is explicitly `true`, always show the feedback
            state,
            tooltip
          },
          attrs: { tabindex: validFeedbackContent ? '-1' : null }
        },
        [validFeedbackContent]
      )
    }

    let $description = h()
    const descriptionContent = normalizeSlot(SLOT_NAME_DESCRIPTION) || this.description
    const descriptionId = descriptionContent ? safeId('_BV_description_') : null
    if (descriptionContent) {
      $description = h(
        BFormText,
        {
          attrs: {
            id: descriptionId,
            tabindex: '-1'
          }
        },
        [descriptionContent]
      )
    }

    // Update `ariaDescribedby`
    // Screen readers will read out any content linked to by `aria-describedby`
    // even if the content is hidden with `display: none;`, hence we only include
    // feedback IDs if the form group's state is explicitly valid or invalid
    const ariaDescribedby = (this.ariaDescribedby =
      [
        descriptionId,
        state === false ? invalidFeedbackId : null,
        state === true ? validFeedbackId : null
      ]
        .filter(identity)
        .join(' ') || null)

    const $content = h(
      isHorizontal ? BCol : 'div',
      {
        props: isHorizontal ? this.contentColProps : {},
        ref: 'content'
      },
      [
        normalizeSlot(SLOT_NAME_DEFAULT, { ariaDescribedby, descriptionId, id, labelId }) || h(),
        $invalidFeedback,
        $validFeedback,
        $description
      ]
    )

    // Return it wrapped in a form group
    // Note: Fieldsets do not support adding `row` or `form-row` directly
    // to them due to browser specific render issues, so we move the `form-row`
    // to an inner wrapper div when horizontal and using a fieldset
    return h(
      isFieldset ? 'fieldset' : isHorizontal ? BFormRow : 'div',
      {
        staticClass: 'form-group',
        class: [{ 'was-validated': this.validated }, this.stateClass],
        attrs: {
          id,
          disabled: isFieldset ? this.disabled : null,
          role: isFieldset ? null : 'group',
          'aria-invalid': this.computedAriaInvalid,
          // Only apply `aria-labelledby` if we are a horizontal fieldset
          // as the legend is no longer a direct child of fieldset
          'aria-labelledby': isFieldset && isHorizontal ? labelId : null
        }
      },
      isHorizontal && isFieldset ? [h(BFormRow, [$label, $content])] : [$label, $content]
    )
  }
}
