import {
  CLASS_NAME_BACKGROUND,
  CLASS_NAME_BORDER,
  CLASS_NAME_CARD_FOOTER,
  CLASS_NAME_TEXT
} from '../../constants/class-names'
import { NAME_CARD_FOOTER } from '../../constants/components'
import Vue, { mergeData } from '../../utils/vue'
import prefixPropName from '../../utils/prefix-prop-name'
import copyProps from '../../utils/copy-props'
import { htmlOrText } from '../../utils/html'
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
    return h(
      props.footerTag,
      mergeData(data, {
        staticClass: CLASS_NAME_CARD_FOOTER,
        class: [
          props.footerClass,
          {
            [`${CLASS_NAME_BACKGROUND}-${props.footerBgVariant}`]: props.footerBgVariant,
            [`${CLASS_NAME_BORDER}-${props.footerBorderVariant}`]: props.footerBorderVariant,
            [`${CLASS_NAME_TEXT}-${props.footerTextVariant}`]: props.footerTextVariant
          }
        ]
      }),
      children || [h('div', { domProps: htmlOrText(props.footerHtml, props.footer) })]
    )
  }
})
