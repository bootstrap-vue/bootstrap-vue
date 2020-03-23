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

const RX_NUMBER = /^[0-9]*\.?[0-9]+$/

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
    const isButton = props.button
    const isBLink = !isButton && (props.href || props.to)
    const tag = isButton ? BButton : isBLink ? BLink : 'span'
    const variant = props.variant
    const disabled = props.disabled
    const type = props.buttonType
    const square = props.square
    const rounded = square ? false : props.rounded === '' ? true : props.rounded || 'circle'
    const size = computeSize(props.size)

    let $content = null
    if (children) {
      // Default slot overrides props
      $content = children
    } else if (props.icon) {
      $content = h(BIcon, {
        props: { icon: props.icon },
        attrs: { 'aria-hidden': 'true' }
      })
    } else if (props.src) {
      $content = h('img', { attrs: { src: props.src } })
    } else if (props.text) {
      const fontSize = size ? `calc(${size} * 0.4)` : null
      $content = h('span', { style: { fontSize } }, props.text)
    } else {
      $content = h(BIconPersonFill, { attrs: { 'aria-hidden': 'true' } })
    }

    const componentData = {
      staticClass: 'b-avatar',
      class: {
        // We use badge/button styles for theme variants
        [`${isButton ? 'btn' : 'badge'}-${props.variant}`]: !!props.variant,
        // Rounding / Square
        rounded: rounded === true,
        'rounded-0': square,
        [`rounded-${rounded}`]: rounded && rounded !== true,
        // Other classes
        disabled
      },
      style: { width: size, height: size },
      attrs: { 'aria-label': props.ariaLabel || null },
      props: isButton ? { variant, disabled, type } : isBLink ? pluckProps(linkProps, props) : {}
    }

    return h(tag, mergeData(data, componentData), [$content])
  }
})
