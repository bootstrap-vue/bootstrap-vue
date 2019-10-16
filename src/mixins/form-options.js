import warn from '../utils/warn'
import { isArray, isPlainObject, isUndefined } from '../utils/inspect'
import { keys } from '../utils/object'

const DEPRECATED_MSG =
  'Setting prop "options" to an object is deprecated. Use the array format instead.'

// @vue/component
export default {
  props: {
    options: {
      type: [Array, Object],
      default: () => []
    },
    valueField: {
      type: String,
      default: 'value'
    },
    textField: {
      type: String,
      default: 'text'
    },
    htmlField: {
      type: String,
      default: 'html'
    },
    disabledField: {
      type: String,
      default: 'disabled'
    }
  },
  computed: {
    formOptions() {
      const options = this.options
      // Normalize the given options array
      if (isArray(options)) {
        return options.map(option => this.normalizeOption(option))
      }
      // Deprecate the object options format
      warn(`b-form: ${DEPRECATED_MSG}`)
      // Normalize a `options` object to an array of options
      return keys(options).map(key => this.normalizeOption(options[key] || {}, key))
    }
  },
  methods: {
    normalizeOption(option, key = null) {
      // When the option is an object, normalize it
      if (isPlainObject(option)) {
        const value = option[this.valueField]
        const text = option[this.textField]
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
