import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'

export const props = {
  textTag: {
    type: String,
    default: 'a'
  }
}

// @vue/component
export const BNavItemDropdownText = /*#__PURE__*/ Vue.extend({
  name: 'BNavItemDropdownText',
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(props.textTag, mergeData(data, { staticClass: 'nav-link' }), children)
  }
})
