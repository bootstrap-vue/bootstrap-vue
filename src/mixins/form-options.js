import get from '../utils/get'
import { stripTags } from '../utils/html'
import { isArray, isPlainObject, isUndefined } from '../utils/inspect'
import { keys } from '../utils/object'
import { warn } from '../utils/warn'

const OPTIONS_OBJECT_DEPRECATED_MSG =
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
      return this.normalizeOptions(this.options)
    }
  },
  methods: {
    normalizeOption(option, key = null) {
      // When the option is an object, normalize it
      if (isPlainObject(option)) {
        const value = get(option, this.valueField)
        const text = get(option, this.textField)
        return {
          value: isUndefined(value) ? key || text : value,
          text: stripTags(String(isUndefined(text) ? key : text)),
          html: get(option, this.htmlField),
          disabled: Boolean(get(option, this.disabledField))
        }
      }
      // Otherwise create an `<option>` object from the given value
      return {
        value: key || option,
        text: stripTags(String(option)),
        disabled: false
      }
    },
    normalizeOptions(options) {
      // Normalize the given options array
      if (isArray(options)) {
        return options.map(option => this.normalizeOption(option))
      } else if (isPlainObject(options)) {
        // Deprecate the object options format
        warn(OPTIONS_OBJECT_DEPRECATED_MSG, this.$options.name)
        // Normalize a `options` object to an array of options
        return keys(options).map(key => this.normalizeOption(options[key] || {}, key))
      }
      // If not an array or object, return an empty array
      /* istanbul ignore next */
      return []
    }
  }
}
