import { mergeData } from '../../utils'

export const props = {
  id: {
    type: String,
    default: null
  },
  tag: {
    type: String,
    default: 'h6'
  }
}

export default {
  functional: true,
  props,
  render (h, { props, data, children }) {
    return h(
      props.tag,
      mergeData(data, {
        staticClass: 'dropdown-header',
        attrs: { id: props.id || null }
      }),
      children
    )
  }
}
