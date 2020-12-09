import { Vue } from '../../vue'
import { NAME_AVATAR } from '../../constants/components'
import { EVENT_NAME_CLICK, EVENT_NAME_IMG_ERROR } from '../../constants/events'
import {
  PROP_TYPE_BOOLEAN,
  PROP_TYPE_BOOLEAN_STRING,
  PROP_TYPE_NUMBER_STRING,
  PROP_TYPE_STRING
} from '../../constants/props'
import { SLOT_NAME_BADGE } from '../../constants/slots'
import { isNumber, isNumeric, isString } from '../../utils/inspect'
import { toFloat } from '../../utils/number'
import { omit, sortKeys } from '../../utils/object'
import { makeProp, makePropsConfigurable, pluckProps } from '../../utils/props'
import { isLink } from '../../utils/router'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'
import { BIcon } from '../../icons/icon'
import { BIconPersonFill } from '../../icons/icons'
import { BButton } from '../button/button'
import { BLink, props as BLinkProps } from '../link/link'

// --- Constants ---

const CLASS_NAME = 'b-avatar'

const SIZES = ['sm', null, 'lg']

const FONT_SIZE_SCALE = 0.4
const BADGE_FONT_SIZE_SCALE = FONT_SIZE_SCALE * 0.7

// --- Helper methods ---

export const computeSize = value => {
  // Parse to number when value is a float-like string
  value = isString(value) && isNumeric(value) ? toFloat(value, 0) : value
  // Convert all numbers to pixel values
  return isNumber(value) ? `${value}px` : value || null
}

// --- Props ---

const linkProps = omit(BLinkProps, ['active', 'event', 'routerTag'])

export const props = makePropsConfigurable(
  sortKeys({
    ...linkProps,
    alt: makeProp(PROP_TYPE_STRING, 'avatar'),
    ariaLabel: makeProp(PROP_TYPE_STRING),
    badge: makeProp(PROP_TYPE_BOOLEAN_STRING, false),
    badgeLeft: makeProp(PROP_TYPE_BOOLEAN, false),
    badgeOffset: makeProp(PROP_TYPE_STRING),
    badgeTop: makeProp(PROP_TYPE_BOOLEAN, false),
    badgeVariant: makeProp(PROP_TYPE_STRING, 'primary'),
    button: makeProp(PROP_TYPE_BOOLEAN, false),
    buttonType: makeProp(PROP_TYPE_STRING, 'button'),
    icon: makeProp(PROP_TYPE_STRING),
    rounded: makeProp(PROP_TYPE_BOOLEAN_STRING, false),
    size: makeProp(PROP_TYPE_NUMBER_STRING),
    square: makeProp(PROP_TYPE_BOOLEAN, false),
    src: makeProp(PROP_TYPE_STRING),
    text: makeProp(PROP_TYPE_STRING),
    variant: makeProp(PROP_TYPE_STRING, 'secondary')
  }),
  NAME_AVATAR
)

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
    src(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.localSrc = newValue || null
      }
    }
  },
  methods: {
    onImgError(event) {
      this.localSrc = null
      this.$emit(EVENT_NAME_IMG_ERROR, event)
    },
    onClick(event) {
      this.$emit(EVENT_NAME_CLICK, event)
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
      $content = h(
        'span',
        {
          staticClass: 'b-avatar-text',
          style: fontStyle
        },
        [h('span', text)]
      )
    } else {
      // Fallback default avatar content
      $content = h(BIconPersonFill, { attrs: { 'aria-hidden': 'true', alt } })
    }

    let $badge = h()
    const hasBadgeSlot = this.hasNormalizedSlot(SLOT_NAME_BADGE)
    if (badge || badge === '' || hasBadgeSlot) {
      const badgeText = badge === true ? '' : badge
      $badge = h(
        'span',
        {
          staticClass: 'b-avatar-badge',
          class: { [`badge-${badgeVariant}`]: badgeVariant },
          style: badgeStyle
        },
        [hasBadgeSlot ? this.normalizeSlot(SLOT_NAME_BADGE) : badgeText]
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
