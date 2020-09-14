import { NAME_AVATAR } from '../../constants/components'
import { RX_NUMBER } from '../../constants/regex'
import Vue from '../../utils/vue'
import { getComponentConfig } from '../../utils/config'
import { isNumber, isString } from '../../utils/inspect'
import { toFloat } from '../../utils/number'
import { omit } from '../../utils/object'
import { pluckProps } from '../../utils/props'
import { isLink } from '../../utils/router'
import { BButton } from '../button/button'
import { BLink, props as BLinkProps } from '../link/link'
import { BIcon } from '../../icons/icon'
import { BIconPersonFill } from '../../icons/icons'
import normalizeSlotMixin from '../../mixins/normalize-slot'

// --- Constants ---
const CLASS_NAME = 'b-avatar'

const SIZES = ['sm', null, 'lg']

const FONT_SIZE_SCALE = 0.4
const BADGE_FONT_SIZE_SCALE = FONT_SIZE_SCALE * 0.7

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
  // Parse to number when value is a float-like string
  value = isString(value) && RX_NUMBER.test(value) ? toFloat(value, 0) : value
  // Convert all numbers to pixel values
  return isNumber(value) ? `${value}px` : value || null
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
      const { bvAvatarGroup } = this
      return computeSize(bvAvatarGroup ? bvAvatarGroup.size : this.size)
    },
    computedVariant() {
      const { bvAvatarGroup } = this
      return bvAvatarGroup && bvAvatarGroup.variant ? bvAvatarGroup.variant : this.variant
    },
    computedRounded() {
      const { bvAvatarGroup } = this
      const square = bvAvatarGroup && bvAvatarGroup.square ? true : this.square
      const rounded = bvAvatarGroup && bvAvatarGroup.rounded ? bvAvatarGroup.rounded : this.rounded
      return square ? '0' : rounded === '' ? true : rounded || 'circle'
    },
    fontStyle() {
      const { computedSize: size } = this
      const fontSize = SIZES.indexOf(size) === -1 ? `calc(${size} * ${FONT_SIZE_SCALE})` : null
      return fontSize ? { fontSize } : {}
    },
    marginStyle() {
      const { computedSize: size, bvAvatarGroup } = this
      const overlapScale = bvAvatarGroup ? bvAvatarGroup.overlapScale : 0
      const value = size && overlapScale ? `calc(${size} * -${overlapScale})` : null
      return value ? { marginLeft: value, marginRight: value } : {}
    },
    badgeStyle() {
      const { computedSize: size, badgeTop, badgeLeft, badgeOffset } = this
      const offset = badgeOffset || '0px'
      return {
        fontSize: SIZES.indexOf(size) === -1 ? `calc(${size} * ${BADGE_FONT_SIZE_SCALE} )` : null,
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
      this.$emit('click', evt)
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
      badgeStyle
    } = this
    const link = !button && isLink(this)
    const tag = button ? BButton : link ? BLink : 'span'
    const alt = this.alt
    const ariaLabel = this.ariaLabel || null

    let $content = null
    if (this.hasNormalizedSlot()) {
      // Default slot overrides props
      $content = h('span', { staticClass: 'b-avatar-custom' }, [this.normalizeSlot()])
    } else if (src) {
      $content = h('img', {
        style: variant ? {} : { width: '100%', height: '100%' },
        attrs: { src, alt },
        on: { error: this.onImgError }
      })
      $content = h('span', { staticClass: 'b-avatar-img' }, [$content])
    } else if (icon) {
      $content = h(BIcon, {
        props: { icon },
        attrs: { 'aria-hidden': 'true', alt }
      })
    } else if (text) {
      $content = h('span', { staticClass: 'b-avatar-text', style: fontStyle }, [h('span', text)])
    } else {
      // Fallback default avatar content
      $content = h(BIconPersonFill, { attrs: { 'aria-hidden': 'true', alt } })
    }

    let $badge = h()
    const hasBadgeSlot = this.hasNormalizedSlot('badge')
    if (badge || badge === '' || hasBadgeSlot) {
      const badgeText = badge === true ? '' : badge
      $badge = h(
        'span',
        {
          staticClass: 'b-avatar-badge',
          class: { [`badge-${badgeVariant}`]: !!badgeVariant },
          style: badgeStyle
        },
        [hasBadgeSlot ? this.normalizeSlot('badge') : badgeText]
      )
    }

    const componentData = {
      staticClass: CLASS_NAME,
      class: {
        // Apply size class
        [`${CLASS_NAME}-${size}`]: size && SIZES.indexOf(size) !== -1,
        // We use badge styles for theme variants when not rendering `BButton`
        [`badge-${variant}`]: !button && variant,
        // Rounding/Square
        rounded: rounded === true,
        [`rounded-${rounded}`]: rounded && rounded !== true,
        // Other classes
        disabled
      },
      style: { ...marginStyle, width: size, height: size },
      attrs: { 'aria-label': ariaLabel || null },
      props: button ? { variant, disabled, type } : link ? pluckProps(linkProps, this) : {},
      on: button || link ? { click: this.onClick } : {}
    }

    return h(tag, componentData, [$content, $badge])
  }
})
