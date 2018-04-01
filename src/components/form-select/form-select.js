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
    const $slots = this.$slots
    const options = this.formOptions.map((option, index) => {
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
        class: this.inputClass,
        directives: [
          {
            name: 'model',
            rawName: 'v-model',
            value: this.localValue,
            expression: 'localValue'
          }
        ],
        attrs: {
          id: this.safeId(),
          name: this.name,
          multiple: this.multiple || null,
          size: this.computedSelectSize,
          disabled: this.disabled,
          required: this.required,
          'aria-required': this.required ? 'true' : null,
          'aria-invalid': this.computedAriaInvalid
        },
        on: {
          change: evt => {
            const target = evt.target
            const selectedVal = arrayFrom(target.options)
              .filter(o => o.selected)
              .map(o => ('_value' in o ? o._value : o.value))
            this.localValue = target.multiple ? selectedVal : selectedVal[0]
            this.$emit('change', this.localValue)
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
    computedSelectSize () {
      // Custom selects with a size of zero causes the arrows to be hidden,
      // so dont render the size attribute in this case
      return !this.plain && this.selectSize === 0 ? null : this.selectSize
    },
    inputClass () {
      return [
        'form-control',
        this.stateClass,
        this.sizeFormClass,
        // Awaiting for https://github.com/twbs/bootstrap/issues/23058
        this.plain ? null : 'custom-select',
        this.plain || !this.size ? null : 'custom-select-' + this.size
      ]
    },
    computedAriaInvalid () {
      if (this.ariaInvalid === true || this.ariaInvalid === 'true') {
        return 'true'
      }
      return this.stateClass === 'is-invalid' ? 'true' : null
    }
  }
}
