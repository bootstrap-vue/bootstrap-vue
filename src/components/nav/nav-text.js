import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'

export const props = {}

// @vue/component
export const BNavText = /*#__PURE__*/ Vue.extend({
  name: 'BNavText',
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h('li', mergeData(data, { staticClass: 'navbar-text' }), children)
  }
})
