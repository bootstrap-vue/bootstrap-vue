import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'

// @vue/component
export const BDropdownText = /*#__PURE__*/ Vue.extend({
  name: 'BDropdownText',
  functional: true,
  inheritAttrs: false,
  props: {
    tag: {
      type: String,
      default: 'p'
    },
    variant: {
      type: String,
      default: null
    }
  },
  render(h, { props, data, children }) {
    return h('li', [
      h(
        props.tag,
        mergeData(data, {
          staticClass: 'b-dropdown-text',
          class: {
            [`text-${props.variant}`]: props.variant
          },
          props,
          ref: 'text'
        }),
        children
      )
    ])
  }
})

export default BDropdownText
