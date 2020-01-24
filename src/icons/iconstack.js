import Vue from '../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import { commonIconProps, BVIconBase } from './helpers/icon-base'

// @vue/component
export const BIconstack = /*#__PURE__*/ Vue.extend({
  name: 'BIconstack',
  functional: true,
  props: { ...commonIconProps },
  render(h, { data, props, children }) {
    return h(
      BVIconBase,
      mergeData(data, { staticClass: 'b-iconstack', props: { ...props, stacked: false } }),
      children
    )
  }
})
