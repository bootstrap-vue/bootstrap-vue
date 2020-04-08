import Vue from '../../utils/vue'
import pluckProps from '../../utils/pluck-props'
import { getComponentConfig } from '../../utils/config'
import { isNumber, isString } from '../../utils/inspect'
import { toFloat } from '../../utils/number'
import { BButton } from '../button/button'
import { BLink } from '../link/link'
import { BIcon } from '../../icons/icon'
import { BIconPersonFill } from '../../icons/icons'
import normalizeSlotMixin from '../../mixins/normalize-slot'

// --- Constants ---
const NAME = 'BAvatar'
const CLASS_NAME = 'b-avatar'

const RX_NUMBER = /^[0-9]*\.?[0-9]+$/

const FONT_SIZE_SCALE = 0.4

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
    default: () => getComponentConfig(NAME, 'variant')
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
  name: NAME,
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
      buttonType: type
    } = this
    const isBLink = !isButton && (this.href || this.to)
    const tag = isButton ? BButton : isBLink ? BLink : 'span'
    const rounded = square ? false : this.rounded === '' ? true : this.rounded || 'circle'
    const alt = this.alt || null
    const ariaLabel = this.ariaLabel || null

    let $content = null
    if (this.hasNormalizedSlot('default')) {
      // Default slot overrides props
      $content = this.normalizeSlot('default')
    } else if (src) {
      $content = h('img', { attrs: { src, alt }, on: { error: this.onImgError } })
    } else if (icon) {
      $content = h(BIcon, {
        props: { icon },
        attrs: { 'aria-hidden': 'true', alt }
      })
    } else if (text) {
      $content = h('span', { style: { fontSize } }, text)
    } else {
      // Fallback default avatar content
      $content = h(BIconPersonFill, { attrs: { 'aria-hidden': 'true', alt } })
    }

    const componentData = {
      staticClass: CLASS_NAME,
      class: {
        // We use badge styles for theme variants when not rendering `BButton`
        [`badge-${variant}`]: !isButton && variant,
        // Rounding/Square
        rounded: rounded === true,
        'rounded-0': square,
        [`rounded-${rounded}`]: rounded && rounded !== true,
        // Other classes
        disabled
      },
      style: { width: size, height: size },
      attrs: { 'aria-label': ariaLabel },
      props: isButton ? { variant, disabled, type } : isBLink ? pluckProps(linkProps, this) : {},
      on: isBLink || isButton ? { click: this.onClick } : {}
    }

    return h(tag, componentData, [$content])
  }
})
