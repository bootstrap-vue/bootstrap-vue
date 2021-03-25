import { Vue, mergeData } from '../../vue'
import { NAME_CARD_IMG_LAZY } from '../../constants/components'
import { keys, omit, sortKeys } from '../../utils/object'
import { makePropsConfigurable } from '../../utils/props'
import { props as BImgProps } from '../image/img'
import { BImgLazy, props as BImgLazyProps } from '../image/img-lazy'
import { props as BCardImgProps } from './card-img'

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...omit(BImgLazyProps, keys(BImgProps)),
    ...omit(BCardImgProps, ['src', 'alt', 'width', 'height'])
  }),
  NAME_CARD_IMG_LAZY
)

// --- Main component ---

// @vue/component
export const BCardImgLazy = /*#__PURE__*/ Vue.extend({
  name: NAME_CARD_IMG_LAZY,
  functional: true,
  props,
  render(h, { props, data }) {
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
      BImgLazy,
      mergeData(data, {
        class: [baseClass],
        // Exclude `left` and `right` props before passing to `<b-img-lazy>`
        props: omit(props, ['left', 'right'])
      })
    )
  }
})
