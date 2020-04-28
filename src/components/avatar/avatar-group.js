import Vue from '../../utils/vue'
import normalizeSlotMixin from '../../mixins/normalize-slot'

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
  render(h) {
    return h(this.tag, { staticClass: 'b-avatar-group', attrs: { role: 'group' } }, [
      this.normalizeSlot('default')
    ])
  }
})
