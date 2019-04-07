import { htmlOrText } from '../utils/html'
import BFormCheckbox from '../components/form-checkbox/form-checkbox'
import BFormRadio from '../components/form-radio/form-radio'

// @vue/component
export default {
  model: {
    prop: 'checked',
    event: 'input'
  },
  props: {
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
    checked(newVal, oldVal) {
      this.localChecked = newVal
    },
    localChecked(newVal, oldVal) {
      this.$emit('input', newVal)
    }
  },
  render(h) {
    const $slots = this.$slots

    const inputs = this.formOptions.map((option, idx) => {
      const uid = `_BV_option_${idx}_`
      return h(
        this.is_RadioGroup ? BFormRadio : BFormCheckbox,
        {
          key: uid,
          props: {
            id: this.safeId(uid),
            value: option.value,
            // Individual radios or checks can be disabled in a group
            disabled: option.disabled || false
            // We don't need to include these, since the input's will know they are inside here
            // name: this.groupName,
            // form: this.form || null,
            // required: Boolean(this.name && this.required)
          }
        },
        [h('span', { domProps: htmlOrText(option.html, option.text) })]
      )
    })
    return h(
      'div',
      {
        class: this.groupClasses,
        attrs: {
          id: this.safeId(),
          role: this.is_RadioGroup ? 'radiogroup' : 'group',
          // Tabindex to allow group to be focused if needed
          tabindex: '-1',
          'aria-required': this.required ? 'true' : null,
          'aria-invalid': this.computedAriaInvalid
        }
      },
      [$slots.first, inputs, $slots.default]
    )
  }
}
