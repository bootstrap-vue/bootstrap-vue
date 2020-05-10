import { CLASS_NAME_BUTTON_CLOSE } from '../../constants/class-names'
import { NAME_BUTTON_CLOSE } from '../../constants/components'
import Vue, { mergeData } from '../../utils/vue'
import { getComponentConfig } from '../../utils/config'
import { hasChildren } from '../../utils/dom'
import { isEvent } from '../../utils/inspect'

// --- Props ---
const props = {
  content: {
    type: String,
    default: () => getComponentConfig(NAME_BUTTON_CLOSE, 'content')
  },
  disabled: {
    type: Boolean,
    default: false
  },
  ariaLabel: {
    type: String,
    default: () => getComponentConfig(NAME_BUTTON_CLOSE, 'ariaLabel')
  },
  textVariant: {
    type: String,
    default: () => getComponentConfig(NAME_BUTTON_CLOSE, 'textVariant')
  }
}

// --- Main component ---
// @vue/component
export const BButtonClose = /*#__PURE__*/ Vue.extend({
  name: NAME_BUTTON_CLOSE,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const { disabled, textVariant, ariaLabel } = props
    const componentData = {
      staticClass: CLASS_NAME_BUTTON_CLOSE,
      class: {
        [`text-${textVariant}`]: textVariant
      },
      attrs: {
        type: 'button',
        disabled,
        'aria-label': ariaLabel ? String(ariaLabel) : null
      },
      on: {
        click(evt) {
          // Ensure click on button HTML content is also disabled
          /* istanbul ignore if: bug in JSDOM still emits click on inner element */
          if (disabled && isEvent(evt)) {
            evt.stopPropagation()
            evt.preventDefault()
          }
        }
      }
    }

    // Careful not to override the default slot with innerHTML
    if (!hasChildren(children)) {
      componentData.domProps = { innerHTML: props.content }
    }

    return h('button', mergeData(data, componentData), [children])
  }
})
