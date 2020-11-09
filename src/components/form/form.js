import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_FORM } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'

// --- Props ---

export const props = makePropsConfigurable(
  {
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
  },
  NAME_FORM
)

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
