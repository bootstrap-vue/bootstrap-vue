import { NAME_CARD_TITLE } from '../../constants/components'
import Vue, { mergeData } from '../../utils/vue'
import { toString } from '../../utils/string'

export const props = {
  title: {
    type: String
    // default: null
  },
  titleTag: {
    type: String,
    default: 'h4'
  }
}

// @vue/component
export const BCardTitle = /*#__PURE__*/ Vue.extend({
  name: NAME_CARD_TITLE,
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      props.titleTag,
      mergeData(data, {
        staticClass: 'card-title'
      }),
      children || toString(props.title)
    )
  }
})
