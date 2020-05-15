import { CLASS_NAME_BV_AVATAR_GROUP } from '../../constants/class-names'
import { NAME_AVATAR_GROUP } from '../../constants/components'
import { ROLE_GROUP } from '../../constants/roles'
import { SLOT_NAME_DEFAULT } from '../../constants/slot-names'
import Vue from '../../utils/vue'
import { mathMax, mathMin } from '../../utils/math'
import { toFloat } from '../../utils/number'
import { suffixClass } from '../../utils/string'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { computeSize } from './avatar'

// @vue/component
export const BAvatarGroup = /*#__PURE__*/ Vue.extend({
  name: NAME_AVATAR_GROUP,
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
      default: 0.3
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
      return mathMin(mathMax(toFloat(this.overlap, 0), 0), 1) / 2
    },
    paddingStyle() {
      let value = this.computedSize
      value = value ? `calc(${value} * ${this.overlapScale})` : null
      return value ? { paddingLeft: value, paddingRight: value } : {}
    }
  },
  render(h) {
    const $inner = h(
      'div',
      {
        staticClass: suffixClass(CLASS_NAME_BV_AVATAR_GROUP, 'inner'),
        style: this.paddingStyle
      },
      [this.normalizeSlot(SLOT_NAME_DEFAULT)]
    )

    return h(
      this.tag,
      {
        staticClass: CLASS_NAME_BV_AVATAR_GROUP,
        attrs: { role: ROLE_GROUP }
      },
      [$inner]
    )
  }
})
