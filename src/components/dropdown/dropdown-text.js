import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'

// @vue/component
export const BDropdownText = /*#__PURE__*/ Vue.extend({
  name: 'BDropdownText',
  functional: true,
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
    const $attrs = data.attrs || {}
    data.attrs = {}
    return h('li', mergeData(data, { attrs: { role: 'presentation' } }), [
      h(
        props.tag,
        {
          staticClass: 'b-dropdown-text',
          class: {
            [`text-${props.variant}`]: props.variant
          },
          props,
          attrs: $attrs,
          ref: 'text'
        },
        children
      )
    ])
  }
})
