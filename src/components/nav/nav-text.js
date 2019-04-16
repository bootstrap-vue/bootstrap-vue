import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'

export const props = {
  tag: {
    type: String,
    default: 'span'
  }
}

// @vue/component
export default Vue.extend({
  name: 'BNavText',
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(props.tag, mergeData(data, { staticClass: 'navbar-text' }), children)
  }
})
