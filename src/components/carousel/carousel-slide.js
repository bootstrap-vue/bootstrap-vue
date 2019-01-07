import BImg from '../image/img'
import idMixin from '../../mixins/id'
import { hasTouchSupport, hasPointerEvent } from '../../utils/env'

// @vue/component
export default {
  name: 'BCarouselSlide',
  components: { BImg },
  mixins: [ idMixin ],
  inject: {
    carousel: {
      from: 'carousel',
      default: function () {
        return {
          // Explicitly disable touch if not a child of carousel
          noTouch: true
        }
      }
    }
  },
  props: {
    imgSrc: {
      type: String
      // default: undefined
    },
    imgAlt: {
      type: String
      // default: undefined
    },
    imgWidth: {
      type: [Number, String]
      // default: undefined
    },
    imgHeight: {
      type: [Number, String]
      // default: undefined
    },
    imgBlank: {
      type: Boolean,
      default: false
    },
    imgBlankColor: {
      type: String,
      default: 'transparent'
    },
    contentVisibleUp: {
      type: String
      // default: undefined
    },
    contentTag: {
      type: String,
      default: 'div'
    },
    caption: {
      type: String
      // default: undefined
    },
    captionTag: {
      type: String,
      default: 'h3'
    },
    text: {
      type: String
      // default: undefined
    },
    textTag: {
      type: String,
      default: 'p'
    },
    background: {
      type: String
      // default: undefined
    }
  },
  data () {
    return {}
  },
  computed: {
    contentClasses () {
      return [
        this.contentVisibleUp ? 'd-none' : '',
        this.contentVisibleUp ? `d-${this.contentVisibleUp}-block` : ''
      ]
    },
    computedWidth () {
      // Use local width, or try parent width
      return this.imgWidth || this.carousel.imgWidth || null
    },
    computedHeight () {
      // Use local height, or try parent height
      return this.imgHeight || this.carousel.imgHeight || null
    }
  },
  render (h) {
    const $slots = this.$slots

    let img = $slots.img
    if (!img && (this.imgSrc || this.imgBlank)) {
      img = h(
        'b-img',
        {
          props: {
            fluidGrow: true,
            block: true,
            src: this.imgSrc,
            blank: this.imgBlank,
            blankColor: this.imgBlankColor,
            width: this.computedWidth,
            height: this.computedHeight,
            alt: this.imgAlt
          }
        }
      )
    }
    if (!img) {
      img = h(false)
    }

    const content = h(
      this.contentTag,
      { staticClass: 'carousel-caption', class: this.contentClasses },
      [
        this.caption ? h(this.captionTag, { domProps: { innerHTML: this.caption } }) : h(false),
        this.text ? h(this.textTag, { domProps: { innerHTML: this.text } }) : h(false),
        $slots.default
      ]
    )

    // Touch support event handlers
    const on = {}
    if (!this.carousel.noTouch && hasTouchSupport) {
      // Prevent default for dragstart
      on.dragstart = (evt) => { evt.preventDefault() }
    }

    return h(
      'div',
      {
        staticClass: 'carousel-item',
        class: {
          'pointer-event': !this.carousel.noTouch && hasTouchSupport && hasPointerEvent
        },
        style: { background: this.background || this.carousel.background || null },
        attrs: { id: this.safeId(), role: 'listitem' },
        on
      },
      [ img, content ]
    )
  }
}
