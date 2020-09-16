import { NAME_CAROUSEL_SLIDE } from '../../constants/components'
import Vue from '../../utils/vue'
import { hasTouchSupport } from '../../utils/env'
import { stopEvent } from '../../utils/events'
import { htmlOrText } from '../../utils/html'
import { pluckProps, unprefixPropName } from '../../utils/props'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BImg } from '../image/img'

// --- Props ---

const imgProps = {
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
  }
}

export const props = {
  ...imgProps,
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
    let $img = this.normalizeSlot('img')
    if (!$img && (this.imgSrc || this.imgBlank)) {
      const on = {}
      // Touch support event handler
      /* istanbul ignore if: difficult to test in JSDOM */
      if (!this.bvCarousel.noTouch && hasTouchSupport) {
        on.dragstart = evt => stopEvent(evt, { propagation: false })
      }

      $img = h(BImg, {
        props: {
          ...pluckProps(imgProps, this.$props, unprefixPropName.bind(null, 'img')),
          width: this.computedWidth,
          height: this.computedHeight,
          fluidGrow: true,
          block: true
        },
        on
      })
    }

    const $contentChildren = [
      // Caption
      this.caption || this.captionHtml
        ? h(this.captionTag, { domProps: htmlOrText(this.captionHtml, this.caption) })
        : false,
      // Text
      this.text || this.textHtml
        ? h(this.textTag, { domProps: htmlOrText(this.textHtml, this.text) })
        : false,
      // Children
      this.normalizeSlot() || false
    ]

    let $content = h()
    if ($contentChildren.some(Boolean)) {
      $content = h(
        this.contentTag,
        {
          staticClass: 'carousel-caption',
          class: this.contentClasses
        },
        $contentChildren.map($child => $child || h())
      )
    }

    return h(
      'div',
      {
        staticClass: 'carousel-item',
        style: { background: this.background || this.bvCarousel.background || null },
        attrs: { id: this.safeId(), role: 'listitem' }
      },
      [$img, $content]
    )
  }
})
