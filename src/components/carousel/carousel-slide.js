import {
  CLASS_NAME_CAROUSEL,
  CLASS_NAME_CAROUSEL_ITEM,
  CLASS_NAME_DISPLAY_NONE
} from '../../constants/class-names'
import { NAME_CAROUSEL_SLIDE } from '../../constants/components'
import { ROLE_LISTITEM } from '../../constants/roles'
import Vue from '../../utils/vue'
import { hasTouchSupport } from '../../utils/env'
import { htmlOrText } from '../../utils/html'
import { pluckProps, unprefixPropName } from '../../utils/props'
import { suffixClass } from '../../utils/string'
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
    let $img = this.normalizeSlot('img')
    if (!$img && (this.imgSrc || this.imgBlank)) {
      const on = {}
      // Touch support event handler
      /* istanbul ignore if: difficult to test in JSDOM */
      if (!this.bvCarousel.noTouch && hasTouchSupport) {
        on.dragstart = evt => {
          evt.preventDefault()
        }
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
      this.normalizeSlot('default') || false
    ]

    let $content = h()
    if ($contentChildren.some(Boolean)) {
      $content = h(
        this.contentTag,
        {
          staticClass: suffixClass(CLASS_NAME_CAROUSEL, 'caption'),
          class: this.contentClasses
        },
        $contentChildren.map($child => $child || h())
      )
    }

    return h(
      'div',
      {
        staticClass: CLASS_NAME_CAROUSEL_ITEM,
        style: { background: this.background || this.bvCarousel.background || null },
        attrs: { id: this.safeId(), role: ROLE_LISTITEM }
      },
      [$img, $content]
    )
  }
})
