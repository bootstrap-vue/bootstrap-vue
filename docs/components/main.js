import { mergeData } from 'vue-functional-data-merge'

// @vue/component
export default {
  name: 'BVMain',
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
