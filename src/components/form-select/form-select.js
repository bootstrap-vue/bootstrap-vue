import { defineComponent, h, resolveDirective } from '../../vue'
import { NAME_FORM_SELECT } from '../../constants/components'
import { EVENT_NAME_CHANGE, EVENT_NAME_MODEL_VALUE } from '../../constants/events'
import { PROP_NAME_MODEL_VALUE } from '../../constants/props'
import { SLOT_NAME_FIRST } from '../../constants/slots'
import looseEqual from '../../utils/loose-equal'
import { from as arrayFrom } from '../../utils/array'
import { makePropsConfigurable } from '../../utils/config'
import { attemptBlur, attemptFocus } from '../../utils/dom'
import { htmlOrText } from '../../utils/html'
import { isArray } from '../../utils/inspect'
import formControlMixin, { props as formControlProps } from '../../mixins/form-control'
import formCustomMixin, { props as formCustomProps } from '../../mixins/form-custom'
import formSizeMixin, { props as formSizeProps } from '../../mixins/form-size'
import formStateMixin, { props as formStateProps } from '../../mixins/form-state'
import idMixin from '../../mixins/id'
import modelMixin from '../../mixins/model'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import optionsMixin from './helpers/mixin-options'
import { BFormSelectOption } from './form-select-option'
import { BFormSelectOptionGroup } from './form-select-option-group'

// @vue/component
export const BFormSelect = /*#__PURE__*/ defineComponent({
  name: NAME_FORM_SELECT,
  mixins: [
    idMixin,
    modelMixin,
    normalizeSlotMixin,
    formControlMixin,
    formSizeMixin,
    formStateMixin,
    formCustomMixin,
    optionsMixin
  ],
  props: makePropsConfigurable(
    {
      ...formControlProps,
      ...formCustomProps,
      ...formSizeProps,
      ...formStateProps,
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
  emits: [EVENT_NAME_CHANGE],
  data() {
    return {
      localValue: this[PROP_NAME_MODEL_VALUE]
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
      const { ariaInvalid } = this
      if (ariaInvalid === true || ariaInvalid === 'true' || ariaInvalid === '') {
        return 'true'
      }
      return this.computedState === false ? 'true' : null
    }
  },
  watch: {
    [PROP_NAME_MODEL_VALUE](newValue, oldValue) {
      if (!looseEqual(newValue, oldValue)) {
        this.localValue = newValue
      }
    },
    localValue() {
      this.$emit(EVENT_NAME_MODEL_VALUE, this.localValue)
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
        this.$emit(EVENT_NAME_CHANGE, this.localValue)
      })
    }
  },
  render() {
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
        directives: [{ name: resolveDirective('model'), value }],
        ref: 'input'
      },
      [this.normalizeSlot(SLOT_NAME_FIRST), $options, this.normalizeSlot()]
    )
  }
})
