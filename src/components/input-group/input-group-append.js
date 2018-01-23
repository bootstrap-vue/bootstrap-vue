import { mergeData } from '../../utils'
import InputGroupText from './input-group-text'

export const props = {
  id: {
    type: String,
    default: null
  },
  tag: {
    type: String,
    default: 'div'
  }
}

export default {
  props,
  functional: true,
  render (h, {props, data, children}) {
    return h(
      props.tag,
      mergeData(data, {
        staticClass: 'input-group-append',
        attrs: {
          id: props.id
        }
      }),
      [h(InputGroupText, { }, children)]
    )
  }
}
