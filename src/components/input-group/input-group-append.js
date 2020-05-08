import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import { BInputGroupAddon, commonProps } from './input-group-addon'

// @vue/component
export const BInputGroupAppend = /*#__PURE__*/ Vue.extend({
  name: 'BInputGroupAppend',
  functional: true,
  props: commonProps,
  render(h, { props, data, children }) {
    // Pass all our data down to child, and set `append` to `true`
    return h(
      BInputGroupAddon,
      mergeData(data, {
        props: { ...props, append: true }
      }),
      children
    )
  }
})
