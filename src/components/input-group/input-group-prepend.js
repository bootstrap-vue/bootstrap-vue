import { NAME_INPUT_GROUP_PREPEND } from '../../constants/components'
import Vue, { mergeData } from '../../utils/vue'
import { BInputGroupAddon, commonProps } from './input-group-addon'

// @vue/component
export const BInputGroupPrepend = /*#__PURE__*/ Vue.extend({
  name: NAME_INPUT_GROUP_PREPEND,
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
