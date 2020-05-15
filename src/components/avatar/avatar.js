import { ARIA_VALUE_TRUE } from '../../constants/aria'
import { ATTR_ALT, ATTR_ARIA_HIDDEN, ATTR_ARIA_LABEL, ATTR_SRC } from '../../constants/attrs'
import {
  CLASS_NAME_BADGE,
  CLASS_NAME_BV_AVATAR,
  CLASS_NAME_ROUNDED,
  CLASS_NAME_DISABLED
} from '../../constants/class-names'
import { NAME_AVATAR } from '../../constants/components'
import { EVENT_NAME_CLICK } from '../../constants/events'
import { RX_NUMBER } from '../../constants/regex'
import { SLOT_NAME_DEFAULT } from '../../constants/slot-names'
import { STYLE_HEIGHT, STYLE_WIDTH } from '../../constants/styles'
import { TAG_IMAGE, TAG_SPAN } from '../../constants/tags'
import Vue from '../../utils/vue'
import { getComponentConfig } from '../../utils/config'
import { isNumber, isString, isUndefinedOrNull } from '../../utils/inspect'
import { toFloat } from '../../utils/number'
import { buildObject, omit } from '../../utils/object'
import { pluckProps } from '../../utils/props'
import { isLink } from '../../utils/router'
import { suffixClass } from '../../utils/string'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BButton } from '../button/button'
import { BLink, props as BLinkProps } from '../link/link'
import { BIcon } from '../../icons/icon'
import { BIconPersonFill } from '../../icons/icons'

// --- Constants ---

const SLOT_NAME_BADGE = 'badge'

const FONT_SIZE_SCALE = 0.4
const BADGE_FONT_SIZE_SCALE = FONT_SIZE_SCALE * 0.7

const DEFAULT_SIZES = {
  sm: '1.5em',
  md: '2.5em',
  lg: '3.5em'
}

// --- Props ---

const linkProps = omit(BLinkProps, ['active', 'event', 'routerTag'])

const props = {
  src: {
    type: String
    // default: null
  },
  text: {
    type: String
    // default: null
  },
  icon: {
    type: String
    // default: null
  },
  alt: {
    type: String,
    default: 'avatar'
  },
  variant: {
    type: String,
    default: () => getComponentConfig(NAME_AVATAR, 'variant')
  },
  size: {
    type: [Number, String],
    default: null
  },
  square: {
    type: Boolean,
    default: false
  },
  rounded: {
    type: [Boolean, String],
    default: false
  },
  button: {
    type: Boolean,
    default: false
  },
  buttonType: {
    type: String,
    default: 'button'
  },
  badge: {
    type: [Boolean, String],
    default: false
  },
  badgeVariant: {
    type: String,
    default: () => getComponentConfig(NAME_AVATAR, 'badgeVariant')
  },
  badgeTop: {
    type: Boolean,
    default: false
  },
  badgeLeft: {
    type: Boolean,
    default: false
  },
  badgeOffset: {
    type: String,
    default: '0px'
  },
  ...linkProps,
  ariaLabel: {
    type: String
    // default: null
  }
}

// --- Utility methods ---

export const computeSize = value => {
  // Default to `md` size when `null`, or parse to
  // number when value is a float-like string
  value =
    isUndefinedOrNull(value) || value === ''
      ? 'md'
      : isString(value) && RX_NUMBER.test(value)
        ? toFloat(value, 0)
        : value
  // Convert all numbers to pixel values
  // Handle default sizes when `sm`, `md` or `lg`
  // Or use value as is
  return isNumber(value) ? `${value}px` : DEFAULT_SIZES[value] || value
}

