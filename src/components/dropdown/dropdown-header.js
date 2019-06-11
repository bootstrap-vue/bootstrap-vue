import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'

export const props = {
  id: {
    type: String,
    default: null
  },
  tag: {
    type: String,
    default: 'header'
  },
  variant: {
    type: String,
    default: null
  }
}

// @vue/component
export const BDropdownHeader = /*#__PURE__*/ Vue.extend({
  name: 'BDropdownHeader',
  functional: true,
  inheritAttrs: false,
  props,
  render(h, { props, data, children }) {
    return h('li', [
      h(
        props.tag,
        mergeData(data, {
          staticClass: 'dropdown-header',
          class: {
            [`text-${props.variant}`]: props.variant
          },
          attrs: {
            id: props.id || null,
            role: 'heading'
          },
          ref: 'header'
        }),
        children
      )
    ])
  }
})

export default BDropdownHeader
