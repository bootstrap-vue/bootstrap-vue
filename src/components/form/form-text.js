import Vue, { mergeData } from '../../vue'
import { NAME_FORM_TEXT } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'

export const props = makePropsConfigurable(
  {
    id: {
      type: String
      // default: null
    },
    tag: {
      type: String,
      default: 'small'
    },
    textVariant: {
      type: String,
      default: 'muted'
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  NAME_FORM_TEXT
)

// @vue/component
export const BFormText = /*#__PURE__*/ Vue.extend({
  name: NAME_FORM_TEXT,
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      props.tag,
      mergeData(data, {
        class: {
          'form-text': !props.inline,
          [`text-${props.textVariant}`]: props.textVariant
        },
        attrs: {
          id: props.id
        }
      }),
      children
    )
  }
})
