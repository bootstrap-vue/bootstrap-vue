import Vue from '../../utils/vue'
import { getComponentConfig } from '../../utils/config'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BBadge } from '../badge/badge'
import { BButtonClose } from '../button/button-close'

const NAME = 'BFormTag'

export const BFormTag = /*#__PURE__*/ Vue.extend({
  name: NAME,
  mixins: [idMixin, normalizeSlotMixin],
  props: {
    variant: {
      type: String,
      default: () => getComponentConfig(NAME, 'variant')
    },
    disabled: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    },
    pill: {
      type: Boolean,
      default: false
    },
    removeLabel: {
      type: String,
      default: () => getComponentConfig(NAME, 'removeLabel')
    },
    tag: {
      type: String,
      default: 'span'
    }
  },
  methods: {
    onClick() {
      this.$emit('remove')
    }
  },
  render(h) {
    const tagId = this.safeId()
    let $remove = h()
    if (!this.disabled) {
      $remove = h(BButtonClose, {
        staticClass: 'b-form-tag-remove ml-1',
        props: { ariaLabel: this.removeLabel },
        attrs: { 'aria-controls': tagId },
        on: { click: this.onClick }
      })
    }
    const $tag = h(
      'span',
      { staticClass: 'b-form-tag-content flex-grow-1 text-truncate' },
      this.normalizeSlot('default') || this.title || [h()]
    )
    return h(
      BBadge,
      {
        staticClass: 'b-form-tag d-inline-flex align-items-baseline mw-100',
        class: { disabled: this.disabled },
        attrs: { id: tagId, title: this.title || null },
        props: { tag: this.tag, variant: this.variant, pill: this.pill }
      },
      [$tag, $remove]
    )
  }
})
