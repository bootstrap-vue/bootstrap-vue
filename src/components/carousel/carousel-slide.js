import { extend } from '../../vue'
import { NAME_CAROUSEL_SLIDE } from '../../constants/components'
import { HAS_TOUCH_SUPPORT } from '../../constants/env'
import { PROP_TYPE_BOOLEAN, PROP_TYPE_NUMBER_STRING, PROP_TYPE_STRING } from '../../constants/props'
import { SLOT_NAME_IMG } from '../../constants/slots'
import { stopEvent } from '../../utils/events'
import { htmlOrText } from '../../utils/html'
import { identity } from '../../utils/identity'
import { sortKeys } from '../../utils/object'
import { makeProp, makePropsConfigurable, pluckProps, unprefixPropName } from '../../utils/props'
import { idMixin, props as idProps } from '../../mixins/id'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'
import { BImg } from '../image/img'

// --- Props ---

const imgProps = {
  imgAlt: makeProp(PROP_TYPE_STRING),
  imgBlank: makeProp(PROP_TYPE_BOOLEAN, false),
  imgBlankColor: makeProp(PROP_TYPE_STRING, 'transparent'),
  imgHeight: makeProp(PROP_TYPE_NUMBER_STRING),
  imgSrc: makeProp(PROP_TYPE_STRING),
  imgWidth: makeProp(PROP_TYPE_NUMBER_STRING)
}

export const props = makePropsConfigurable(
  sortKeys({
    ...idProps,
    ...imgProps,
    background: makeProp(PROP_TYPE_STRING),
    caption: makeProp(PROP_TYPE_STRING),
    captionHtml: makeProp(PROP_TYPE_STRING),
    captionTag: makeProp(PROP_TYPE_STRING, 'h3'),
    contentTag: makeProp(PROP_TYPE_STRING, 'div'),
    contentVisibleUp: makeProp(PROP_TYPE_STRING),
    text: makeProp(PROP_TYPE_STRING),
    textHtml: makeProp(PROP_TYPE_STRING),
    textTag: makeProp(PROP_TYPE_STRING, 'p')
  }),
  NAME_CAROUSEL_SLIDE
)

// --- Main component ---

// @vue/component
export const BCarouselSlide = /*#__PURE__*/ extend({
  name: NAME_CAROUSEL_SLIDE,
  mixins: [idMixin, normalizeSlotMixin],
  inject: {
    getBvCarousel: {
      // Explicitly disable touch if not a child of carousel
      default: () => () => ({ noTouch: true })
    }
  },
  props,
  computed: {
    bvCarousel() {
      return this.getBvCarousel()
    },
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
    let $img = this.normalizeSlot(SLOT_NAME_IMG)
    if (!$img && (this.imgSrc || this.imgBlank)) {
      const on = {}
      // Touch support event handler
      /* istanbul ignore if: difficult to test in JSDOM */
      if (!this.bvCarousel.noTouch && HAS_TOUCH_SUPPORT) {
        on.dragstart = event => stopEvent(event, { propagation: false })
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
    if ($contentChildren.some(identity)) {
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
