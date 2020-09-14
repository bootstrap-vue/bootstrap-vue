import { NAME_CARD_GROUP } from '../../constants/components'
import Vue, { mergeData } from '../../utils/vue'

export const props = {
  tag: {
    type: String,
    default: 'div'
  },
  deck: {
    type: Boolean,
    default: false
  },
  columns: {
    type: Boolean,
    default: false
  }
}

// @vue/component
export const BCardGroup = /*#__PURE__*/ Vue.extend({
  name: NAME_CARD_GROUP,
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      props.tag,
      mergeData(data, {
        class: props.deck ? 'card-deck' : props.columns ? 'card-columns' : 'card-group'
      }),
      children
    )
  }
})
