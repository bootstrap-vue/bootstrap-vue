import Vue, { mergeData } from '../../vue'
import { NAME_INPUT_GROUP_TEXT } from '../../constants/components'

export const props = {
  tag: {
    type: String,
    default: 'div'
  }
}

// @vue/component
export const BInputGroupText = /*#__PURE__*/ Vue.extend({
  name: NAME_INPUT_GROUP_TEXT,
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      props.tag,
      mergeData(data, {
        staticClass: 'input-group-text'
      }),
      children
    )
  }
})
