import { mergeData } from 'vue-functional-data-merge'
import pluckProps from '../../utils/pluck-props'
import { concat } from '../../utils/array'
import { assign, keys } from '../../utils/object'
import { addClass, removeClass } from '../../utils/dom'
import Link, { propsFactory as linkPropsFactory } from '../link/link'

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
    default: null
  },
  type: {
    type: String,
    default: 'button'
  },
  tag: {
    type: String,
    default: 'button'
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

export const props = assign(linkProps, btnProps)

// Focus handler for toggle buttons.  Needs class of 'focus' when focused.
function handleFocus (evt) {
  if (evt.type === 'focusin') {
    addClass(evt.target, 'focus')
  } else if (evt.type === 'focusout') {
    removeClass(evt.target, 'focus')
  }
}

export default {
  functional: true,
  props,
  render (h, { props, attrs, data, listeners, children }) {
    // If tag prop is set to `a`, we use a b-link to get proper disabled handling
    const isLink = Boolean(props.href || props.to || props.tag.toLowerCase() === 'a') 
    const isToggle = typeof props.pressed === 'boolean'
    const isButtonTag = props.tag.tolowerCase() === 'button'
    const nonStandardTag = !isLink && !isButtonTag
    const on = {
      click (e) {
        if (props.disabled && e instanceof Event) {
          e.stopPropagation()
          e.preventDefault()
        } else if (isToggle) {
          // Concat will normalize the value to an array
          // without double wrapping an array value in an array.
          concat(listeners['update:pressed'] || []).forEach(fn => {
            if (typeof fn === 'function') {
              fn(!props.pressed)
            }
          })
        }
      }
    }

    if (isToggle) {
      on.focusin = handleFocus
      on.focusout = handleFocus
    }

    const componentData = {
      staticClass: 'btn',
      class: [
        props.variant ? `btn-${props.variant}` : `btn-secondary`,
        {
          [`btn-${props.size}`]: Boolean(props.size),
          'btn-block': props.block,
          disabled: props.disabled,
          active: props.pressed
        }
      ],
      props: isLink ? pluckProps(linkPropKeys, props) : null,
      attrs: {
        // Type only used for tag button
        type: isButtonTag && !isLink ? props.type : null,
        disabled: isButtonTag && !isLink ? props.disabled : null,
        // We add a role of button when the tag is not a link or button for ARIA.
        // Don't bork the role provided in attrs when not a nonStandardTag
        role: nonStandardTag ? 'button' : ((attrs && attrs['role']) ? attrs['role'] : null)
        'aria-pressed': isToggle ? String(props.pressed) : null,
        // Tab index is used when the component becomes a link or not a button.
        // Links are tabable, but don't allow disabled, while non buttons or links
        // are not tabable, so we mimic that functionality by disabling tabbing
        // when disabled, and adding a tabindex of '0' to non buttons or non links.
        tabindex:
          props.disabled && (isLink || nonStandardTag)
            ? '-1'
            : data.attrs ? (data.attrs['tabindex'] || (nonStandardTag ? '0' : null)) : null 
      },
      on
    }

    return h(isLink ? Link : props.tag, mergeData(data, componentData), children)
  }
}
