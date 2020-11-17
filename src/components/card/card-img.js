import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_CARD_IMG } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import { pick } from '../../utils/object'
import { props as BImgProps } from '../image/img'

// --- Props ---

export const props = makePropsConfigurable(
  {
    ...pick(BImgProps, ['src', 'alt', 'width', 'height', 'left', 'right']),
    top: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: Boolean,
      default: false
    },
    start: {
      type: Boolean,
      default: false
    },
    end: {
      type: Boolean,
      default: false
    }
  },
  NAME_CARD_IMG
)

// --- Main component ---

// @vue/component
export const BCardImg = /*#__PURE__*/ defineComponent({
  name: NAME_CARD_IMG,
  functional: true,
  props,
  render(_, { props, data }) {
    const { src, alt, width, height } = props

    let baseClass = 'card-img'
    if (props.top) {
      baseClass += '-top'
    } else if (props.right || props.end) {
      baseClass += '-right'
    } else if (props.bottom) {
      baseClass += '-bottom'
    } else if (props.left || props.start) {
      baseClass += '-left'
    }

    return h(
      'img',
      mergeProps(data, {
        class: baseClass,
        attrs: { src, alt, width, height }
      })
    )
  }
})
