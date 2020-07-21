import Vue from '../../utils/vue'
import { BAspect } from '../aspect'
import { BSkeleton } from './skeleton'

const NAME = 'BSkeletonImage'

// @vue/component
export const BSkeletonImage = /*#__PURE__*/ Vue.extend({
  name: NAME,
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
    cardImage: {
      type: String
    }
  },
  render(h, { props }) {
    const { aspect, width, height, animation, variant, cardImage } = props

    const $image = h(BSkeleton, {
      props: {
        type: 'image',
        width,
        height,
        animation,
        variant
      },
      class: { [`card-img-${cardImage}`]: cardImage }
    })

    return props.noAspect ? $image : h(BAspect, { props: { aspect } }, [$image])
  }
})
