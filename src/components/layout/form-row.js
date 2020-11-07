import Vue, { mergeData } from '../../vue'
import { NAME_FORM_ROW } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'

export const props = makePropsConfigurable(
  {
    tag: {
      type: String,
      default: 'div'
    }
  },
  NAME_FORM_ROW
)

// @vue/component
export const BFormRow = /*#__PURE__*/ Vue.extend({
  name: NAME_FORM_ROW,
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      props.tag,
      mergeData(data, {
        staticClass: 'form-row'
      }),
      children
    )
  }
})
