import Vue, { mergeData } from '../../vue'
import { NAME_CARD_TEXT } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'

export const props = makePropsConfigurable(
  {
    textTag: {
      type: String,
      default: 'p'
    }
  },
  NAME_CARD_TEXT
)

// @vue/component
export const BCardText = /*#__PURE__*/ Vue.extend({
  name: NAME_CARD_TEXT,
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(props.textTag, mergeData(data, { staticClass: 'card-text' }), children)
  }
})
