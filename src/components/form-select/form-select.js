import { Vue } from '../../vue'
import { NAME_FORM_SELECT } from '../../constants/components'
import { EVENT_NAME_CHANGE } from '../../constants/events'
import {
  PROP_TYPE_BOOLEAN,
  PROP_TYPE_BOOLEAN_STRING,
  PROP_TYPE_NUMBER
} from '../../constants/props'
import { SLOT_NAME_FIRST } from '../../constants/slots'
import { from as arrayFrom } from '../../utils/array'
import { attemptBlur, attemptFocus } from '../../utils/dom'
import { htmlOrText } from '../../utils/html'
import { isArray } from '../../utils/inspect'
import { sortKeys } from '../../utils/object'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { formControlMixin, props as formControlProps } from '../../mixins/form-control'
import { formCustomMixin, props as formCustomProps } from '../../mixins/form-custom'
import { formSizeMixin, props as formSizeProps } from '../../mixins/form-size'
import { formStateMixin, props as formStateProps } from '../../mixins/form-state'
import { idMixin, props as idProps } from '../../mixins/id'
import {
  MODEL_EVENT_NAME,
  MODEL_PROP_NAME,
  modelMixin,
  props as modelProps
} from '../../mixins/model'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'
import { optionsMixin } from './helpers/mixin-options'
import { BFormSelectOption } from './form-select-option'
import { BFormSelectOptionGroup } from './form-select-option-group'

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...idProps,
    ...modelProps,
    ...formControlProps,
    ...formCustomProps,
    ...formSizeProps,
    ...formStateProps,
    ariaInvalid: makeProp(PROP_TYPE_BOOLEAN_STRING, false),
    multiple: makeProp(PROP_TYPE_BOOLEAN, false),
    // Browsers default size to `0`, which shows 4 rows in most browsers in multiple mode
    // Size of `1` can bork out Firefox
    selectSize: makeProp(PROP_TYPE_NUMBER, 0)
  }),
  NAME_FORM_SELECT
)

// --- Main component ---

// @vue/component
export const BFormSelect = /*#__PURE__*/ Vue.extend({
  name: NAME_FORM_SELECT,
  mixins: [
    idMixin,
    modelMixin,
    formControlMixin,
    formSizeMixin,
    formStateMixin,
    formCustomMixin,
    optionsMixin,
    normalizeSlotMixin
  ],
  props,
  data() {
    return {
      localValue: this[MODEL_PROP_NAME]
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
    value(newValue) {
      this.localValue = newValue
    },
    localValue() {
      this.$emit(MODEL_EVENT_NAME, this.localValue)
    }
  },
  methods: {
    focus() {
      attemptFocus(this.$refs.input)
    },
    blur() {
      attemptBlur(this.$refs.input)
    },
    onChange(event) {
      const { target } = event
      const selectedValue = arrayFrom(target.options)
        .filter(o => o.selected)
        .map(o => ('_value' in o ? o._value : o.value))

      this.localValue = target.multiple ? selectedValue : selectedValue[0]

      this.$nextTick(() => {
        this.$emit(EVENT_NAME_CHANGE, this.localValue)
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
