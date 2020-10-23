import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_INPUT_GROUP_PREPEND } from '../../constants/components'
import { BInputGroupAddon, commonProps } from './input-group-addon'

// @vue/component
export const BInputGroupPrepend = /*#__PURE__*/ defineComponent({
  name: NAME_INPUT_GROUP_PREPEND,
  functional: true,
  props: commonProps,
  render(_, { props, data, children }) {
    // pass all our props/attrs down to child, and set`append` to false
    return h(
      BInputGroupAddon,
      mergeProps(data, {
        props: { ...props, append: false }
      }),
      children
    )
  }
})
