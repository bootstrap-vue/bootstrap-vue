import { NAME_LIST_GROUP } from '../../constants/components'
import Vue, { mergeData } from '../../utils/vue'
import { isString } from '../../utils/inspect'

export const props = {
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
}

// @vue/component
export const BListGroup = /*#__PURE__*/ Vue.extend({
  name: NAME_LIST_GROUP,
  functional: true,
  props,
  render(h, { props, data, children }) {
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
    return h(props.tag, mergeData(data, componentData), children)
  }
})
