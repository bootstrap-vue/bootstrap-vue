import { mergeData } from '../../utils'

export const props = {
  tag: {
    type: String,
    default: 'div'
  },
  flush: {
    type: Boolean,
    default: false
  }
}

export default {
  functional: true,
  props,
  render (h, { props, data, children }) {
    const componentData = {
      staticClass: 'list-group',
      class: { 'list-group-flush': props.flush }
    }

    return h(props.tag, mergeData(data, componentData), children)
  }
}
