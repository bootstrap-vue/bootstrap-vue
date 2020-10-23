import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_FORM_TEXT } from '../../constants/components'
import { getComponentConfig } from '../../utils/config'

// --- Props ---

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

// --- Main component ---
// @vue/component
export const BFormText = /*#__PURE__*/ defineComponent({
  name: NAME_FORM_TEXT,
  functional: true,
  props,
  render(_, { props, data, children }) {
    return h(
      props.tag,
      mergeProps(data, {
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
