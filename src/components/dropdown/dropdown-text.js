import Vue from 'vue'
import { mergeData } from 'vue-functional-data-merge'

export default Vue.extend({
  name: 'BDropdownText',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'p'
    }
  },
  render(h, { props, data, children }) {
    return h(props.tag, mergeData(data, { props, staticClass: 'b-dropdown-text' }), children)
  }
})
