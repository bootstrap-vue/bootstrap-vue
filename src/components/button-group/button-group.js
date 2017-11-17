import { mergeData } from '../../utils'
import { arrayIncludes } from '../../utils/array'

export const props = {
  vertical: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: null,
    validator: size => arrayIncludes(['sm', '', 'lg'], size)
  },
  tag: {
    type: String,
    default: 'div'
  },
  ariaRole: {
    type: String,
    default: 'group'
  }
}

export default {
  functional: true,
  props,
  render (h, { props, data, children }) {
    return h(
      props.tag,
      mergeData(data, {
        class: {
          'btn-group': !props.vertical,
          'btn-group-vertical': props.vertical,
          [`btn-group-${props.size}`]: Boolean(props.size)
        },
        attrs: { 'role': props.ariaRole }
      }),
      children
    )
  }
}
