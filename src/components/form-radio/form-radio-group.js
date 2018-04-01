import idMixin from '../../mixins/id'
import formOptionsMixin from '../../mixins/form-options'
import formMixin from '../../mixins/form'
import formSizeMixin from '../../mixins/form-size'
import formStateMixin from '../../mixins/form-state'
import formCustomMixin from '../../mixins/form-custom'
import bFormRadio from './form-radio'

export default {
  mixins: [
    idMixin,
    formMixin,
    formSizeMixin,
    formStateMixin,
    formCustomMixin,
    formOptionsMixin
  ],
  components: { bFormRadio },
  render (h) {
    const $slots = this.$slots

    const radios = this.formOptions.map((option, idx) => {
      return h(
        'b-form-radio',
        {
          key: `radio_${idx}_opt`,
          props: {
            id: this.safeId(`_BV_radio_${idx}_opt_`),
            name: this.name,
            value: option.value,
            required: Boolean(this.name && this.required),
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
          role: 'radiogroup',
          tabindex: '-1',
          'aria-required': this.required ? 'true' : null,
          'aria-invalid': this.computedAriaInvalid
        }
      },
      [$slots.first, radios, $slots.default]
    )
  },
  data () {
    return {
      localChecked: this.checked,
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
      type: [String, Object, Number, Boolean],
      default: null
    },
    validated: {
      // Used for applying hte `was-validated` class to the group
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
      // Required by child radios
      return this.computedState
    }
  }
}
