import Vue from '../../vue'
import { NAME_FORM_SELECT } from '../../constants/components'
import { SLOT_NAME_FIRST } from '../../constants/slot-names'
import { makePropsConfigurable } from '../../utils/config'
import { from as arrayFrom } from '../../utils/array'
import { attemptBlur, attemptFocus } from '../../utils/dom'
import { htmlOrText } from '../../utils/html'
import { isArray } from '../../utils/inspect'
import formControlMixin, { props as formControlProps } from '../../mixins/form-control'
import formCustomMixin, { props as formCustomProps } from '../../mixins/form-custom'
import formSizeMixin, { props as formSizeProps } from '../../mixins/form-size'
import formStateMixin, { props as formStateProps } from '../../mixins/form-state'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import optionsMixin from './helpers/mixin-options'
import { BFormSelectOption } from './form-select-option'
import { BFormSelectOptionGroup } from './form-select-option-group'

// @vue/component
export const BFormSelect = /*#__PURE__*/ Vue.extend({
  name: NAME_FORM_SELECT,
  mixins: [
    idMixin,
    normalizeSlotMixin,
    formControlMixin,
    formSizeMixin,
    formStateMixin,
    formCustomMixin,
    optionsMixin
  ],
  model: {
    prop: 'value',
    event: 'input'
  },
  props: makePropsConfigurable(
    {
      ...formControlProps,
      ...formCustomProps,
      ...formSizeProps,
      ...formStateProps,
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
    NAME_FORM_SELECT
  ),
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
    }
  },
  watch: {
    value(newVal) {
      this.localValue = newVal
    },
    localValue() {
      this.$emit('input', this.localValue)
    }
  },
  methods: {
    focus() {
      attemptFocus(this.$refs.input)
    },
    blur() {
      attemptBlur(this.$refs.input)
    },
    onChange(evt) {
      const { target } = evt
      const selectedVal = arrayFrom(target.options)
        .filter(o => o.selected)
        .map(o => ('_value' in o ? o._value : o.value))
      this.localValue = target.multiple ? selectedVal : selectedVal[0]
      this.$nextTick(() => {
        this.$emit('change', this.localValue)
      })
    }
  },
  render(h) {
    const { name, disabled, required, computedSelectSize: size, localValue: value } = this

    const $options = this.formOptions.map((option, index) => {
      const { value, label, options, disabled } = option
      const key = `option_${index}`

      return isArray(options)
        ? h(BFormSelectOptionGroup, { props: { label, options }, key })
        : h(BFormSelectOption, {
            props: { value, disabled },
            domProps: htmlOrText(option.html, option.text),
            key
          })
    })

    return h(
      'select',
      {
        class: this.inputClass,
        attrs: {
          id: this.safeId(),
          name,
          form: this.form || null,
          multiple: this.multiple || null,
          size,
          disabled,
          required,
          'aria-required': required ? 'true' : null,
          'aria-invalid': this.computedAriaInvalid
        },
        on: { change: this.onChange },
        directives: [{ name: 'model', value }],
        ref: 'input'
      },
      [this.normalizeSlot(SLOT_NAME_FIRST), $options, this.normalizeSlot()]
    )
  }
})
