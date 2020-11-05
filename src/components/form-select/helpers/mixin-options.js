import get from '../../../utils/get'
import { makePropsConfigurable } from '../../../utils/config'
import { isNull, isPlainObject, isUndefined } from '../../../utils/inspect'
import formOptionsMixin, { props as formOptionsProps } from '../../../mixins/form-options'

// @vue/component
export default {
  mixins: [formOptionsMixin],
  props: makePropsConfigurable(
    {
      ...formOptionsProps,
      labelField: {
        type: String,
        default: 'label'
      },
      optionsField: {
        type: String,
        default: 'options'
      }
    },
    'formOptions'
  ),
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
}
