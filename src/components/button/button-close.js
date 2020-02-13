import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import { getComponentConfig } from '../../utils/config'
import { isEvent } from '../../utils/inspect'
import { hasNormalizedSlot, normalizeSlot } from '../../utils/normalize-slot'

const NAME = 'BButtonClose'

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

// @vue/component
export const BButtonClose = /*#__PURE__*/ Vue.extend({
  name: NAME,
  functional: true,
  props,
  render(h, { props, data, slots, scopedSlots }) {
    const $slots = slots()
    const $scopedSlots = scopedSlots || {}

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
        click(evt) {
          // Ensure click on button HTML content is also disabled
          /* istanbul ignore if: bug in JSDOM still emits click on inner element */
          if (props.disabled && isEvent(evt)) {
            evt.stopPropagation()
            evt.preventDefault()
          }
        }
      }
    }
    // Careful not to override the default slot with innerHTML
    if (!hasNormalizedSlot('default', $scopedSlots, $slots)) {
      componentData.domProps = { innerHTML: props.content }
    }
    return h(
      'button',
      mergeData(data, componentData),
      normalizeSlot('default', {}, $scopedSlots, $slots)
    )
  }
})
