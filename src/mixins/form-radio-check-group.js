import { SLOT_NAME_FIRST } from '../constants/slot-names'
import looseEqual from '../utils/loose-equal'
import { makePropsConfigurable } from '../utils/config'
import { htmlOrText } from '../utils/html'
import { BFormCheckbox } from '../components/form-checkbox/form-checkbox'
import { BFormRadio } from '../components/form-radio/form-radio'
import formControlMixin, { props as formControlProps } from './form-control'
import formCustomMixin, { props as formCustomProps } from './form-custom'
import formOptionsMixin, { props as formOptionsProps } from './form-options'
import formSizeMixin, { props as formSizeProps } from './form-size'
import formStateMixin, { props as formStateProps } from './form-state'
import idMixin from './id'
import normalizeSlotMixin from './normalize-slot'

// --- Props ---

export const props = makePropsConfigurable(
  {
    ...formControlProps,
    ...formOptionsProps,
    ...formSizeProps,
    ...formStateProps,
    ...formCustomProps,
    checked: {
      // type: [Boolean, Number, Object, String]
      default: null
    },
    validated: {
      type: Boolean,
      default: false
    },
    ariaInvalid: {
      type: [Boolean, String],
      default: false
    },
    stacked: {
      type: Boolean,
      default: false
    },
    buttons: {
      // Render as button style
      type: Boolean,
      default: false
    },
    buttonVariant: {
      // Only applicable when rendered with button style
      type: String
      // default: null
    }
  },
  'formRadioCheckGroups'
)

// --- Mixin ---

// @vue/component
export default {
  mixins: [
    idMixin,
    normalizeSlotMixin,
    formControlMixin,
    formOptionsMixin,
    formSizeMixin,
    formStateMixin,
    formCustomMixin
  ],
  model: {
    prop: 'checked',
    event: 'input'
  },
  props,
  data() {
    return {
      localChecked: this.checked
    }
  },
  computed: {
    inline() {
      return !this.stacked
    },
    groupName() {
      // Checks/Radios tied to the same model must have the same name,
      // especially for ARIA accessibility.
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
            [`btn-group-${size}`]: !!size
          }
        ]
      }

      return classes
    }
  },
  watch: {
    checked(newValue) {
      if (!looseEqual(newValue, this.localChecked)) {
        this.localChecked = newValue
      }
    },
    localChecked(newValue, oldValue) {
      if (!looseEqual(newValue, oldValue)) {
        this.$emit('input', newValue)
      }
    }
  },
  render(h) {
    const { isRadioGroup } = this
    const optionComponent = isRadioGroup ? BFormRadio : BFormCheckbox

    const $inputs = this.formOptions.map((option, index) => {
      const key = `BV_option_${index}`

      return h(
        optionComponent,
        {
          props: {
            id: this.safeId(key),
            value: option.value,
            // Individual radios or checks can be disabled in a group
            disabled: option.disabled || false
            // We don't need to include these, since the input's will know they are inside here
            // name: this.groupName,
            // form: this.form || null,
            // required: Boolean(this.name && this.required)
          },
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
          id: this.safeId(),
          role: isRadioGroup ? 'radiogroup' : 'group',
          // Add `tabindex="-1"` to allow group to be focused if needed by screen readers
          tabindex: '-1',
          'aria-required': this.required ? 'true' : null,
          'aria-invalid': this.computedAriaInvalid
        }
      },
      [this.normalizeSlot(SLOT_NAME_FIRST), $inputs, this.normalizeSlot()]
    )
  }
}
