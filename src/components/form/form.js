import { CLASS_NAME_FORM, CLASS_NAME_WAS_VALIDATED } from '../../constants/class-names'
import { NAME_FORM } from '../../constants/components'
import Vue, { mergeData } from '../../utils/vue'
import { suffixClass } from '../../utils/string'

// --- Props ---

export const props = {
  id: {
    type: String
    // default: null
  },
  inline: {
    type: Boolean,
    default: false
  },
  novalidate: {
    type: Boolean,
    default: false
  },
  validated: {
    type: Boolean,
    default: false
  }
}

// --- Main component ---
// @vue/component
export const BForm = /*#__PURE__*/ Vue.extend({
  name: NAME_FORM,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const { id, novalidate } = props

    return h(
      'form',
      mergeData(data, {
        class: {
          [suffixClass(CLASS_NAME_FORM, 'inline')]: props.inline,
          [CLASS_NAME_WAS_VALIDATED]: props.validated
        },
        attrs: { id, novalidate }
      }),
      children
    )
  }
})
