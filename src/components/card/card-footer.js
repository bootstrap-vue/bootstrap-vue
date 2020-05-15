import {
  CLASS_NAME_BACKGROUND,
  CLASS_NAME_BORDER,
  CLASS_NAME_CARD_FOOTER,
  CLASS_NAME_TEXT
} from '../../constants/class-names'
import { NAME_CARD_FOOTER } from '../../constants/components'
import Vue, { mergeData } from '../../utils/vue'
import { htmlOrText } from '../../utils/html'
import { copyProps, prefixPropName } from '../../utils/props'
import cardMixin from '../../mixins/card'

// --- Props ---

export const props = {
  ...copyProps(cardMixin.props, prefixPropName.bind(null, 'footer')),
  footer: {
    type: String
    // default: null
  },
  footerHtml: {
    type: String
    // default: null
  },
  footerClass: {
    type: [String, Object, Array]
    // default: null
  }
}

// --- Main component ---
// @vue/component
export const BCardFooter = /*#__PURE__*/ Vue.extend({
  name: NAME_CARD_FOOTER,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const { footerBgVariant, footerBorderVariant, footerTextVariant } = props

    return h(
      props.footerTag,
      mergeData(data, {
        staticClass: CLASS_NAME_CARD_FOOTER,
        class: [
          props.footerClass,
          {
            [`${CLASS_NAME_BACKGROUND}-${footerBgVariant}`]: footerBgVariant,
            [`${CLASS_NAME_BORDER}-${footerBorderVariant}`]: footerBorderVariant,
            [`${CLASS_NAME_TEXT}-${footerTextVariant}`]: footerTextVariant
          }
        ],
        domProps: children ? {} : htmlOrText(props.footerHtml, props.footer)
      }),
      children
    )
  }
})
