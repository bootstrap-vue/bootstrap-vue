import Vue, { mergeData } from '../../utils/vue'
import { getComponentConfig } from '../../utils/config'

const NAME = 'BSkeleton'

// @vue/component
export const BSkeleton = /*#__PURE__*/ Vue.extend({
  name: NAME,
  functional: true,
  props: {
    animation: {
      type: String,
      default: () => getComponentConfig(NAME, 'animation')
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
  },
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
