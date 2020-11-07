import Vue, { mergeData } from '../../vue'
import { NAME_CARD_FOOTER } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import { htmlOrText } from '../../utils/html'
import { copyProps, prefixPropName } from '../../utils/props'
import { props as cardProps } from '../../mixins/card'

// --- Props ---

export const props = makePropsConfigurable(
  {
    ...copyProps(cardProps, prefixPropName.bind(null, 'footer')),
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
  },
  NAME_CARD_FOOTER
)

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
        staticClass: 'card-footer',
        class: [
          props.footerClass,
          {
            [`bg-${footerBgVariant}`]: footerBgVariant,
            [`border-${footerBorderVariant}`]: footerBorderVariant,
            [`text-${footerTextVariant}`]: footerTextVariant
          }
        ],
        domProps: children ? {} : htmlOrText(props.footerHtml, props.footer)
      }),
      children
    )
  }
})
