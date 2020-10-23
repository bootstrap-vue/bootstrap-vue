import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_CARD_TEXT } from '../../constants/components'

// --- Props ---

export const props = {
  textTag: {
    type: String,
    default: 'p'
  }
}

// --- Main component ---
// @vue/component
export const BCardText = /*#__PURE__*/ defineComponent({
  name: NAME_CARD_TEXT,
  functional: true,
  props,
  render(_, { props, data, children }) {
    return h(props.textTag, mergeProps(data, { staticClass: 'card-text' }), children)
  }
})
