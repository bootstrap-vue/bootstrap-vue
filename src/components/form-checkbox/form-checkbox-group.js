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
    const t = this
    const $slots = t.$slots

    const checks = t.formOptions.map((option, idx) => {
      return h(
        'b-form-checkbox',
        {
          key: `check_${idx}_opt`,
          props: {
            id: t.safeId(`_BV_check_${idx}_opt_`),
            name: t.name,
            value: option.value,
            required: t.name && t.required,
            disabled: option.disabled
          }
        },
        [h('span', { domProps: { innerHTML: option.text } })]
      )
    })
    return h(
      'div',
      {
        class: t.groupClasses,
        attrs: {
          id: t.safeId(),
          role: 'group',
          tabindex: '-1',
          'aria-required': t.required ? 'true' : null,
          'aria-invalid': t.computedAriaInvalid
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
      const t = this
      if (t.buttons) {
        return [
          'btn-group-toggle',
          t.stacked ? 'btn-group-vertical' : 'btn-group',
          t.size ? `btn-group-${this.size}` : '',
          t.validated ? `was-validated` : ''
        ]
      }
      return [
        t.sizeFormClass,
        t.stacked && t.custom ? 'custom-controls-stacked' : '',
        t.validated ? `was-validated` : ''
      ]
    },
    computedAriaInvalid () {
      const t = this
      if (
        t.ariaInvalid === true ||
        t.ariaInvalid === 'true' ||
        t.ariaInvalid === ''
      ) {
        return 'true'
      }
      return t.get_State === false ? 'true' : null
    },
    get_State () {
      // Child radios sniff this value
      return this.computedState
    }
  }
}
