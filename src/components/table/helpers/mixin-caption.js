import { htmlOrText } from '../../../utils/html'

export default {
  props: {
    // `caption-top` is part of table-render mixin (styling)
    // captionTop: {
    //   type: Boolean,
    //   default: false
    // },
    caption: {
      type: String
      // default: null
    },
    captionHtml: {
      type: String
    }
  },
  computed: {
    captionId() {
      // Even though `this.safeId` looks like a method, it is a computed prop
      // that returns a new function if the underlying ID changes
      return this.isStacked ? this.safeId('_caption_') : null
    }
  },
  methods: {
    renderCaption() {
      const { caption, captionHtml } = this
      const h = this.$createElement

      let $caption = h()
      const hasCaptionSlot = this.hasNormalizedSlot('table-caption')
      if (hasCaptionSlot || caption || captionHtml) {
        $caption = h(
          'caption',
          {
            key: 'caption',
            attrs: { id: this.captionId },
            domProps: hasCaptionSlot ? {} : htmlOrText(captionHtml, caption)
          },
          this.normalizeSlot('table-caption')
        )
      }

      return $caption
    }
  }
}
