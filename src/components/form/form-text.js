import { CLASS_NAME_FORM_TEXT, CLASS_NAME_TEXT } from '../../constants/class-names'
import { NAME_FORM_TEXT } from '../../constants/components'
import Vue, { mergeData } from '../../utils/vue'
import { getComponentConfig } from '../../utils/config'
import { suffixClass } from '../../utils/string'

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
export const BFormText = /*#__PURE__*/ Vue.extend({
  name: NAME_FORM_TEXT,
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      props.tag,
      mergeData(data, {
        class: {
          [CLASS_NAME_FORM_TEXT]: !props.inline,
          [suffixClass(CLASS_NAME_TEXT, props.textVariant)]: props.textVariant
        },
        attrs: { id: props.id }
      }),
      children
    )
  }
})
