import { mergeData } from 'vue-functional-data-merge'
import Vue from '../../utils/vue'
import pluckProps from '../../utils/pluck-props'
import { getComponentConfig } from '../../utils/config'
import { BButton } from '../button/button'
import { BLink } from '../link/link'
import { BIcon } from '../../icons/icon'
import { BIconPersonFill } from '../../icons/icons'

const NAME = 'BAvatar'

// Props we use specific to BLink
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

// @vue/component
export const BAvatar = /*#__PURE__*/ Vue.extend({
  name: NAME,
  functional: true,
  props: {
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
    height: {
      type: String,
      default: '2.5em'
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
  },
  render(h, { props, data, children }) {
    const isButton = props.button
    const isBLink = !isButton && (props.href || props.to)
    const tag = isButton ? BButton : isBLink ? BLink : 'span'
    const variant = props.variant
    const disabled = props.disabled
    const type = props.buttonType
    const square = props.square
    const rounded = square ? false : props.rounded === '' ? true : props.rounded || 'circle'
    const height = props.height
    const fontSize = height ? `calc(${height} * 0.4)` : null

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
      $content = h('span', { style: { fontSize } }, props.text)
    } else {
      $content = h(BIconPersonFill, { attrs: { 'aria-hidden': 'true' } })
    }

    const componentData = {
      staticClass: 'b-avatar',
      class: {
        // We use badge/button styles for theme variants
        [`${isButton ? 'btn' : 'badge'}-${props.variant}`]: !!props.variant,
        // Rounding  / Square
        rounded: rounded === true,
        'rounded-0': square,
        [`rounded-${rounded}`]: rounded && rounded !== true,
        // Other classes
        disabled
      },
      style: { width: height, height, fontSize },
      attrs: { 'aria-label': props.ariaLabel || null },
      props: isButton ? { variant, disabled, type } : isBLink ? pluckProps(linkProps, props) : {}
    }

    return h(tag, mergeData(data, componentData), [$content])
  }
})
