import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_INPUT_GROUP_APPEND } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import { BInputGroupAddon, commonProps } from './input-group-addon'

// @vue/component
export const BInputGroupAppend = /*#__PURE__*/ defineComponent({
  name: NAME_INPUT_GROUP_APPEND,
  functional: true,
  props: makePropsConfigurable(commonProps, NAME_INPUT_GROUP_APPEND),
  render(_, { props, data, children }) {
    // Pass all our data down to child, and set `append` to `true`
    return h(
      BInputGroupAddon,
      mergeProps(data, {
        props: { ...props, append: true }
      }),
      children
    )
  }
})
