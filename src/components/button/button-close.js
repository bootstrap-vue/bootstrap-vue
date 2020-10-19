import Vue, { mergeData } from '../../vue'
import { NAME_BUTTON_CLOSE } from '../../constants/components'
import { SLOT_NAME_DEFAULT } from '../../constants/slot-names'
import { getComponentConfig } from '../../utils/config'
import { stopEvent } from '../../utils/events'
import { isEvent } from '../../utils/inspect'
import { hasNormalizedSlot, normalizeSlot } from '../../utils/normalize-slot'

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

// @vue/component
export const BButtonClose = /*#__PURE__*/ Vue.extend({
  name: NAME_BUTTON_CLOSE,
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
            stopEvent(evt)
          }
        }
      }
    }
    // Careful not to override the default slot with innerHTML
    if (!hasNormalizedSlot(SLOT_NAME_DEFAULT, $scopedSlots, $slots)) {
      componentData.domProps = { innerHTML: props.content }
    }
    return h(
      'button',
      mergeData(data, componentData),
      normalizeSlot(SLOT_NAME_DEFAULT, {}, $scopedSlots, $slots)
    )
  }
})
