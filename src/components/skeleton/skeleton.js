import Vue, { mergeData } from '../../vue'
import { NAME_SKELETON } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'

// @vue/component
export const BSkeleton = /*#__PURE__*/ Vue.extend({
  name: NAME_SKELETON,
  functional: true,
  props: makePropsConfigurable({
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
    },
    height: {
      type: String
    },
    size: {
      type: String
    },
    variant: {
      type: String
    }
  }),
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
