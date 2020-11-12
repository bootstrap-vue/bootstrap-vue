import Vue, { mergeData } from '../../vue'
import { NAME_SKELETON } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'

// @vue/component
export const BSkeleton = /*#__PURE__*/ Vue.extend({
  name: NAME_SKELETON,
  functional: true,
  props: makePropsConfigurable(
    {
      animation: {
        type: String,
        default: 'wave'
      },
      type: {
        type: String,
        default: 'text'
      },
      width: {
        type: String
        // default: null
      },
      height: {
        type: String
        // default: null
      },
      size: {
        type: String
        // default: null
      },
      variant: {
        type: String
        // default: null
      }
    },
    NAME_SKELETON
  ),
  render(h, { data, props }) {
    const { size, animation, variant } = props

    return h(
      'div',
      mergeData(data, {
        staticClass: 'b-skeleton',
        style: {
          width: size || props.width,
          height: size || props.height
        },
        class: {
          [`b-skeleton-${props.type}`]: true,
          [`b-skeleton-animate-${animation}`]: animation,
          [`bg-${variant}`]: variant
        }
      })
    )
  }
})
