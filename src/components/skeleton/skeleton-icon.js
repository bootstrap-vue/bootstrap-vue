import { NAME_SKELETON_ICON } from '../../constants/components'
import Vue from '../../utils/vue'
import { getComponentConfig } from '../../utils/config'
import { BIcon } from '../../icons'

// @vue/component
export const BSkeletonIcon = /*#__PURE__*/ Vue.extend({
  name: NAME_SKELETON_ICON,
  functional: true,
  props: {
    animation: {
      type: String,
      default: () => getComponentConfig(NAME_SKELETON_ICON, 'animation')
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
    const { icon, animation } = props

    const $icon = h(BIcon, {
      props: { icon, ...props.iconProps },
      staticClass: 'b-skeleton-icon'
    })

    return h(
      'div',
      {
        staticClass: 'b-skeleton-icon-wrapper position-relative d-inline-block overflow-hidden',
        class: { [`b-skeleton-animate-${animation}`]: animation }
      },
      [$icon]
    )
  }
})
