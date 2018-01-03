/**
* This is deprecated as of Bootstrap 4 beta 3
* Previously class was input-group-btn but is now dropped for append/prepend
* depending on slot='left' or slot='right' property.
* See https://github.com/twbs/bootstrap/pull/25020
 */
import { mergeData } from '../../utils'

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
  functional: true,
  props,
  render (h, { props, data, children }) {
    return h(
      props.tag,
      mergeData(data, {
        staticClass: `input-group-${data.slot === 'left' ? 'prepend' : 'append'}`,
        attrs: {
          id: props.id
        }
      }),
      children
    )
  }
}
