import Vue from '../../utils/vue'
import { getComponentConfig } from '../../utils/config'
import { mergeData } from 'vue-functional-data-merge'

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
      type: String
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
    const type = props.type || 'text'

    return h(
      'div',
      mergeData(data, {
        staticClass: 'b-skeleton',
        style: {
          width: props.size || props.width,
          height: props.size || props.height
        },
        class: {
          [`b-skeleton-${type}`]: true,
          [`b-skeleton-animate-${props.animation}`]: props.animation,
          [`bg-${props.variant}`]: props.variant
        }
      })
    )
  }
})
