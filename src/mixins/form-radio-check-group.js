import { extend } from '../vue'
import { PROP_TYPE_BOOLEAN, PROP_TYPE_BOOLEAN_STRING, PROP_TYPE_STRING } from '../constants/props'
import { SLOT_NAME_FIRST } from '../constants/slots'
import { htmlOrText } from '../utils/html'
import { looseEqual } from '../utils/loose-equal'
import { makeModelMixin } from '../utils/model'
import { omit, pick, sortKeys } from '../utils/object'
import { makeProp, makePropsConfigurable } from '../utils/props'
import { BFormCheckbox } from '../components/form-checkbox/form-checkbox'
import { BFormRadio } from '../components/form-radio/form-radio'
import { formControlMixin, props as formControlProps } from './form-control'
import { formCustomMixin, props as formCustomProps } from './form-custom'
import { formOptionsMixin, props as formOptionsProps } from './form-options'
import { formSizeMixin, props as formSizeProps } from './form-size'
import { formStateMixin, props as formStateProps } from './form-state'
import { idMixin, props as idProps } from './id'
import { normalizeSlotMixin } from './normalize-slot'

// --- Constants ---

// Attributes to pass down to checks/radios instead of applying them to the group
const PASS_DOWN_ATTRS = ['aria-describedby', 'aria-labelledby']

const {
  mixin: modelMixin,
  props: modelProps,
  prop: MODEL_PROP_NAME,
  event: MODEL_EVENT_NAME
} = makeModelMixin('checked')

export { MODEL_PROP_NAME, MODEL_EVENT_NAME }

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...idProps,
    ...modelProps,
    ...formControlProps,
    ...formOptionsProps,
    ...formSizeProps,
    ...formStateProps,
    ...formCustomProps,
    ariaInvalid: makeProp(PROP_TYPE_BOOLEAN_STRING, false),
    // Only applicable when rendered with button style
    buttonVariant: makeProp(PROP_TYPE_STRING),
    // Render as button style
    buttons: makeProp(PROP_TYPE_BOOLEAN, false),
    stacked: makeProp(PROP_TYPE_BOOLEAN, false),
    validated: makeProp(PROP_TYPE_BOOLEAN, false)
  }),
  'formRadioCheckGroups'
)

// --- Mixin ---

// @vue/component
export const formRadioCheckGroupMixin = extend({
  mixins: [
    idMixin,
    modelMixin,
    normalizeSlotMixin,
    formControlMixin,
    formOptionsMixin,
    formSizeMixin,
    formStateMixin,
    formCustomMixin
  ],
  inheritAttrs: false,
  props,
  data() {
    return {
      localChecked: this[MODEL_PROP_NAME]
    }
  },
  computed: {
    inline() {
      return !this.stacked
    },
    groupName() {
      // Checks/Radios tied to the same model must have the same name,
      // especially for ARIA accessibility
      return this.name || this.safeId()
    },
    groupClasses() {
      const { inline, size, validated } = this

      let classes = { 'was-validated': validated }
      if (this.buttons) {
        classes = [
          classes,
          'btn-group-toggle',
          {
            'btn-group': inline,
            'btn-group-vertical': !inline,
            [`btn-group-${size}`]: size
          }
        ]
      }

      return classes
    }
  },
  watch: {
    [MODEL_PROP_NAME](newValue) {
      if (!looseEqual(newValue, this.localChecked)) {
        this.localChecked = newValue
      }
    },
    localChecked(newValue, oldValue) {
      if (!looseEqual(newValue, oldValue)) {
        this.$emit(MODEL_EVENT_NAME, newValue)
      }
    }
  },
  render(h) {
    const { isRadioGroup } = this
    const attrs = pick(this.$attrs, PASS_DOWN_ATTRS)
    const optionComponent = isRadioGroup ? BFormRadio : BFormCheckbox

    const $inputs = this.formOptions.map((option, index) => {
      const key = `BV_option_${index}`

      return h(
        optionComponent,
        {
          props: {
            // Individual radios or checks can be disabled in a group
            disabled: option.disabled || false,
            id: this.safeId(key),
            value: option.value
            // We don't need to include these, since the input's will know they are inside here
            // form: this.form || null,
            // name: this.groupName,
            // required: Boolean(this.name && this.required),
            // state: this.state
          },
          attrs,
          key
        },
        [h('span', { domProps: htmlOrText(option.html, option.text) })]
      )
    })

    return h(
      'div',
      {
        class: [this.groupClasses, 'bv-no-focus-ring'],
        attrs: {
          ...omit(this.$attrs, PASS_DOWN_ATTRS),
          'aria-invalid': this.computedAriaInvalid,
          'aria-required': this.required ? 'true' : null,
          id: this.safeId(),
          role: isRadioGroup ? 'radiogroup' : 'group',
          // Add `tabindex="-1"` to allow group to be focused if needed by screen readers
          tabindex: '-1'
        }
      },
      [this.normalizeSlot(SLOT_NAME_FIRST), $inputs, this.normalizeSlot()]
    )
  }
})
