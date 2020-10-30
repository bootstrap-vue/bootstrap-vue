import { SLOT_NAME_FIRST } from '../constants/slot-names'
import looseEqual from '../utils/loose-equal'
import { makePropsConfigurable } from '../utils/config'
import { htmlOrText } from '../utils/html'
import normalizeSlotMixin from './normalize-slot'
import { BFormCheckbox } from '../components/form-checkbox/form-checkbox'
import { BFormRadio } from '../components/form-radio/form-radio'

// @vue/component
export default {
  mixins: [normalizeSlotMixin],
  model: {
    prop: 'checked',
    event: 'input'
  },
  props: makePropsConfigurable(
    {
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
      plain: {
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
        type: String,
        default: 'secondary'
      }
    },
    'formRadioCheckGroup'
  ),
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
      if (this.buttons) {
        return [
          'btn-group-toggle',
          this.inline ? 'btn-group' : 'btn-group-vertical',
          this.size ? `btn-group-${this.size}` : '',
          this.validated ? `was-validated` : ''
        ]
      }
      return [this.validated ? `was-validated` : '']
    },
    computedAriaInvalid() {
      const ariaInvalid = this.ariaInvalid
      if (ariaInvalid === true || ariaInvalid === 'true' || ariaInvalid === '') {
        return 'true'
      }
      return this.computedState === false ? 'true' : null
    }
  },
  watch: {
    checked(newVal) {
      if (!looseEqual(newVal, this.localChecked)) {
        this.localChecked = newVal
      }
    },
    localChecked(newValue, oldValue) {
      if (!looseEqual(newValue, oldValue)) {
        this.$emit('input', newValue)
      }
    }
  },
  render(h) {
    const $inputs = this.formOptions.map((option, index) => {
      const key = `BV_option_${index}`

      return h(
        this.isRadioGroup ? BFormRadio : BFormCheckbox,
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
          role: this.isRadioGroup ? 'radiogroup' : 'group',
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
