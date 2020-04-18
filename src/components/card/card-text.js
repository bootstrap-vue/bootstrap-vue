import { mergeData } from 'vue-functional-data-merge'
import { CLASS_NAME_CARD_TEXT } from '../../constants/class-names'
import { NAME_CARD_TEXT } from '../../constants/components'
import Vue from '../../utils/vue'

// --- Props ---
export const props = {
  textTag: {
    type: String,
    default: 'p'
  }
}

// --- Main component ---
// @vue/component
export const BCardText = /*#__PURE__*/ Vue.extend({
  name: NAME_CARD_TEXT,
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(props.textTag, mergeData(data, { staticClass: CLASS_NAME_CARD_TEXT }), children)
  }
})
