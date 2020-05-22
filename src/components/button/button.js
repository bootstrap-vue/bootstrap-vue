import { mergeData } from 'vue-functional-data-merge'
import Vue from '../../utils/vue'
import KeyCodes from '../../utils/key-codes'
import { concat } from '../../utils/array'
import { getComponentConfig } from '../../utils/config'
import { addClass, isTag, removeClass } from '../../utils/dom'
import { isBoolean, isEvent, isFunction } from '../../utils/inspect'
import { omit } from '../../utils/object'
import { pluckProps } from '../../utils/props'
import { isLink as isLinkStrict } from '../../utils/router'
import { BLink, props as BLinkProps } from '../link/link'

// --- Constants ---

const NAME = 'BButton'

// --- Props ---

const linkProps = omit(BLinkProps, ['event', 'routerTag'])
delete linkProps.href.default
delete linkProps.to.default

const btnProps = {
  block: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: () => getComponentConfig(NAME, 'size')
  },
  variant: {
    type: String,
    default: () => getComponentConfig(NAME, 'variant')
  },
  type: {
    type: String,
    default: 'button'
  },
  tag: {
    type: String,
    default: 'button'
  },
  pill: {
    type: Boolean,
    default: false
  },
  squared: {
    type: Boolean,
    default: false
  },
  pressed: {
    // Tri-state: `true`, `false` or `null`
    // => On, off, not a toggle
    type: Boolean,
    default: null
  }
}

export const props = { ...btnProps, ...linkProps }

// --- Helper methods ---

// Focus handler for toggle buttons
// Needs class of 'focus' when focused
const handleFocus = evt => {
  if (evt.type === 'focusin') {
    addClass(evt.target, 'focus')
  } else if (evt.type === 'focusout') {
    removeClass(evt.target, 'focus')
  }
}

// Is the requested button a link?
// If tag prop is set to `a`, we use a <b-link> to get proper disabled handling
const isLink = props => isLinkStrict(props) || isTag(props.tag, 'a')

// Is the button to be a toggle button?
const isToggle = props => isBoolean(props.pressed)

// Is the button "really" a button?
const isButton = props => !(isLink(props) || (props.tag && !isTag(props.tag, 'button')))

// Is the requested tag not a button or link?
const isNonStandardTag = props => !isLink(props) && !isButton(props)

// Compute required classes (non static classes)
const computeClass = props => [
  `btn-${props.variant || getComponentConfig(NAME, 'variant')}`,
  {
    [`btn-${props.size}`]: props.size,
    'btn-block': props.block,
    'rounded-pill': props.pill,
    'rounded-0': props.squared && !props.pill,
    disabled: props.disabled,
    active: props.pressed
  }
]

// Compute the link props to pass to b-link (if required)
const computeLinkProps = props => (isLink(props) ? pluckProps(linkProps, props) : {})

// Compute the attributes for a button
const computeAttrs = (props, data) => {
  const button = isButton(props)
  const link = isLink(props)
  const toggle = isToggle(props)
  const nonStandardTag = isNonStandardTag(props)
  const hashLink = link && props.href === '#'
  const role = data.attrs && data.attrs.role ? data.attrs.role : null
  let tabindex = data.attrs ? data.attrs.tabindex : null
  if (nonStandardTag || hashLink) {
    tabindex = '0'
  }
  return {
    // Type only used for "real" buttons
    type: button && !link ? props.type : null,
    // Disabled only set on "real" buttons
    disabled: button ? props.disabled : null,
    // We add a role of button when the tag is not a link or button for ARIA
    // Don't bork any role provided in `data.attrs` when `isLink` or `isButton`
    // Except when link has `href` of `#`
    role: nonStandardTag || hashLink ? 'button' : role,
    // We set the `aria-disabled` state for non-standard tags
    'aria-disabled': nonStandardTag ? String(props.disabled) : null,
    // For toggles, we need to set the pressed state for ARIA
    'aria-pressed': toggle ? String(props.pressed) : null,
    // `autocomplete="off"` is needed in toggle mode to prevent some browsers
    // from remembering the previous setting when using the back button
    autocomplete: toggle ? 'off' : null,
    // `tabindex` is used when the component is not a button
    // Links are tabbable, but don't allow disabled, while non buttons or links
    // are not tabbable, so we mimic that functionality by disabling tabbing
    // when disabled, and adding a `tabindex="0"` to non buttons or non links
    tabindex: props.disabled && !button ? '-1' : tabindex
  }
}

// --- Main component ---
// @vue/component
export const BButton = /*#__PURE__*/ Vue.extend({
  name: NAME,
  functional: true,
  props,
  render(h, { props, data, listeners, children }) {
    const toggle = isToggle(props)
    const link = isLink(props)
    const nonStandardTag = isNonStandardTag(props)
    const hashLink = link && props.href === '#'
    const on = {
      keydown(evt) {
        // When the link is a `href="#"` or a non-standard tag (has `role="button"`),
        // we add a keydown handlers for SPACE/ENTER
        /* istanbul ignore next */
        if (props.disabled || !(nonStandardTag || hashLink)) {
          return
        }
        const { keyCode } = evt
        // Add SPACE handler for `href="#"` and ENTER handler for non-standard tags
        if (keyCode === KeyCodes.SPACE || (keyCode === KeyCodes.ENTER && nonStandardTag)) {
          const target = evt.currentTarget || evt.target
          evt.preventDefault()
          target.click()
        }
      },
      click(evt) {
        /* istanbul ignore if: blink/button disabled should handle this */
        if (props.disabled && isEvent(evt)) {
          evt.stopPropagation()
          evt.preventDefault()
        } else if (toggle && listeners && listeners['update:pressed']) {
          // Send `.sync` updates to any "pressed" prop (if `.sync` listeners)
          // `concat()` will normalize the value to an array without
          // double wrapping an array value in an array
          concat(listeners['update:pressed']).forEach(fn => {
            if (isFunction(fn)) {
              fn(!props.pressed)
            }
          })
        }
      }
    }

    if (toggle) {
      on.focusin = handleFocus
      on.focusout = handleFocus
    }

    const componentData = {
      staticClass: 'btn',
      class: computeClass(props),
      props: computeLinkProps(props),
      attrs: computeAttrs(props, data),
      on
    }

    return h(link ? BLink : props.tag, mergeData(data, componentData), children)
  }
})
