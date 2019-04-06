import Vue from 'vue'
import { mergeData } from 'vue-functional-data-merge'

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
export default Vue.extend({
  name: 'BListGroup',
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
        [`list-group-horizontal-${horizontal}`]: typeof horizontal === 'string'
      }
    }
    return h(props.tag, mergeData(data, componentData), children)
  }
})
