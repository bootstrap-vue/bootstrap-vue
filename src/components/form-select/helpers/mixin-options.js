import { isArray, isPlainObject, isUndefined } from '../../../utils/inspect'
import formOptionsMixin from '../../../mixins/form-options'

// @vue/component
export default {
  mixins: [formOptionsMixin],
  props: {
    labelField: {
      type: String,
      default: 'label'
    },
    optionsField: {
      type: String,
      default: 'options'
    }
  },
  methods: {
    normalizeOption(option, key = null) {
      // When the option is an object, normalize it
      if (isPlainObject(option)) {
        const value = option[this.valueField]
        const text = option[this.textField]
        const options = option[this.optionsField]
        // When it has options, create an `<optgroup>` object
        if (isArray(options)) {
          return {
            label: String(option[this.labelField] || text),
            options
          }
        }
        // Otherwise create an `<option>` object
        return {
          value: isUndefined(value) ? key || text : value,
          text: String(isUndefined(text) ? key : text),
          html: option[this.htmlField],
          disabled: Boolean(option[this.disabledField])
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
}
