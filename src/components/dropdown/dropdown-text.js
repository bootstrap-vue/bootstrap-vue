import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_DROPDOWN_TEXT } from '../../constants/components'

// @vue/component
export const BDropdownText = /*#__PURE__*/ defineComponent({
  name: NAME_DROPDOWN_TEXT,
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
  render(_, { props, data, children }) {
    const { tag, textClass, variant } = props

    const attrs = data.attrs || {}
    data.attrs = {}

    return h('li', mergeProps(data, { attrs: { role: 'presentation' } }), [
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
