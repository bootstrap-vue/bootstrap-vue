import { NAME_BUTTON, NAME_BUTTON_GROUP } from '../../constants/components'
import Vue, { mergeData } from '../../utils/vue'
import { getComponentConfig } from '../../utils/config'

export const props = {
  vertical: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: () => getComponentConfig(NAME_BUTTON, 'size')
  },
  tag: {
    type: String,
    default: 'div'
  },
  ariaRole: {
    type: String,
    default: 'group'
  }
}

// @vue/component
export const BButtonGroup = /*#__PURE__*/ Vue.extend({
  name: NAME_BUTTON_GROUP,
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      props.tag,
      mergeData(data, {
        class: {
          'btn-group': !props.vertical,
          'btn-group-vertical': props.vertical,
          [`btn-group-${props.size}`]: props.size
        },
        attrs: { role: props.ariaRole }
      }),
      children
    )
  }
})
