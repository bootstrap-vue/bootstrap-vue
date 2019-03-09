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
    }
  },
  renderCaption(h) {
    // Build the caption
    let $caption = h(false)
    let captionId = null

    if (this.caption || this.captionHtml || this.$slots['table-caption']) {
      captionId = this.isStacked ? this.safeId('_caption_') : null
      const data = {
        key: 'caption',
        id: captionId,
        class: this.captionClasses
      }
      if (!$slots['table-caption']) {
        data.domProps = htmlOrText(this.captionHtml, this.caption)
      }
      $caption = h('caption', data, this.$slots['table-caption'])
    }

    return $caption
  }
}
