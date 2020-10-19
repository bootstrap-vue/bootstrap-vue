import Vue, { mergeData } from '../../vue'
import { NAME_FORM } from '../../constants/components'

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

// @vue/component
export const BForm = /*#__PURE__*/ Vue.extend({
  name: NAME_FORM,
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      'form',
      mergeData(data, {
        class: {
          'form-inline': props.inline,
          'was-validated': props.validated
        },
        attrs: {
          id: props.id,
          novalidate: props.novalidate
        }
      }),
      children
    )
  }
})
