import { mergeData } from 'vue-functional-data-merge'
import Vue from '../../utils/vue'
import pluckProps from '../../utils/pluck-props'
import { getComponentConfig } from '../../utils/config'
import { isNumber, isString } from '../../utils/inspect'
import { toFloat } from '../../utils/number'
import { BButton } from '../button/button'
import { BLink } from '../link/link'
import { BIcon } from '../../icons/icon'
import { BIconPersonFill } from '../../icons/icons'

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
  value = value === null ? 'md' : isString(value) && RX_NUMBER.test(value) ? toFloat(value) : value
  // Convert all numbers to pixel values
  // Handle default sizes when `sm`, `md` or `lg`
  // Or use value as is
  return isNumber(value) ? `${value}px` : DEFAULT_SIZES[value] || value
}

// --- Main component ---
// @vue/component
export const BAvatar = /*#__PURE__*/ Vue.extend({
  name: NAME,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const { variant, disabled, square, icon, src, text, button: isButton, buttonType: type } = props
    const isBLink = !isButton && (props.href || props.to)
    const tag = isButton ? BButton : isBLink ? BLink : 'span'
    const rounded = square ? false : props.rounded === '' ? true : props.rounded || 'circle'
    const size = computeSize(props.size)
    const alt = props.alt || null
    const ariaLabel = props.ariaLabel || null

    let $content = null
    if (children) {
      // Default slot overrides props
      $content = children
    } else if (icon) {
      $content = h(BIcon, {
        props: { icon },
        attrs: { 'aria-hidden': 'true', alt }
      })
    } else if (src) {
      $content = h('img', { attrs: { src, alt } })
    } else if (text) {
      const fontSize = size ? `calc(${size} * ${FONT_SIZE_SCALE})` : null
      $content = h('span', { style: { fontSize } }, text)
    } else {
      $content = h(BIconPersonFill, { attrs: { 'aria-hidden': 'true', alt } })
    }

    const componentData = {
      staticClass: CLASS_NAME,
      class: {
        // We use badge/button styles for theme variants
        [`${isButton ? 'btn' : 'badge'}-${variant}`]: !!variant,
        // Rounding/Square
        rounded: rounded === true,
        'rounded-0': square,
        [`rounded-${rounded}`]: rounded && rounded !== true,
        // Other classes
        disabled
      },
      style: { width: size, height: size },
      attrs: { 'aria-label': ariaLabel },
      props: isButton ? { variant, disabled, type } : isBLink ? pluckProps(linkProps, props) : {}
    }

    return h(tag, mergeData(data, componentData), [$content])
  }
})
