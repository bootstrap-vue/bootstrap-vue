import Vue, { mergeData } from '../../vue'
import { NAME_CARD_SUB_TITLE } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import { toString } from '../../utils/string'

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

// @vue/component
export const BCardSubTitle = /*#__PURE__*/ Vue.extend({
  name: NAME_CARD_SUB_TITLE,
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      props.subTitleTag,
      mergeData(data, {
        staticClass: 'card-subtitle',
        class: [props.subTitleTextVariant ? `text-${props.subTitleTextVariant}` : null]
      }),
      children || toString(props.subTitle)
    )
  }
})
