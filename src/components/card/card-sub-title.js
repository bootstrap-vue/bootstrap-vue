import { mergeData } from 'vue-functional-data-merge'
import { CLASS_NAME_CARD_SUB_TITLE, CLASS_NAME_TEXT } from '../../constants/class-names'
import { NAME_CARD_SUB_TITLE } from '../../constants/components'
import Vue from '../../utils/vue'
import { getComponentConfig } from '../../utils/config'
import { hasChildren } from '../../utils/dom'
import { toString } from '../../utils/string'

// --- Props ---
export const props = {
  subTitle: {
    type: String
    // default: null
  },
  subTitleTag: {
    type: String,
    default: 'h6'
  },
  subTitleTextVariant: {
    type: String,
    default: () => getComponentConfig(NAME_CARD_SUB_TITLE, 'subTitleTextVariant')
  }
}

// --- Main component ---
// @vue/component
export const BCardSubTitle = /*#__PURE__*/ Vue.extend({
  name: NAME_CARD_SUB_TITLE,
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      props.subTitleTag,
      mergeData(data, {
        staticClass: CLASS_NAME_CARD_SUB_TITLE,
        class: props.subTitleTextVariant ? `${CLASS_NAME_TEXT}-${props.subTitleTextVariant}` : null
      }),
      hasChildren(children) ? children : toString(props.subTitle)
    )
  }
})
