import { NAME_DROPDOWN_DIVIDER } from '../../constants/components'
import Vue, { mergeData } from '../../utils/vue'

export const props = {
  tag: {
    type: String,
    default: 'hr'
  }
}

// @vue/component
export const BDropdownDivider = /*#__PURE__*/ Vue.extend({
  name: NAME_DROPDOWN_DIVIDER,
  functional: true,
  props,
  render(h, { props, data }) {
    const $attrs = data.attrs || {}
    data.attrs = {}
    return h('li', mergeData(data, { attrs: { role: 'presentation' } }), [
      h(props.tag, {
        staticClass: 'dropdown-divider',
        attrs: {
          ...$attrs,
          role: 'separator',
          'aria-orientation': 'horizontal'
        },
        ref: 'divider'
      })
    ])
  }
})
