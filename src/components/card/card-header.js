import { Vue, mergeData } from '../../vue'
import { NAME_CARD_HEADER } from '../../constants/components'
import { PROP_TYPE_ARRAY_OBJECT_STRING, PROP_TYPE_STRING } from '../../constants/props'
import { htmlOrText } from '../../utils/html'
import { sortKeys } from '../../utils/object'
import { copyProps, makeProp, makePropsConfigurable, prefixPropName } from '../../utils/props'
import { props as BCardProps } from '../../mixins/card'

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...copyProps(BCardProps, prefixPropName.bind(null, 'header')),
    header: makeProp(PROP_TYPE_STRING),
    headerClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    headerHtml: makeProp(PROP_TYPE_STRING)
  }),
  NAME_CARD_HEADER
)

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
        staticClass: 'card-header',
        class: [
          props.headerClass,
          {
            [`bg-${headerBgVariant}`]: headerBgVariant,
            [`border-${headerBorderVariant}`]: headerBorderVariant,
            [`text-${headerTextVariant}`]: headerTextVariant
          }
        ],
        domProps: children ? {} : htmlOrText(props.headerHtml, props.header)
      }),
      children
    )
  }
})
