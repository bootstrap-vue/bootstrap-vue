import Vue from '../../utils/vue'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { computeSize } from './avatar'

const NAME = 'BAvatarGroup'

// @vue/component
export const BAvatarGroup = /*#__PURE__*/ Vue.extend({
  name: NAME,
  mixins: [normalizeSlotMixin],
  provide() {
    return { bvAvatarGroup: this }
  },
  props: {
    variant: {
      // Child avatars will prefer this variant over their own
      type: String,
      default: null
    },
    size: {
      // Child avatars will always use this over their own size
      type: String,
      default: null
    },
    overlap: {
      type: [Number, String],
      default: .3
    },
    square: {
      // Child avatars will prefer this prop (if set) over their own
      type: Boolean,
      default: false
    },
    rounded: {
      // Child avatars will prefer this prop (if set) over their own
      type: [Boolean, String],
      default: false
    },
    tag: {
      type: String,
      default: 'div'
    }
  },
  computed: {
    computedSize() {
      return computeSize(this.size)
    },
    overlapScale() {
      return toFloat(this.overlap, 0) / 2
    },
    paddingStyle() {
      let value = this.computedSize
      value = value ? `calc(${value} * ${this.overlapScale})` : null
      return value ? { paddingLeft: value, paddingRight: value } : {}
    }
  },
  render(h) {
    const $inner = h('div', { staticClass: 'b-avatar-group-inner', style: this.paddingStyle }, [
      this.normalizeSlot('default')
    ])

    return h(this.tag, { staticClass: 'b-avatar-group', attrs: { role: 'group' } }, [$inner])
  }
})
