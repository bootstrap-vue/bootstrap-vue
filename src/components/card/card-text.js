import Vue, { mergeData } from '../../vue'
import { NAME_CARD_TEXT } from '../../constants/components'

export const props = {
  textTag: {
    type: String,
    default: 'p'
  }
}

// @vue/component
export const BCardText = /*#__PURE__*/ Vue.extend({
  name: NAME_CARD_TEXT,
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(props.textTag, mergeData(data, { staticClass: 'card-text' }), children)
  }
})
