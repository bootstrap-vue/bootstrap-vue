import bImg from '../image/img'
import warn from '../../utils/warn'
import idMixin from '../../mixins/id'

export default {
  components: { bImg },
  mixins: [ idMixin ],
  render (h) {
    const $slots = this.$slots

    let img = $slots.img
    if (!img && (this.imgSrc || this.imgBlank)) {
      img = h(
        'b-img',
        {
          props: {
            fluidGrow: true,
            block: true,
            src: this.imgSrc,
            blank: this.imgBlank,
            blankColor: this.imgBlankColor,
            width: this.computedWidth,
            height: this.computedHeight,
            alt: this.imgAlt
          }
        }
      )
    }

    const content = h(
      this.contentTag,
      { class: this.contentClasses },
      [
        this.caption ? h(this.captionTag, { domProps: { innerHTML: this.caption } }) : h(false),
        this.text ? h(this.textTag, { domProps: { innerHTML: this.text } }) : h(false),
        $slots.default
      ]
    )

    return h(
      'div',
      {
        class: [ 'carousel-item' ],
        style: { background: this.background },
        attrs: { id: this.safeId(), role: 'listitem' }
      },
      [ img, content ]
    )
  },
  props: {
    imgSrc: {
      type: String,
      default () {
        if (this && this.src) {
          // Deprecate src
          warn("b-carousel-slide: prop 'src' has been deprecated. Use 'img-src' instead")
          return this.src
        }
        return null
      }
    },
    src: {
      // Deprecated: use img-src instead
      type: String
    },
    imgAlt: {
      type: String
    },
    imgWidth: {
      type: [Number, String]
    },
    imgHeight: {
      type: [Number, String]
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
    captionTag: {
      type: String,
      default: 'h3'
    },
    text: {
      type: String
    },
    textTag: {
      type: String,
      default: 'p'
    },
    background: {
      type: String
    }
  },
  computed: {
    contentClasses () {
      return [
        'carousel-caption',
        this.contentVisibleUp ? 'd-none' : '',
        this.contentVisibleUp ? `d-${this.contentVisibleUp}-block` : ''
      ]
    },
    computedWidth () {
      // Use local width, or try parent width
      return this.imgWidth || this.$parent.imgWidth
    },
    computedHeight () {
      // Use local height, or try parent height
      return this.imgHeight || this.$parent.imgHeight
    }
  }
}
