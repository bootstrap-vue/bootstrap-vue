import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'

export const props = {
  tag: {
    type: String,
    default: 'hr'
  }
}

// @vue/component
export const BDropdownDivider = /*#__PURE__*/ Vue.extend({
  name: 'BDropdownDivider',
  functional: true,
  inheritAttrs: false,
  props,
  render(h, { props, data }) {
    return h('li', [
      h(
        props.tag,
        mergeData(data, {
          staticClass: 'dropdown-divider',
          attrs: {
            role: 'separator',
            'aria-orientation': 'horizontal'
          },
          ref: 'divider'
        })
      )
    ])
  }
})

export default BDropdownDivider
