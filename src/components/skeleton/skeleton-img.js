import { NAME_SKELETON_IMG } from '../../constants/components'
import Vue from '../../utils/vue'
import { BAspect } from '../aspect'
import { BSkeleton } from './skeleton'

// @vue/component
export const BSkeletonImg = /*#__PURE__*/ Vue.extend({
  name: NAME_SKELETON_IMG,
  functional: true,
  props: {
    animation: {
      type: String
    },
    aspect: {
      type: String,
      default: '16:9'
    },
    noAspect: {
      type: Boolean,
      default: false
    },
    height: {
      type: String
    },
    width: {
      type: String
    },
    variant: {
      type: String
    },
    cardImg: {
      type: String
    }
  },
  render(h, { props }) {
    const { aspect, width, height, animation, variant, cardImg } = props

    const $img = h(BSkeleton, {
      props: {
        type: 'img',
        width,
        height,
        animation,
        variant
      },
      class: { [`card-img-${cardImg}`]: cardImg }
    })

    return props.noAspect ? $img : h(BAspect, { props: { aspect } }, [$img])
  }
})
