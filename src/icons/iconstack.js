import { defineComponent, h, mergeProps } from '../vue'
import { NAME_ICONSTACK } from '../constants/components'
import { commonIconProps, BVIconBase } from './helpers/icon-base'

// @vue/component
export const BIconstack = /*#__PURE__*/ defineComponent({
  name: NAME_ICONSTACK,
  functional: true,
  props: commonIconProps,
  render(_, { props, data, children }) {
    return h(
      BVIconBase,
      mergeProps(data, { staticClass: 'b-iconstack', props: { ...props, stacked: false } }),
      children
    )
  }
})
