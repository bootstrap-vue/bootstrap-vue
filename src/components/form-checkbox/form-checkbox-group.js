import idMixin from '../../mixins/id'
import formMixin from '../../mixins/form'
import formOptionsMixin from '../../mixins/form-options'
import formSizeMixin from '../../mixins/form-size'
import formStateMixin from '../../mixins/form-state'
import formCustomMixin from '../../mixins/form-custom'

import bFormCheckbox from './form-checkbox'

export default {
  mixins: [
    idMixin,
    formMixin,
    formSizeMixin,
    formStateMixin,
    formCustomMixin,
    formOptionsMixin
  ],
  components: { bFormCheckbox },
  render (h) {
    const $slots = this.$slots

    const checks = this.formOptions.map((option, idx) => {
      return h(
        'b-form-checkbox',
        {
          key: `check_${idx}_opt`,
          props: {
            id: this.safeId(`_BV_check_${idx}_opt_`),
            name: this.name,
            value: option.value,
            required: this.name && this.required,
            disabled: option.disabled
          }
        },
        [h('span', { domProps: { innerHTML: option.text } })]
      )
    })
    return h(
      'div',
      {
        class: this.groupClasses,
        attrs: {
          id: this.safeId(),
          role: 'group',
          tabindex: '-1',
          'aria-required': this.required ? 'true' : null,
          'aria-invalid': this.computedAriaInvalid
        }
      },
      [$slots.first, checks, $slots.default]
    )
  },
  data () {
    return {
      localChecked: this.checked || [],
      // Flag for children
      is_RadioCheckGroup: true
    }
  },
  model: {
    prop: 'checked',
    event: 'input'
  },
  props: {
    checked: {
      type: [String, Number, Object, Array, Boolean],
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
      type: String,
      default: 'secondary'
    }
  },
  watch: {
    checked (newVal, oldVal) {
      this.localChecked = this.checked
    },
    localChecked (newVal, oldVal) {
      this.$emit('input', newVal)
    }
  },
  computed: {
    groupClasses () {
      if (this.buttons) {
        return [
          'btn-group-toggle',
          this.stacked ? 'btn-group-vertical' : 'btn-group',
          this.size ? `btn-group-${this.size}` : '',
          this.validated ? `was-validated` : ''
        ]
      }
      return [
        this.sizeFormClass,
        this.stacked && this.custom ? 'custom-controls-stacked' : '',
        this.validated ? `was-validated` : ''
      ]
    },
    computedAriaInvalid () {
      if (
        this.ariaInvalid === true ||
        this.ariaInvalid === 'true' ||
        this.ariaInvalid === ''
      ) {
        return 'true'
      }
      return this.get_State === false ? 'true' : null
    },
    get_State () {
      // Child radios sniff this value
      return this.computedState
    }
  }
}
