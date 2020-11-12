import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_FORM_ROW } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'

// --- Props ---

export const props = makePropsConfigurable(
  {
    tag: {
      type: String,
      default: 'div'
    }
  },
  NAME_FORM_ROW
)

// --- Main component ---
// @vue/component
export const BFormRow = /*#__PURE__*/ defineComponent({
  name: NAME_FORM_ROW,
  functional: true,
  props,
  render(_, { props, data, children }) {
    return h(props.tag, mergeProps(data, { staticClass: 'form-row' }), children)
  }
})
