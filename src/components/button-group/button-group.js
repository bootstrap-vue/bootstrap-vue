import { mergeData } from 'vue-functional-data-merge'
import { CLASS_NAME_BUTTON_GROUP } from '../../constants/class-names'
import { NAME_BUTTON, NAME_BUTTON_GROUP } from '../../constants/components'
import Vue from '../../utils/vue'
import { getComponentConfig } from '../../utils/config'
import { suffixClass } from '../../utils/string'

// --- Props ---
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

// --- Main component ---
// @vue/component
export const BButtonGroup = /*#__PURE__*/ Vue.extend({
  name: NAME_BUTTON_GROUP,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const { vertical, size } = props
    return h(
      props.tag,
      mergeData(data, {
        class: {
          [CLASS_NAME_BUTTON_GROUP]: !vertical,
          [suffixClass(CLASS_NAME_BUTTON_GROUP, 'vertical')]: vertical,
          [suffixClass(CLASS_NAME_BUTTON_GROUP, size)]: size
        },
        attrs: { role: props.ariaRole }
      }),
      children
    )
  }
})
