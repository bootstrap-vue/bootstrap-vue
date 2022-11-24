import { extend, mergeData } from '../vue'
import { NAME_ICONSTACK } from '../constants/components'
import { omit } from '../utils/object'
import { makePropsConfigurable } from '../utils/props'
import { BVIconBase, props as BVIconBaseProps } from './helpers/icon-base'

// --- Props ---

export const props = makePropsConfigurable(
  omit(BVIconBaseProps, ['content', 'stacked']),
  NAME_ICONSTACK
)

// --- Main component ---

// @vue/component
export const BIconstack = /*#__PURE__*/ extend({
  name: NAME_ICONSTACK,
  functional: true,
  props,
  render(h, { data, props, children }) {
    return h(
      BVIconBase,
      mergeData(data, {
        staticClass: 'b-iconstack',
        props
      }),
      children
    )
  }
})
