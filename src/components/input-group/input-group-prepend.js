import { mergeData } from 'vue-functional-data-merge'
import InputGroupAddon, { commonProps } from './input-group-addon'

// @vue/component
export default {
  name: 'BInputGroupPrepend',
  functional: true,
  props: commonProps,
  render(h, { props, data, children }) {
    // pass all our props/attrs down to child, and set`append` to false
    return h(
      InputGroupAddon,
      mergeData(data, {
        props: { ...props, append: false }
      }),
      children
    )
  }
}
