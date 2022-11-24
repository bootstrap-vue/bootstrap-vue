import { extend } from '../../../vue'
import { PROP_TYPE_STRING } from '../../../constants/props'
import { get } from '../../../utils/get'
import { isNull, isPlainObject, isUndefined } from '../../../utils/inspect'
import { sortKeys } from '../../../utils/object'
import { makeProp, makePropsConfigurable } from '../../../utils/props'
import { formOptionsMixin, props as formOptionsProps } from '../../../mixins/form-options'

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...formOptionsProps,
    labelField: makeProp(PROP_TYPE_STRING, 'label'),
    optionsField: makeProp(PROP_TYPE_STRING, 'options')
  }),
  'formOptions'
)

// --- Mixin ---

// @vue/component
export const optionsMixin = extend({
  mixins: [formOptionsMixin],
  props,
  methods: {
    normalizeOption(option, key = null) {
      // When the option is an object, normalize it
      if (isPlainObject(option)) {
        const value = get(option, this.valueField)
        const text = get(option, this.textField)
        const options = get(option, this.optionsField, null)
        // When it has options, create an `<optgroup>` object
        if (!isNull(options)) {
          return {
            label: String(get(option, this.labelField) || text),
            options: this.normalizeOptions(options)
          }
        }
        // Otherwise create an `<option>` object
        return {
          value: isUndefined(value) ? key || text : value,
          text: String(isUndefined(text) ? key : text),
          html: get(option, this.htmlField),
          disabled: Boolean(get(option, this.disabledField))
        }
      }
      // Otherwise create an `<option>` object from the given value
      return {
        value: key || option,
        text: String(option),
        disabled: false
      }
    }
  }
})
