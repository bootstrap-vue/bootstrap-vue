import { mergeData } from '../../utils'

export const props = {
  tag: {
    type: String,
    default: 'span'
  }
}

export default {
  functional: true,
  props,
  render (h, { props, data, children }) {
    return h(props.tag, mergeData(data, { staticClass: 'navbar-text' }), children)
  }
}
