import { mergeData } from '../../utils'

export const props = {
  tag: {
    type: String,
    default: 'div'
  }
}

export default {
  props,
  functional: true,
  render (h, { props, data }) {
    return h(props.tag, mergeData(data, { staticClass: 'input-group-text' }))
  }
}
