import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_CARD_SUB_TITLE } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import { toString } from '../../utils/string'

// --- Props ---

export const props = makePropsConfigurable(
  {
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
      default: 'muted'
    }
  },
  NAME_CARD_SUB_TITLE
)

// --- Main component ---

// @vue/component
export const BCardSubTitle = /*#__PURE__*/ defineComponent({
  name: NAME_CARD_SUB_TITLE,
  functional: true,
  props,
  render(_, { props, data, children }) {
    return h(
      props.subTitleTag,
      mergeProps(data, {
        staticClass: 'card-subtitle',
        class: [props.subTitleTextVariant ? `text-${props.subTitleTextVariant}` : null]
      }),
      children || toString(props.subTitle)
    )
  }
})
