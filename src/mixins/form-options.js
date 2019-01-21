import { isArray } from '../utils/array'
import { keys } from '../utils/object'
import { stripTags } from '../utils/html'

function isObject(obj) {
  return obj && {}.toString.call(obj) === '[object Object]'
}

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
      let options = this.options

      const valueField = this.valueField
      const textField = this.textField
      const htmlField = this.htmlField
      const disabledField = this.disabledField

      if (isArray(options)) {
        // Normalize flat-ish arrays to Array of Objects
        return options.map(option => {
          if (isObject(option)) {
            return {
              value: option[valueField],
              text: stripTags(String(option[textField])),
              html: option[htmlField],
              disabled: option[disabledField] || false
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
          let option = options[key] || {}
          if (isObject(option)) {
            const value = option[valueField]
            const text = option[textField]
            return {
              value: typeof value === 'undefined' ? key : value,
              text: typeof text === 'undefined' ? key : stripTags(String(text)),
              html: option[htmlField],
              disabled: option[disabledField] || false
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
