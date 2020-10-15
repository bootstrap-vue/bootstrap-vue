import Vue, { mergeData } from '../../vue'
import { NAME_DROPDOWN_HEADER } from '../../constants/components'

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

// @vue/component
export const BDropdownHeader = /*#__PURE__*/ Vue.extend({
  name: NAME_DROPDOWN_HEADER,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const $attrs = data.attrs || {}
    data.attrs = {}
    return h('li', mergeData(data, { attrs: { role: 'presentation' } }), [
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
