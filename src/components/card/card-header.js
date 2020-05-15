import {
  CLASS_NAME_CARD_HEADER,
  CLASS_NAME_BACKGROUND,
  CLASS_NAME_BORDER,
  CLASS_NAME_TEXT
} from '../../constants/class-names'
import { NAME_CARD_HEADER } from '../../constants/components'
import Vue, { mergeData } from '../../utils/vue'
import { htmlOrText } from '../../utils/html'
import { copyProps, prefixPropName } from '../../utils/props'
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
    const { headerBgVariant, headerBorderVariant, headerTextVariant } = props

    return h(
      props.headerTag,
      mergeData(data, {
        staticClass: CLASS_NAME_CARD_HEADER,
        class: [
          props.headerClass,
          {
            [`${CLASS_NAME_BACKGROUND}-${headerBgVariant}`]: headerBgVariant,
            [`${CLASS_NAME_BORDER}-${headerBorderVariant}`]: headerBorderVariant,
            [`${CLASS_NAME_TEXT}-${headerTextVariant}`]: headerTextVariant
          }
        ],
        domProps: children ? {} : htmlOrText(props.headerHtml, props.header)
      }),
      children
    )
  }
})
