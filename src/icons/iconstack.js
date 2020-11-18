import { defineComponent, h, mergeData } from '../vue'
import { NAME_ICONSTACK } from '../constants/components'
import { makePropsConfigurable } from '../utils/config'
import { commonIconProps, BVIconBase } from './helpers/icon-base'

// @vue/component
export const BIconstack = /*#__PURE__*/ defineComponent({
  name: NAME_ICONSTACK,
  functional: true,
  props: makePropsConfigurable(commonIconProps, NAME_ICONSTACK),
  render(_, { data, props, children }) {
    return h(
      BVIconBase,
      mergeData(data, { staticClass: 'b-iconstack', props: { ...props, stacked: false } }),
      children
    )
  }
})
