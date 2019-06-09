import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import pluckProps from '../../utils/pluck-props'
import { concat } from '../../utils/array'
import { getComponentConfig } from '../../utils/config'
import { addClass, removeClass } from '../../utils/dom'
import { isBoolean, isFunction } from '../../utils/inspect'
import { keys } from '../../utils/object'
import { BLink, propsFactory as linkPropsFactory } from '../link/link'

// --- Constants --

const NAME = 'BButton'

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
    default: null
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
    // tri-state prop: true, false or null
    // => on, off, not a toggle
    type: Boolean,
    default: null
  }
}

let linkProps = linkPropsFactory()
delete linkProps.href.default
delete linkProps.to.default
const linkPropKeys = keys(linkProps)

export const props = { ...linkProps, ...btnProps }

// --- Helper methods ---

// Focus handler for toggle buttons.  Needs class of 'focus' when focused.
const handleFocus = evt => {
  if (evt.type === 'focusin') {
    addClass(evt.target, 'focus')
  } else if (evt.type === 'focusout') {
    removeClass(evt.target, 'focus')
  }
}

// Is the requested button a link?
const isLink = props => {
  // If tag prop is set to `a`, we use a b-link to get proper disabled handling
  return Boolean(props.href || props.to || (props.tag && String(props.tag).toLowerCase() === 'a'))
}

// Is the button to be a toggle button?
const isToggle = props => isBoolean(props.pressed)

// Is the button "really" a button?
const isButton = props => {
  if (isLink(props)) {
    return false
  } else if (props.tag && String(props.tag).toLowerCase() !== 'button') {
    return false
  }
  return true
}

// Is the requested tag not a button or link?
const isNonStandardTag = props => !isLink(props) && !isButton(props)

// Compute required classes (non static classes)
const computeClass = props => [
  `btn-${props.variant || getComponentConfig(NAME, 'variant')}`,
  {
    [`btn-${props.size}`]: Boolean(props.size),
    'btn-block': props.block,
    'rounded-pill': props.pill,
    'rounded-0': props.squared && !props.pill,
    disabled: props.disabled,
    active: props.pressed
  }
]

// Compute the link props to pass to b-link (if required)
const computeLinkProps = props => (isLink(props) ? pluckProps(linkPropKeys, props) : null)

// Compute the attributes for a button
const computeAttrs = (props, data) => {
  const button = isButton(props)
  const link = isLink(props)
  const toggle = isToggle(props)
  const nonStdTag = isNonStandardTag(props)
  const role = data.attrs && data.attrs['role'] ? data.attrs['role'] : null
  let tabindex = data.attrs ? data.attrs['tabindex'] : null
  if (nonStdTag) {
    tabindex = '0'
  }
  return {
    // Type only used for "real" buttons
    type: button && !link ? props.type : null,
    // Disabled only set on "real" buttons
    disabled: button ? props.disabled : null,
    // We add a role of button when the tag is not a link or button for ARIA.
    // Don't bork any role provided in data.attrs when isLink or isButton
    role: nonStdTag ? 'button' : role,
    // We set the aria-disabled state for non-standard tags
    'aria-disabled': nonStdTag ? String(props.disabled) : null,
    // For toggles, we need to set the pressed state for ARIA
    'aria-pressed': toggle ? String(props.pressed) : null,
    // autocomplete off is needed in toggle mode to prevent some browsers from
    // remembering the previous setting when using the back button.
    autocomplete: toggle ? 'off' : null,
    // Tab index is used when the component is not a button.
    // Links are tabbable, but don't allow disabled, while non buttons or links
    // are not tabbable, so we mimic that functionality by disabling tabbing
    // when disabled, and adding a tabindex of '0' to non buttons or non links.
    tabindex: props.disabled && !button ? '-1' : tabindex
  }
}

// @vue/component
export const BButton = /*#__PURE__*/ Vue.extend({
  name: NAME,
  functional: true,
  props,
  render(h, { props, data, listeners, children }) {
    const toggle = isToggle(props)
    const link = isLink(props)
    const on = {
      click(e) {
        /* istanbul ignore if: blink/button disabled should handle this */
        if (props.disabled && e instanceof Event) {
          e.stopPropagation()
          e.preventDefault()
        } else if (toggle && listeners && listeners['update:pressed']) {
          // Send .sync updates to any "pressed" prop (if .sync listeners)
          // Concat will normalize the value to an array
          // without double wrapping an array value in an array.
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

export default BButton
