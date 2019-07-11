import { stripTags } from '../utils/html'
import { isArray, isPlainObject, isUndefined } from '../utils/inspect'
import { keys } from '../utils/object'

// @vue/component
export default {
  props: {
    options: {
      type: [Array, Object],
      default() {
        return []
      }
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
      const valueField = this.valueField
      const textField = this.textField
      const htmlField = this.htmlField
      const disabledField = this.disabledField

      if (isArray(options)) {
        // Normalize flat-ish arrays to Array of Objects
        return options.map(option => {
          if (isPlainObject(option)) {
            const value = option[valueField]
            const text = String(option[textField])
            return {
              value: isUndefined(value) ? text : value,
              text: stripTags(text),
              html: option[htmlField],
              disabled: Boolean(option[disabledField])
            }
          }
          return {
            value: option,
            text: stripTags(String(option)),
            disabled: false
          }
        })
      } else {
        // options is Object
        // Normalize Objects to Array of Objects
        return keys(options).map(key => {
          const option = options[key] || {}
          if (isPlainObject(option)) {
            const value = option[valueField]
            const text = option[textField]
            return {
              value: isUndefined(value) ? key : value,
              text: isUndefined(text) ? stripTags(String(key)) : stripTags(String(text)),
              html: option[htmlField],
              disabled: Boolean(option[disabledField])
            }
          }
          return {
            value: key,
            text: stripTags(String(option)),
            disabled: false
          }
        })
      }
    }
  }
}
