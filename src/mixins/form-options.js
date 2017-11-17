import { isArray } from '../utils/array'
import { keys } from '../utils/object'

function isObject (obj) {
  return obj && ({}).toString.call(obj) === '[object Object]'
}

export default {
  props: {
    options: {
      type: [Array, Object],
      default () {
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
    disabledField: {
      type: String,
      default: 'disabled'
    }
  },
  computed: {
    formOptions () {
      let options = this.options || []

      const valueField = this.valueField || 'value'
      const textField = this.textField || 'text'
      const disabledField = this.disabledField || 'disabled'

      if (isArray(options)) {
        // Normalize flat-ish arrays to Array of Objects
        return options.map(option => {
          if (isObject(option)) {
            return {
              value: option[valueField],
              text: String(option[textField]),
              disabled: option[disabledField] || false
            }
          }
          return {
            text: String(option),
            value: option,
            disabled: false
          }
        })
      } else if (isObject(options)) {
        // Normalize Objects to Array of Objects
        return keys(options).map(key => {
          let option = options[key] || {}
          if (isObject(option)) {
            const value = option[valueField]
            const text = option[textField]
            return {
              text: typeof text === 'undefined' ? key : String(text),
              value: typeof value === 'undefined' ? key : value,
              disabled: option[disabledField] || false
            }
          }
          return {
            text: String(option),
            value: key,
            disabled: false
          }
        })
      }
      // Option unsupported type
      return []
    }
  }
}
