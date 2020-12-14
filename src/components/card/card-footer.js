import { Vue, mergeData } from '../../vue'
import { NAME_CARD_FOOTER } from '../../constants/components'
import { PROP_TYPE_ARRAY_OBJECT_STRING, PROP_TYPE_STRING } from '../../constants/props'
import { htmlOrText } from '../../utils/html'
import { sortKeys } from '../../utils/object'
import { copyProps, makeProp, makePropsConfigurable, prefixPropName } from '../../utils/props'
import { props as BCardProps } from '../../mixins/card'

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...copyProps(BCardProps, prefixPropName.bind(null, 'footer')),
    footer: makeProp(PROP_TYPE_STRING),
    footerClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    footerHtml: makeProp(PROP_TYPE_STRING)
  }),
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
