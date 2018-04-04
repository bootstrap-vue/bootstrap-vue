import { mergeData } from 'vue-functional-data-merge'

export const props = {
  tag: {
    type: String,
    default: 'div'
  },
  deck: {
    type: Boolean,
    default: false
  },
  columns: {
    type: Boolean,
    default: false
  }
}

export default {
  functional: true,
  props,
  render (h, { props, data, children }) {
    let staticClass = 'card-group'
    if (props.columns) {
      staticClass = 'card-columns'
    }
    if (props.deck) {
      staticClass = 'card-deck'
    }

    return h(props.tag, mergeData(data, { staticClass }), children)
  }
}
