import Vue from 'vue'
import { mergeData } from 'vue-functional-data-merge'
import InputGroupAddon, { commonProps } from './input-group-addon'

// @vue/component
export default Vue.extend({
  name: 'BInputGroupAppend',
  functional: true,
  props: commonProps,
  render(h, { props, data, children }) {
    // pass all our props/attrs down to child, and set`append` to true
    return h(
      InputGroupAddon,
      mergeData(data, {
        props: { ...props, append: true }
      }),
      children
    )
  }
})