// --- Main component ---
// @vue/component
export const BAvatar = /*#__PURE__*/ Vue.extend({
  name: NAME_AVATAR,
  mixins: [normalizeSlotMixin],
  inject: {
    bvAvatarGroup: { default: null }
  },
  props,
  data() {
    return {
      localSrc: this.src || null
    }
  },
  computed: {
    computedSize() {
      // Always use the avatar group size
      return computeSize(this.bvAvatarGroup ? this.bvAvatarGroup.size : this.size)
    },
    computedVariant() {
      // Prefer avatar-group variant if provided
      const avatarGroup = this.bvAvatarGroup
      return avatarGroup && avatarGroup.variant ? avatarGroup.variant : this.variant
    },
    computedRounded() {
      const avatarGroup = this.bvAvatarGroup
      const square = avatarGroup && avatarGroup.square ? true : this.square
      const rounded = avatarGroup && avatarGroup.rounded ? avatarGroup.rounded : this.rounded
      return square ? '0' : rounded === '' ? true : rounded || 'circle'
    },
    fontStyle() {
      let fontSize = this.computedSize
      fontSize = fontSize ? `calc(${fontSize} * ${FONT_SIZE_SCALE})` : null
      return fontSize ? { fontSize } : {}
    },
    marginStyle() {
      const avatarGroup = this.bvAvatarGroup
      const overlapScale = avatarGroup ? avatarGroup.overlapScale : 0
      const size = this.computedSize
      const value = size && overlapScale ? `calc(${size} * -${overlapScale})` : null
      return buildObject([['marginLeft', value], ['marginRight', value]], !!value)
    },
    badgeStyle() {
      const { computedSize: size, badgeTop, badgeLeft, badgeOffset } = this
      const offset = badgeOffset || '0px'
      return {
        fontSize: size ? `calc(${size} * ${BADGE_FONT_SIZE_SCALE} )` : null,
        top: badgeTop ? offset : null,
        bottom: badgeTop ? null : offset,
        left: badgeLeft ? offset : null,
        right: badgeLeft ? null : offset
      }
    }
  },
  watch: {
    src(newSrc, oldSrc) {
      if (newSrc !== oldSrc) {
        this.localSrc = newSrc || null
      }
    }
  },
  methods: {
    onImgError(evt) {
      this.localSrc = null
      this.$emit('img-error', evt)
    },
    onClick(evt) {
      this.$emit(EVENT_NAME_CLICK, evt)
    }
  },
  render(h) {
    const {
      computedVariant: variant,
      disabled,
      computedRounded: rounded,
      icon,
      localSrc: src,
      text,
      fontStyle,
      marginStyle,
      computedSize: size,
      button,
      buttonType: type,
      badge,
      badgeVariant,
      badgeStyle,
      ariaLabel,
      alt
    } = this
    const link = !button && isLink(this)
    const tag = button ? BButton : link ? BLink : TAG_SPAN

    let $content = null
    if (this.hasNormalizedSlot(SLOT_NAME_DEFAULT)) {
      // Default slot overrides props
      $content = h(TAG_SPAN, { staticClass: suffixClass(CLASS_NAME_BV_AVATAR, 'custom') }, [
        this.normalizeSlot(SLOT_NAME_DEFAULT)
      ])
    } else if (src) {
      const imageSize = '100%'
      $content = h(TAG_IMAGE, {
        style: buildObject([[STYLE_WIDTH, imageSize], [STYLE_HEIGHT, imageSize]], !!variant),
        attrs: buildObject([[ATTR_SRC, src], [ATTR_ALT, alt]]),
        on: { error: this.onImgError }
      })
      $content = h(TAG_SPAN, { staticClass: suffixClass(CLASS_NAME_BV_AVATAR, 'img') }, [$content])
    } else if (icon) {
      $content = h(BIcon, {
        props: { icon },
        attrs: buildObject([[ATTR_ARIA_HIDDEN, ARIA_VALUE_TRUE], [ATTR_ALT, alt]])
      })
    } else if (text) {
      $content = h(
        TAG_SPAN,
        {
          staticClass: suffixClass(CLASS_NAME_BV_AVATAR, 'text'),
          style: fontStyle
        },
        [h(TAG_SPAN, text)]
      )
    } else {
      // Fallback default avatar content
      $content = h(BIconPersonFill, {
        attrs: buildObject([[ATTR_ARIA_HIDDEN, ARIA_VALUE_TRUE], [ATTR_ALT, alt]])
      })
    }

    let $badge = h()
    const hasBadgeSlot = this.hasNormalizedSlot(SLOT_NAME_BADGE)
    if (badge || badge === '' || hasBadgeSlot) {
      const badgeText = badge === true ? '' : badge
      $badge = h(
        TAG_SPAN,
        {
          staticClass: suffixClass(CLASS_NAME_BV_AVATAR, 'badge'),
          class: { [suffixClass(CLASS_NAME_BADGE, badgeVariant)]: !!badgeVariant },
          style: badgeStyle
        },
        [hasBadgeSlot ? this.normalizeSlot(SLOT_NAME_BADGE) : badgeText]
      )
    }

    const componentData = {
      staticClass: CLASS_NAME_BV_AVATAR,
      class: buildObject([
        // We use badge styles for theme variants when not rendering `BButton`
        [suffixClass(CLASS_NAME_BADGE, variant), !button && variant],
        // Rounding/Square
        [CLASS_NAME_ROUNDED, rounded === true],
        [suffixClass(CLASS_NAME_ROUNDED, rounded), rounded && rounded !== true],
        // Other classes
        [CLASS_NAME_DISABLED, disabled]
      ]),
      style: buildObject([[STYLE_WIDTH, size], [STYLE_HEIGHT, size], marginStyle]),
      attrs: buildObject([[ATTR_ARIA_LABEL, ariaLabel]]),
      props: button ? { variant, disabled, type } : link ? pluckProps(linkProps, this) : {},
      on: buildObject([[EVENT_NAME_CLICK, this.onClick]], !button && !link)
    }

    return h(tag, componentData, [$content, $badge])
  }
})
