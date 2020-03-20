import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import { getComponentConfig } from '../../utils/config'
import pluckProps from '../../utils/pluck-props'
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
    iconName: {
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
    button: {
      type: Boolean,
      default: false
    },
    buttonType: {
      type: String,
      default: 'button'
    },
    ...linkProps
  },
  render(h, { props, data, children }) {
    const isButton = props.button
    const isBLink = !isButton && (props.href || props.to)
    const tag = isButton ? 'button' : isBLink ? BLink : 'span'
    const square = props.square
    const rounded = square ? false : props.rounded === '' ? true : props.rounded
    const height = props.height

    let $content = h(BIconPersonFill, { attrs: { 'aria-hidden': 'true' } })
    if (children) {
      // Default slot overrides props
      $content = h('span', {}, children)
    } else if (props.src) {
      $content = h('img', { attrs: { src: props.src } })
    } else if (props.text) {
      $content = h('span', {}, props.text)
    } else if (props.iconName) {
      $content = h(BIcon, { props: { icon: props.iconName }, attrs: { 'aria-hidden': 'true' } })
    }

    const componentData = {
      staticClass: 'b-avatar',
      class: {
        // We use badge/button styles for theme variants
        [`${isButton ? 'btn' : 'badge'}-${props.variant}`]: !!props.variant,
        // Roudning  / Square overrides
        rounded: rounded === true,
        'rounded-0': square,
        [`rounded-${rounded}`]: rounded && rounded !== true,
        // Other classes
        disabled: props.disabled
      },
      style: {
        width: height,
        height: height,
        fontSize: height ? `calc(${height} * 0.4)` : null
      },
      attrs: {
        type: isButton ? props.buttonType : null,
        'aria-label': props.ariaLabel || null
      },
      props: isBLink ? pluckProps(linkProps, props) : {}
    }

    return h(tag, mergeData(data, componentData), [$content])
  }
})
