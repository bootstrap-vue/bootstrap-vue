import { mergeData } from 'vue-functional-data-merge'
import {
  CLASS_NAME_CARD_HEADER,
  CLASS_NAME_BACKGROUND,
  CLASS_NAME_BORDER,
  CLASS_NAME_TEXT
} from '../../constants/class-names'
import { NAME_CARD_HEADER } from '../../constants/components'
import Vue from '../../utils/vue'
import copyProps from '../../utils/copy-props'
import prefixPropName from '../../utils/prefix-prop-name'
import { htmlOrText } from '../../utils/html'
import cardMixin from '../../mixins/card'

// --- Props ---
export const props = {
  ...copyProps(cardMixin.props, prefixPropName.bind(null, 'header')),
  header: {
    type: String
    // default: null
  },
  headerHtml: {
    type: String
    // default: null
  },
  headerClass: {
    type: [String, Object, Array]
    // default: null
  }
}

// --- Main component ---
// @vue/component
export const BCardHeader = /*#__PURE__*/ Vue.extend({
  name: NAME_CARD_HEADER,
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      props.headerTag,
      mergeData(data, {
        staticClass: CLASS_NAME_CARD_HEADER,
        class: [
          props.headerClass,
          {
            [`${CLASS_NAME_BACKGROUND}-${props.headerBgVariant}`]: props.headerBgVariant,
            [`${CLASS_NAME_BORDER}-${props.headerBorderVariant}`]: props.headerBorderVariant,
            [`${CLASS_NAME_TEXT}-${props.headerTextVariant}`]: props.headerTextVariant
          }
        ]
      }),
      children || [h('div', { domProps: htmlOrText(props.headerHtml, props.header) })]
    )
  }
})
