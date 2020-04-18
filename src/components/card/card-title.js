import { mergeData } from 'vue-functional-data-merge'
import { CLASS_NAME_CARD_TITLE } from '../../constants/class-names'
import { NAME_CARD_TITLE } from '../../constants/components'
import Vue from '../../utils/vue'
import { hasChildren } from '../../utils/dom'
import { toString } from '../../utils/string'

// --- Props ---
export const props = {
  title: {
    type: String
    // default: null
  },
  titleTag: {
    type: String,
    default: 'h4'
  }
}

// --- Main component ---
// @vue/component
export const BCardTitle = /*#__PURE__*/ Vue.extend({
  name: NAME_CARD_TITLE,
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      props.titleTag,
      mergeData(data, {
        staticClass: CLASS_NAME_CARD_TITLE
      }),
      hasChildren(children) ? children : toString(props.title)
    )
  }
})
