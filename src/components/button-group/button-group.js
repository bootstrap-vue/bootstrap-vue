import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import { getComponentConfig } from '../../utils/config'

const NAME = 'BButtonGroup'

export const props = {
  vertical: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: () => getComponentConfig('BButton', 'size')
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
  name: NAME,
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
