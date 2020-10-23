import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_DROPDOWN_HEADER } from '../../constants/components'

// --- Props ---

export const props = {
  id: {
    type: String
    // default: null
  },
  tag: {
    type: String,
    default: 'header'
  },
  variant: {
    type: String
    // default: null
  }
}

// --- Main component ---
// @vue/component
export const BDropdownHeader = /*#__PURE__*/ defineComponent({
  name: NAME_DROPDOWN_HEADER,
  functional: true,
  props,
  render(_, { props, data, children }) {
    const $attrs = data.attrs || {}
    data.attrs = {}
    return h('li', mergeProps(data, { attrs: { role: 'presentation' } }), [
      h(
        props.tag,
        {
          staticClass: 'dropdown-header',
          class: {
            [`text-${props.variant}`]: props.variant
          },
          attrs: {
            ...$attrs,
            id: props.id || null,
            role: 'heading'
          },
          ref: 'header'
        },
        children
      )
    ])
  }
})
