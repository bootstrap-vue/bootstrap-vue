import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_CARD_GROUP } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'

// --- Props ---

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

// --- Main component ---
// @vue/component
export const BCardGroup = /*#__PURE__*/ defineComponent({
  name: NAME_CARD_GROUP,
  functional: true,
  props,
  render(_, { props, data, children }) {
    return h(
      props.tag,
      mergeProps(data, {
        class: props.deck ? 'card-deck' : props.columns ? 'card-columns' : 'card-group'
      }),
      children
    )
  }
})
