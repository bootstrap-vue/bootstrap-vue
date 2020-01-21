import Vue from '../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import { commonIconProps, BVIconBase } from './helpers/make-icon'

// @vue/component
export const BIconstack = /*#__PURE__*/ Vue.extend({
  name: 'BIconstack',
  functional: true,
  props: { ...commonIconProps },
  render(h, { data, props, children }) {
    return h(BVIconBase, mergeData(data, { props: { ...props, stacked: false } }), children)
  }
})
