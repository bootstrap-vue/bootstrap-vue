import Vue, { mergeData } from '../../vue'
import { NAME_DROPDOWN_TEXT } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'

// @vue/component
export const BDropdownText = /*#__PURE__*/ Vue.extend({
  name: NAME_DROPDOWN_TEXT,
  functional: true,
  props: makePropsConfigurable(
    {
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
    NAME_DROPDOWN_TEXT
  ),
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
