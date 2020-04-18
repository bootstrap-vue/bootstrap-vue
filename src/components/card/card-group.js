import { mergeData } from 'vue-functional-data-merge'
import { CLASS_NAME_CARD, CLASS_NAME_CARD_GROUP } from '../../constants/class-names'
import { NAME_CARD_GROUP } from '../../constants/components'
import Vue from '../../utils/vue'
import { suffixClass } from '../../utils/string'

// --- Props ---
export const props = {
  tag: {
    type: String,
    default: 'div'
  },
  deck: {
    type: Boolean,
    default: false
  },
  columns: {
    type: Boolean,
    default: false
  }
}

// --- Main component ---
// @vue/component
export const BCardGroup = /*#__PURE__*/ Vue.extend({
  name: NAME_CARD_GROUP,
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      props.tag,
      mergeData(data, {
        staticClass: props.deck
          ? suffixClass(CLASS_NAME_CARD, 'deck')
          : props.columns
            ? suffixClass(CLASS_NAME_CARD, 'columns')
            : CLASS_NAME_CARD_GROUP
      }),
      children
    )
  }
})
