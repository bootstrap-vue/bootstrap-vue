import Vue from 'vue'
import { mergeData } from 'vue-functional-data-merge'
import { getComponentConfig } from '../../utils/config'

const NAME = 'BButtonClose'

const props = {
  disabled: {
    type: Boolean,
    default: false
  },
  ariaLabel: {
    type: String,
    default: () => String(getComponentConfig(NAME, 'ariaLabel'))
  },
  textVariant: {
    type: String,
    default: () => String(getComponentConfig(NAME, 'textVariant') || '') || null
  }
}

// @vue/component
export default Vue.extend({
  name: NAME,
  functional: true,
  props,
  render(h, { props, data, listeners, slots }) {
    const componentData = {
      staticClass: 'close',
      class: {
        [`text-${props.textVariant}`]: props.textVariant
      },
      attrs: {
        type: 'button',
        disabled: props.disabled,
        'aria-label': props.ariaLabel ? String(props.ariaLabel) : null
      },
      on: {
        click(e) {
          // Ensure click on button HTML content is also disabled
          /* istanbul ignore if: bug in JSDOM still emits click on inner element */
          if (props.disabled && e instanceof Event) {
            e.stopPropagation()
            e.preventDefault()
          }
        }
      }
    }
    // Careful not to override the default slot with innerHTML
    if (!slots().default) {
      componentData.domProps = { innerHTML: '&times;' }
    }
    return h('button', mergeData(data, componentData), slots().default)
  }
})
