import { mergeData } from 'vue-functional-data-merge'
import Vue from '../../utils/vue'
import { getComponentConfig } from '../../utils/config'
import { isEvent } from '../../utils/inspect'

// --- Constants ---
const NAME = 'BButtonClose'

// --- Props ---
const props = {
  content: {
    type: String,
    default: () => getComponentConfig(NAME, 'content')
  },
  disabled: {
    type: Boolean,
    default: false
  },
  ariaLabel: {
    type: String,
    default: () => getComponentConfig(NAME, 'ariaLabel')
  },
  textVariant: {
    type: String,
    default: () => getComponentConfig(NAME, 'textVariant')
  }
}

// --- Main component ---
// @vue/component
export const BButtonClose = /*#__PURE__*/ Vue.extend({
  name: NAME,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const { disabled, textVariant, ariaLabel } = props
    const componentData = {
      staticClass: 'close',
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
    if (!children) {
      componentData.domProps = { innerHTML: props.content }
    }
    return h('button', mergeData(data, componentData), [children])
  }
})
