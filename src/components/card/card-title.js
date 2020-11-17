import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_CARD_TITLE } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import { toString } from '../../utils/string'

// --- Props ---

export const props = makePropsConfigurable(
  {
    title: {
      type: String
      // default: null
    },
    titleTag: {
      type: String,
      default: 'h4'
    }
  },
  NAME_CARD_TITLE
)

// --- Main component ---

// @vue/component
export const BCardTitle = /*#__PURE__*/ defineComponent({
  name: NAME_CARD_TITLE,
  functional: true,
  props,
  render(_, { props, data, children }) {
    return h(
      props.titleTag,
      mergeProps(data, {
        staticClass: 'card-title'
      }),
      children || toString(props.title)
    )
  }
})
