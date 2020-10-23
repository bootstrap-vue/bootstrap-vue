import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_FORM } from '../../constants/components'

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
export const BForm = /*#__PURE__*/ defineComponent({
  name: NAME_FORM,
  functional: true,
  props,
  render(_, { props, data, children }) {
    return h(
      'form',
      mergeProps(data, {
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
