import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import { BInputGroupAddon, commonProps } from './input-group-addon'

// @vue/component
export const BInputGroupPrepend = /*#__PURE__*/ Vue.extend({
  name: 'BInputGroupPrepend',
  functional: true,
  props: commonProps,
  render(h, { props, data, children }) {
    // pass all our props/attrs down to child, and set`append` to false
    return h(
      BInputGroupAddon,
      mergeData(data, {
        props: { ...props, append: false }
      }),
      children
    )
  }
})

export default BInputGroupPrepend
