import { extend, mergeData } from '../../vue'
import { NAME_INPUT_GROUP_PREPEND } from '../../constants/components'
import { omit } from '../../utils/object'
import { makePropsConfigurable } from '../../utils/props'
import { BInputGroupAddon, props as BInputGroupAddonProps } from './input-group-addon'

// --- Props ---

export const props = makePropsConfigurable(
  omit(BInputGroupAddonProps, ['append']),
  NAME_INPUT_GROUP_PREPEND
)

// --- Main component ---

// @vue/component
export const BInputGroupPrepend = /*#__PURE__*/ extend({
  name: NAME_INPUT_GROUP_PREPEND,
  functional: true,
  props,
  render(h, { props, data, children }) {
    // Pass all our data down to child, and set `append` to `true`
    return h(
      BInputGroupAddon,
      mergeData(data, {
        props: { ...props, append: false }
      }),
      children
    )
  }
})
