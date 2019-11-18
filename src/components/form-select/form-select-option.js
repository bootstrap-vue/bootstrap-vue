import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'

const NAME = 'BFormSelectOption'

export const props = {
  value: {
    // type: [String, Number, Boolean, Object],
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
}

// @vue/component
export const BFormSelectOption = /*#__PURE__*/ Vue.extend({
  name: NAME,
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
