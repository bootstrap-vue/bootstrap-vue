import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_LIST_GROUP } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import { isString } from '../../utils/inspect'

// --- Props ---

export const props = makePropsConfigurable(
  {
    tag: {
      type: String,
      default: 'div'
    },
    flush: {
      type: Boolean,
      default: false
    },
    horizontal: {
      type: [Boolean, String],
      default: false
    }
  },
  NAME_LIST_GROUP
)

// --- Main component ---
// @vue/component
export const BListGroup = /*#__PURE__*/ defineComponent({
  name: NAME_LIST_GROUP,
  functional: true,
  props,
  render(_, { props, data, children }) {
    let horizontal = props.horizontal === '' ? true : props.horizontal
    horizontal = props.flush ? false : horizontal
    const componentData = {
      staticClass: 'list-group',
      class: {
        'list-group-flush': props.flush,
        'list-group-horizontal': horizontal === true,
        [`list-group-horizontal-${horizontal}`]: isString(horizontal)
      }
    }
    return h(props.tag, mergeProps(data, componentData), children)
  }
})
