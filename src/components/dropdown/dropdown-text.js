import Vue, { mergeData } from '../../utils/vue'

// @vue/component
export const BDropdownText = /*#__PURE__*/ Vue.extend({
  name: 'BDropdownText',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'p'
    },
    textClass: {
      type: [String, Array, Object]
      // default: null
    },
    variant: {
      type: String
      // default: null
    }
  },
  render(h, { props, data, children }) {
    const { tag, textClass, variant } = props

    const attrs = data.attrs || {}
    data.attrs = {}

    return h('li', mergeData(data, { attrs: { role: 'presentation' } }), [
      h(
        tag,
        {
          staticClass: 'b-dropdown-text',
          class: [textClass, { [`text-${variant}`]: variant }],
          props,
          attrs,
          ref: 'text'
        },
        children
      )
    ])
  }
})
