import { defineComponent, h, mergeData } from '../../vue'
import { NAME_CARD_HEADER } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import { htmlOrText } from '../../utils/html'
import { copyProps, prefixPropName } from '../../utils/props'
import { props as BCardProps } from '../../mixins/card'

// --- Props ---

export const props = makePropsConfigurable(
  {
    ...copyProps(BCardProps, prefixPropName.bind(null, 'header')),
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
  },
  NAME_CARD_HEADER
)

// --- Main component ---

// @vue/component
export const BCardHeader = /*#__PURE__*/ defineComponent({
  name: NAME_CARD_HEADER,
  functional: true,
  props,
  render(_, { props, data, children }) {
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
