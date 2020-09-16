import { NAME_FORM_TEXT } from '../../constants/components'
import Vue, { mergeData } from '../../utils/vue'
import { getComponentConfig } from '../../utils/config'

export const props = {
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
    default: () => getComponentConfig(NAME_FORM_TEXT, 'textVariant')
  },
  inline: {
    type: Boolean,
    default: false
  }
}

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
