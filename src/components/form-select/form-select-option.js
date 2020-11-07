import Vue, { mergeData } from '../../vue'
import { NAME_FORM_SELECT_OPTION } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'

export const props = makePropsConfigurable(
  {
    value: {
      // type: [String, Number, Boolean, Object],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  NAME_FORM_SELECT_OPTION
)

// @vue/component
export const BFormSelectOption = /*#__PURE__*/ Vue.extend({
  name: NAME_FORM_SELECT_OPTION,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const { value, disabled } = props
    return h(
      'option',
      mergeData(data, {
        attrs: { disabled },
        domProps: { value }
      }),
      children
    )
  }
})
