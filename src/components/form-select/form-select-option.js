import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import { htmlOrText } from '../../utils/html'

const NAME = 'BFormSelectOption'

export const props = {
  value: {
    // type: [String, Number, Boolean, Object],
    required: true
  },
  text: {
    type: String,
    default: null
  },
  html: {
    type: String,
    default: null
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
  render(h, { props, data }) {
    const { value, text, html, disabled } = props
    return h(
      'option',
      mergeData(data, {
        attrs: { disabled },
        domProps: { ...htmlOrText(html, text), value }
      })
    )
  }
})
