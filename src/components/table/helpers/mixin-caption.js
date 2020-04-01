import { htmlOrText } from '../../../utils/html'

export default {
  props: {
    // `caption-top` is part of table-redere mixin (styling)
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
      const h = this.$createElement

      // Build the caption
      const $captionSlot = this.normalizeSlot('table-caption')
      let $caption = h()

      if ($captionSlot || this.caption || this.captionHtml) {
        const data = {
          key: 'caption',
          attrs: { id: this.captionId }
        }
        if (!$captionSlot) {
          data.domProps = htmlOrText(this.captionHtml, this.caption)
        }
        $caption = h('caption', data, [$captionSlot])
      }

      return $caption
    }
  }
}
