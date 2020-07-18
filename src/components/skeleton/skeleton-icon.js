import Vue from '../../utils/vue'
import { getComponentConfig } from '../../utils/config'
import { BIcon } from '../../icons'

const NAME = 'BSkeletonIcon'

// @vue/component
export const BSkeletonIcon = /*#__PURE__*/ Vue.extend({
  name: NAME,
  functional: true,
  props: {
    animation: {
      type: String,
      default: () => getComponentConfig(NAME, 'animation')
    },
    icon: {
      type: String
    },
    iconProps: {
      type: Object,
      default: () => {}
    }
  },
  render(h, { props }) {
    const $icon = h(BIcon, {
      props: { icon: props.icon, ...props.iconProps },
      staticClass: 'b-skeleton-icon'
    })

    return h(
      'div',
      {
        staticClass: 'b-skeleton-icon-wrapper position-relative d-inline-block overflow-hidden',
        class: {
          [`b-skeleton-animate-${props.animation}`]: props.animation
        }
      },
      [$icon]
    )
  }
})
