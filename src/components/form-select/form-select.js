import idMixin from '../../mixins/id'
import formOptionsMixin from '../../mixins/form-options'
import formMixin from '../../mixins/form'
import formSizeMixin from '../../mixins/form-size'
import formStateMixin from '../../mixins/form-state'
import formCustomMixin from '../../mixins/form-custom'
import { from as arrayFrom } from '../../utils/array'

export default {
  mixins: [
    idMixin,
    formMixin,
    formSizeMixin,
    formStateMixin,
    formCustomMixin,
    formOptionsMixin
  ],
  render (h) {
    const t = this
    const $slots = t.$slots
    const options = t.formOptions.map((option, index) => {
      return h('option', {
        key: `option_${index}_opt`,
        attrs: { disabled: Boolean(option.disabled) },
        domProps: { innerHTML: option.text, value: option.value }
      })
    })
    return h(
      'select',
      {
        ref: 'input',
        class: t.inputClass,
        directives: [
          {
            name: 'model',
            rawName: 'v-model',
            value: t.localValue,
            expression: 'localValue'
          }
        ],
        attrs: {
          id: t.safeId(),
          name: t.name,
          multiple: t.multiple || null,
          size: t.isMultiple ? t.selectSize : null,
          disabled: t.disabled,
          required: t.required,
          'aria-required': t.required ? 'true' : null,
          'aria-invalid': t.computedAriaInvalid
        },
        on: {
          change: evt => {
            const target = evt.target
            const selectedVal = arrayFrom(target.options)
              .filter(o => o.selected)
              .map(o => ('_value' in o ? o._value : o.value))
            t.localValue = target.multiple ? selectedVal : selectedVal[0]
            t.$emit('change', t.localValue)
          }
        }
      },
      [$slots.first, options, $slots.default]
    )
  },
  data () {
    return {
      localValue: this.value
    }
  },
  watch: {
    value (newVal, oldVal) {
      this.localValue = newVal
    },
    localValue (newVal, oldVal) {
      this.$emit('input', this.localValue)
    }
  },
  props: {
    value: {},
    multiple: {
      type: Boolean,
      default: false
    },
    selectSize: {
      // Browsers default size to 0, which shows 4 rows in most browsers in multiple mode
      // Size of 1 can bork out firefox
      type: Number,
      default: 0
    },
    ariaInvalid: {
      type: [Boolean, String],
      default: false
    }
  },
  computed: {
    inputClass () {
      return [
        'form-control',
        this.stateClass,
        this.sizeFormClass,
        // Awaiting for https://github.com/twbs/bootstrap/issues/23058
        this.isPlain ? null : 'custom-select',
        this.isPlain || !this.size ? null : 'custom-select-' + this.size
      ]
    },
    isPlain () {
      return this.plain || this.isMultiple
    },
    isMultiple () {
      return Boolean(this.multiple && this.selectSize > 1)
    },
    computedAriaInvalid () {
      if (this.ariaInvalid === true || this.ariaInvalid === 'true') {
        return 'true'
      }
      return this.stateClass === 'is-invalid' ? 'true' : null
    }
  }
}
