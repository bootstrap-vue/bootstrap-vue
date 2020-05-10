import {
  CLASS_NAME_CAROUSEL,
  CLASS_NAME_CAROUSEL_ITEM,
  CLASS_NAME_DISPLAY_NONE
} from '../../constants/class-names'
import { NAME_CAROUSEL_SLIDE } from '../../constants/components'
import { ROLE_LISTITEM } from '../../constants/roles'
import Vue from '../../utils/vue'
import identity from '../../utils/identity'
import idMixin from '../../mixins/id'
import { hasTouchSupport } from '../../utils/env'
import { htmlOrText } from '../../utils/html'
import { suffixClass } from '../../utils/string'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BImg } from '../image/img'

// --- Props ---
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

// --- Main component ---
// @vue/component
export const BCarouselSlide = /*#__PURE__*/ Vue.extend({
  name: NAME_CAROUSEL_SLIDE,
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
  computed: {
    contentClasses() {
      const { contentVisibleUp } = this
      return contentVisibleUp ? [CLASS_NAME_DISPLAY_NONE, `d-${this.contentVisibleUp}-block`] : []
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
          ? /* istanbul ignore next */ {
              dragstart /* istanbul ignore next */: e => {
                /* istanbul ignore next: difficult to test in JSDOM */
                e.preventDefault()
              }
            }
          : {}
      })
    }
    img = img || h()

    let content = h()
    const contentChildren = [
      this.caption || this.captionHtml
        ? h(this.captionTag, { domProps: htmlOrText(this.captionHtml, this.caption) })
        : null,
      this.text || this.textHtml
        ? h(this.textTag, { domProps: htmlOrText(this.textHtml, this.text) })
        : null,
      this.normalizeSlot('default')
    ]
    if (contentChildren.some(identity)) {
      content = h(
        this.contentTag,
        {
          staticClass: suffixClass(CLASS_NAME_CAROUSEL, 'caption'),
          class: this.contentClasses
        },
        contentChildren.map(i => i || h())
      )
    }

    return h(
      'div',
      {
        staticClass: CLASS_NAME_CAROUSEL_ITEM,
        style: { background: this.background || this.bvCarousel.background || null },
        attrs: { id: this.safeId(), role: ROLE_LISTITEM }
      },
      [img, content]
    )
  }
})
