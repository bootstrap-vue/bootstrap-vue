import Vue from '../../utils/vue'
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
    return h('li', [
      h(
        props.tag,
        mergeData(data, {
          staticClass: 'b-dropdown-text',
          props,
          ref: 'text'
        }),
        children
      )
    ])
  }
})
