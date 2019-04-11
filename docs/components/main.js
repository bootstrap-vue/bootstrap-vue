import { mergeData } from 'vue-functional-data-merge'

export default {
  name: 'BDMain',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'main'
    }
  },
  render(h, { props, data, children }) {
    return h(props.tag, mergeData(data, { staticClass: 'bd-main' }), [children])
  }
}
