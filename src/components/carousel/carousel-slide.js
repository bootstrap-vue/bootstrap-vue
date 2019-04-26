import Vue from '../../utils/vue'
import BImg from '../image/img'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { hasTouchSupport } from '../../utils/env'
import { htmlOrText } from '../../utils/html'

export const props = {
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
  },
  contentTag: {
    type: String,
    default: 'div'
  },
  caption: {
    type: String
  },
  captionHtml: {
    type: String
  },
  captionTag: {
    type: String,
    default: 'h3'
  },
  text: {
    type: String
  },
  textHtml: {
    type: String
  },
  textTag: {
    type: String,
    default: 'p'
  },
  background: {
    type: String
  }
}

// @vue/component
export default Vue.extend({
  name: 'BCarouselSlide',
  mixins: [idMixin, normalizeSlotMixin],
  inject: {
    bvCarousel: {
      default() {
        return {
          // Explicitly disable touch if not a child of carousel
          noTouch: true
        }
      }
    }
  },
  props,
  data() {
    return {}
  },
  computed: {
    contentClasses() {
      return [
        this.contentVisibleUp ? 'd-none' : '',
        this.contentVisibleUp ? `d-${this.contentVisibleUp}-block` : ''
      ]
    },
    computedWidth() {
      // Use local width, or try parent width
      return this.imgWidth || this.bvCarousel.imgWidth || null
    },
    computedHeight() {
      // Use local height, or try parent height
      return this.imgHeight || this.bvCarousel.imgHeight || null
    }
  },
  render(h) {
    const noDrag = !this.bvCarousel.noTouch && hasTouchSupport

    let img = this.normalizeSlot('img')
    if (!img && (this.imgSrc || this.imgBlank)) {
      img = h(BImg, {
        props: {
          fluidGrow: true,
          block: true,
          src: this.imgSrc,
          blank: this.imgBlank,
          blankColor: this.imgBlankColor,
          width: this.computedWidth,
          height: this.computedHeight,
          alt: this.imgAlt
        },
        // Touch support event handler
        on: noDrag
          ? {
              dragstart: e => {
                /* istanbul ignore next: difficult to test in JSDOM */
                e.preventDefault()
              }
            }
          : {}
      })
    }
    if (!img) {
      img = h(false)
    }

    const content = h(
      this.contentTag,
      { staticClass: 'carousel-caption', class: this.contentClasses },
      [
        this.caption || this.captionHtml
          ? h(this.captionTag, {
              domProps: htmlOrText(this.captionHtml, this.caption)
            })
          : h(false),
        this.text || this.textHtml
          ? h(this.textTag, { domProps: htmlOrText(this.textHtml, this.text) })
          : h(false),
        this.normalizeSlot('default')
      ]
    )

    return h(
      'div',
      {
        staticClass: 'carousel-item',
        style: { background: this.background || this.bvCarousel.background || null },
        attrs: { id: this.safeId(), role: 'listitem' }
      },
      [img, content]
    )
  }
})
