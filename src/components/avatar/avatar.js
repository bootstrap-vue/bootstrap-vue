import {
  CLASS_NAME_AVATAR,
  CLASS_NAME_BADGE,
  CLASS_NAME_ROUNDED
} from '../../constants/class-names'
import { NAME_AVATAR } from '../../constants/components'
import { RX_NUMBER } from '../../constants/regex'
import Vue from '../../utils/vue'
import pluckProps from '../../utils/pluck-props'
import { getComponentConfig } from '../../utils/config'
import { isNumber, isString } from '../../utils/inspect'
import { toFloat } from '../../utils/number'
import { suffixClass } from '../../utils/string'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BButton } from '../button/button'
import { BLink } from '../link/link'
import { BIcon } from '../../icons/icon'
import { BIconPersonFill } from '../../icons/icons'

// --- Constants ---
const FONT_SIZE_SCALE = 0.4
const BADGE_FONT_SIZE_SCALE = FONT_SIZE_SCALE * 0.7

const DEFAULT_SIZES = {
  sm: '1.5em',
  md: '2.5em',
  lg: '3.5em'
}

// --- Props ---
const linkProps = {
  href: {
    type: String
    // default: null
  },
  to: {
    type: [String, Object]
    // default: null
  },
  append: {
    type: Boolean,
    default: false
  },
  replace: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  rel: {
    type: String
    // default: null
  },
  target: {
    type: String
    // default: null
  },
  activeClass: {
    type: String
    // default: null
  },
  exact: {
    type: Boolean,
    default: false
  },
  exactActiveClass: {
    type: String
    // default: null
  },
  noPrefetch: {
    type: Boolean,
    default: false
  }
}

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
const computeSize = value => {
  // Default to `md` size when `null`, or parse to
  // number when value is a float-like string
  value =
    value === null ? 'md' : isString(value) && RX_NUMBER.test(value) ? toFloat(value, 0) : value
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
  props,
  data() {
    return {
      localSrc: this.src || null
    }
  },
  computed: {
    computedSize() {
      return computeSize(this.size)
    },
    fontSize() {
      const size = this.computedSize
      return size ? `calc(${size} * ${FONT_SIZE_SCALE})` : null
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
      this.$emit('click', evt)
    }
  },
  render(h) {
    const {
      variant,
      disabled,
      square,
      icon,
      localSrc: src,
      text,
      fontSize,
      computedSize: size,
      button: isButton,
      buttonType: type,
      badge,
      badgeVariant,
      badgeStyle
    } = this
    const isBLink = !isButton && (this.href || this.to)
    const tag = isButton ? BButton : isBLink ? BLink : 'span'
    const rounded = square ? false : this.rounded === '' ? true : this.rounded || 'circle'
    const alt = this.alt || null
    const ariaLabel = this.ariaLabel || null

    let $content = null
    if (this.hasNormalizedSlot('default')) {
      // Default slot overrides props
      $content = h('span', { staticClass: suffixClass(CLASS_NAME_AVATAR, 'custom') }, [
        this.normalizeSlot('default')
      ])
    } else if (src) {
      $content = h('img', {
        style: variant ? {} : { width: '100%', height: '100%' },
        attrs: { src, alt },
        on: { error: this.onImgError }
      })
    } else if (icon) {
      $content = h(BIcon, {
        props: { icon },
        attrs: { 'aria-hidden': 'true', alt }
      })
    } else if (text) {
      $content = h(
        'span',
        { staticClass: suffixClass(CLASS_NAME_AVATAR, 'text'), style: { fontSize } },
        [h('span', text)]
      )
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
          staticClass: suffixClass(CLASS_NAME_AVATAR, 'badge'),
          class: { [suffixClass(CLASS_NAME_BADGE, badgeVariant)]: !!badgeVariant },
          style: badgeStyle
        },
        [hasBadgeSlot ? this.normalizeSlot('badge') : badgeText]
      )
    }

    const componentData = {
      staticClass: CLASS_NAME_AVATAR,
      class: {
        // We use badge styles for theme variants when not rendering `BButton`
        [suffixClass(CLASS_NAME_BADGE, variant)]: !isButton && variant,
        // Rounding/Square
        [CLASS_NAME_ROUNDED]: rounded === true,
        [suffixClass(CLASS_NAME_ROUNDED, 0)]: square,
        [suffixClass(CLASS_NAME_ROUNDED, rounded)]: rounded && rounded !== true,
        // Other classes
        disabled
      },
      style: { width: size, height: size },
      attrs: { 'aria-label': ariaLabel || null },
      props: isButton ? { variant, disabled, type } : isBLink ? pluckProps(linkProps, this) : {},
      on: isBLink || isButton ? { click: this.onClick } : {}
    }

    return h(tag, componentData, [$content, $badge])
  }
})
