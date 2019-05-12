import Vue from '../../utils/vue'
import idMixin from '../../mixins/id'
import formOptionsMixin from '../../mixins/form-options'
import formMixin from '../../mixins/form'
import formSizeMixin from '../../mixins/form-size'
import formStateMixin from '../../mixins/form-state'
import formCustomMixin from '../../mixins/form-custom'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { from as arrayFrom } from '../../utils/array'
import { htmlOrText } from '../../utils/html'

// @vue/component
export default Vue.extend({
  name: 'BFormSelect',
  mixins: [
    idMixin,
    normalizeSlotMixin,
    formMixin,
    formSizeMixin,
    formStateMixin,
    formCustomMixin,
    formOptionsMixin
  ],
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      // type: [Object, Array, String, Number, Boolean],
      // default: undefined
    },
    multiple: {
      type: Boolean,
      default: false
    },
    selectSize: {
      // Browsers default size to 0, which shows 4 rows in most browsers in multiple mode
      // Size of 1 can bork out Firefox
      type: Number,
      default: 0
    },
    ariaInvalid: {
      type: [Boolean, String],
      default: false
    }
  },
  data() {
    return {
      localValue: this.value
    }
  },
  computed: {
    computedSelectSize() {
      // Custom selects with a size of zero causes the arrows to be hidden,
      // so dont render the size attribute in this case
      return !this.plain && this.selectSize === 0 ? null : this.selectSize
    },
    inputClass() {
      return [
        this.plain ? 'form-control' : 'custom-select',
        this.size && this.plain ? `form-control-${this.size}` : null,
        this.size && !this.plain ? `custom-select-${this.size}` : null,
        this.stateClass
      ]
    },
    computedAriaInvalid() {
      if (this.ariaInvalid === true || this.ariaInvalid === 'true') {
        return 'true'
      }
      return this.stateClass === 'is-invalid' ? 'true' : null
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.localValue = newVal
    },
    localValue(newVal, oldVal) {
      this.$emit('input', this.localValue)
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus()
    },
    blur() {
      this.$refs.input.blur()
    }
  },
  render(h) {
    const options = this.formOptions.map((option, index) => {
      return h('option', {
        key: `option_${index}_opt`,
        attrs: { disabled: Boolean(option.disabled) },
        domProps: { ...htmlOrText(option.html, option.text), value: option.value }
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
          form: this.form || null,
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
            this.$nextTick(() => {
              this.$emit('change', this.localValue)
            })
          }
        }
      },
      [this.normalizeSlot('first'), options, this.normalizeSlot('default')]
    )
  }
})
