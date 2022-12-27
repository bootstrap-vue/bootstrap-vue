import { extend } from '../../../vue'
import { PROP_TYPE_STRING } from '../../../constants/props'
import { SLOT_NAME_TABLE_CAPTION } from '../../../constants/slots'
import { htmlOrText } from '../../../utils/html'
import { makeProp } from '../../../utils/props'

// --- Props ---

export const props = {
  caption: makeProp(PROP_TYPE_STRING),
  captionHtml: makeProp(PROP_TYPE_STRING)
  // `caption-top` is part of table-render mixin (styling)
  // captionTop: makeProp(PROP_TYPE_BOOLEAN, false)
}

// --- Mixin ---

// @vue/component
export const captionMixin = extend({
  props,
  computed: {
    captionId() {
      return this.isStacked ? this.safeId('_caption_') : null
    }
  },
  methods: {
    renderCaption() {
      const { caption, captionHtml } = this
      const h = this.$createElement

      let $caption = h()
      const hasCaptionSlot = this.hasNormalizedSlot(SLOT_NAME_TABLE_CAPTION)
      if (hasCaptionSlot || caption || captionHtml) {
        $caption = h(
          'caption',
          {
            attrs: { id: this.captionId },
            domProps: hasCaptionSlot ? {} : htmlOrText(captionHtml, caption),
            key: 'caption',
            ref: 'caption'
          },
          this.normalizeSlot(SLOT_NAME_TABLE_CAPTION)
        )
      }

      return $caption
    }
  }
})
