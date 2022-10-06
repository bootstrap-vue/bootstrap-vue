import { extend, mergeData } from '../../vue'
import { NAME_CARD_IMG } from '../../constants/components'
import { PROP_TYPE_BOOLEAN } from '../../constants/props'
import { pick, sortKeys } from '../../utils/object'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { props as BImgProps } from '../image/img'

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...pick(BImgProps, ['src', 'alt', 'width', 'height', 'left', 'right']),
    bottom: makeProp(PROP_TYPE_BOOLEAN, false),
    end: makeProp(PROP_TYPE_BOOLEAN, false),
    start: makeProp(PROP_TYPE_BOOLEAN, false),
    top: makeProp(PROP_TYPE_BOOLEAN, false)
  }),
  NAME_CARD_IMG
)

// --- Main component ---

// @vue/component
export const BCardImg = /*#__PURE__*/ extend({
  name: NAME_CARD_IMG,
  functional: true,
  props,
  render(h, { props, data }) {
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
      mergeData(data, {
        class: baseClass,
        attrs: { src, alt, width, height }
      })
    )
  }
})
