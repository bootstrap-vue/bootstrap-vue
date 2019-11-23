import Vue from '../../utils/vue'
import { getComponentConfig } from '../../utils/config'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BBadge } from '../badge/badge'
import { BButtonClose } from '../button/button-close'

const NAME = 'BFormTag'

export const BFormTag = /*#__PURE__*/ Vue.extend({
  name: NAME,
  mixins: [normalizeSlotMixin],
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
    let $remove = h()
    if (!this.disabled) {
      $remove = h(BButtonClose, {
        props: { ariaLabel: this.removeLabel },
        staticClass: 'b-form-tag-remove ml-1 text-reset float-none',
        style: { fontSize: 'inherit' },
        on: { click: this.onClick }
      })
    }
    const $tag = h(
      'span',
      {
        staticClass: 'b-form-tag-content text-truncate',
        style: { maxWidth: this.disabled ? '100%' : 'calc(100% - 1em)' }
      },
      this.normalizeSlot('default') || this.title || [h()]
    )
    return h(
      BBadge,
      {
        staticClass: 'b-form-tag font-weight-normal mw-100 d-inline-block',
        attrs: { title: this.title || null },
        props: { tag: this.tag, variant: this.variant, pill: this.pill }
      },
      [$tag, $remove]
    )
  }
})
