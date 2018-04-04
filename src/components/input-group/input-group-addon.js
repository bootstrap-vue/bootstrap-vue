import { mergeData } from 'vue-functional-data-merge'
import InputGroupText from './input-group-text'

export const propsFactory = append => ({
  id: {
    type: String,
    default: null
  },
  tag: {
    type: String,
    default: 'div'
  },
  append: {
    type: Boolean,
    default: append
  },
  isText: {
    type: Boolean,
    default: false
  }
})

export default {
  functional: true,
  props: propsFactory(false),
  render (h, { props, data, children }) {
    return h(
      props.tag,
      mergeData(data, {
        staticClass: `input-group-${props.append ? 'append' : 'prepend'}`,
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
