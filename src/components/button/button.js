import { Vue, mergeData } from '../../vue'
import { NAME_BUTTON } from '../../constants/components'
import { CODE_ENTER, CODE_SPACE } from '../../constants/key-codes'
import { PROP_TYPE_BOOLEAN, PROP_TYPE_STRING } from '../../constants/props'
import { concat } from '../../utils/array'
import { addClass, isTag, removeClass } from '../../utils/dom'
import { stopEvent } from '../../utils/events'
import { isBoolean, isEvent, isFunction } from '../../utils/inspect'
import { omit, sortKeys } from '../../utils/object'
import { makeProp, makePropsConfigurable, pluckProps } from '../../utils/props'
import { isLink as isLinkStrict } from '../../utils/router'
import { BLink, props as BLinkProps } from '../link/link'

// --- Props ---

const linkProps = omit(BLinkProps, ['event', 'routerTag'])
delete linkProps.href.default
delete linkProps.to.default

export const props = makePropsConfigurable(
  sortKeys({
    ...linkProps,
    block: makeProp(PROP_TYPE_BOOLEAN, false),
    disabled: makeProp(PROP_TYPE_BOOLEAN, false),
    pill: makeProp(PROP_TYPE_BOOLEAN, false),
    // Tri-state: `true`, `false` or `null`
    // => On, off, not a toggle
    pressed: makeProp(PROP_TYPE_BOOLEAN, null),
    size: makeProp(PROP_TYPE_STRING),
    squared: makeProp(PROP_TYPE_BOOLEAN, false),
    tag: makeProp(PROP_TYPE_STRING, 'button'),
    type: makeProp(PROP_TYPE_STRING, 'button'),
    variant: makeProp(PROP_TYPE_STRING, 'secondary')
  }),
  NAME_BUTTON
)

// --- Helper methods ---

// Focus handler for toggle buttons
// Needs class of 'focus' when focused
const handleFocus = event => {
  if (event.type === 'focusin') {
    addClass(event.target, 'focus')
  } else if (event.type === 'focusout') {
    removeClass(event.target, 'focus')
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
  `btn-${props.variant || 'secondary'}`,
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
  name: NAME_BUTTON,
  functional: true,
  props,
  render(h, { props, data, listeners, children }) {
    const toggle = isToggle(props)
    const link = isLink(props)
    const nonStandardTag = isNonStandardTag(props)
    const hashLink = link && props.href === '#'
    const on = {
      keydown(event) {
        // When the link is a `href="#"` or a non-standard tag (has `role="button"`),
        // we add a keydown handlers for CODE_SPACE/CODE_ENTER
        /* istanbul ignore next */
        if (props.disabled || !(nonStandardTag || hashLink)) {
          return
        }
        const { keyCode } = event
        // Add CODE_SPACE handler for `href="#"` and CODE_ENTER handler for non-standard tags
        if (keyCode === CODE_SPACE || (keyCode === CODE_ENTER && nonStandardTag)) {
          const target = event.currentTarget || event.target
          stopEvent(event, { propagation: false })
          target.click()
        }
      },
      click(event) {
        /* istanbul ignore if: blink/button disabled should handle this */
        if (props.disabled && isEvent(event)) {
          stopEvent(event)
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
