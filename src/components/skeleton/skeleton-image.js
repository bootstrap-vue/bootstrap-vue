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
    const $image = h(BSkeleton, {
      props: {
        type: 'image',
        width: props.width,
        height: props.height,
        animation: props.animation,
        variant: props.variant
      },
      class: {
        [`card-img-${props.cardImage}`]: props.cardImage
      }
    })
    if (props.noAspect) return $image
    else return h(BAspect, { props: { aspect: props.aspect } }, [$image])
  }
})
