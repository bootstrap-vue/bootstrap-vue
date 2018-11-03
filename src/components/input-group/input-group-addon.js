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

export const propsFactory = append => ({
  ...commonProps,
  append: {
  }
})

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
        class: [
          `input-group-${props.append ? 'append' : 'prepend'}`
        ],
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
