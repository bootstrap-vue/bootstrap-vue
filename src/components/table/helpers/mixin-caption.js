import { htmlOrText } from '../../../utils/html'

export default {
  props: {
    caption: {
      type: String,
      default: null
    },
    captionHtml: {
      type: String
    },
    captionTop: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    captionClasses() {
      return {
        'b-table-caption-top': this.captionTop
      }
    },
    captionId() {
      // Even though this.safeId looks like a method, it is a computed prop
      // that returns a new function if the underlying ID changes
      return this.isStacked ? this.safeId('_caption_') : null
    }
  },
  methods: {
    renderCaption(h) {
      // Build the caption
      const $slots = this.slots
      let $caption = h(false)

      if (this.caption || this.captionHtml || $slots['table-caption']) {
        const data = {
          key: 'caption',
          id: this.captionId,
          class: this.captionClasses
        }
        if (!$slots['table-caption']) {
          data.domProps = htmlOrText(this.captionHtml, this.caption)
        }
        $caption = h('caption', data, $slots['table-caption'])
      }

      return $caption
    }
  }
}
