import { mergeData } from 'vue-functional-data-merge'
import InputGroupText from './input-group-text'

export const commonProps = {
  id: {
    type: String,
    default: null
  },
  tag: {
    type: String,
    default: 'div'
  },
  isText: {
    type: Boolean,
    default: false
  }
}

export default {
  functional: true,
  props: {
    ...commonProps,
    append: {
      type: Boolean,
      default: append
    }
  },
  render (h, { props, data, children }) {
    return h(
      props.tag,
      mergeData(data, {
        class: {
          'input-group-append': props.append,
          'input-group-prepend': !props.append
        },
        attrs: {
          id: props.id
        }
      }),
      props.isText ? [
        h(InputGroupText, children)
      ] : children
    )
  }
}
