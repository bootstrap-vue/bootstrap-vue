import Vue, { mergeData } from '../../vue'
import { NAME_CARD_GROUP } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'

export const props = makePropsConfigurable(
  {
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
  },
  NAME_CARD_GROUP
)

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
