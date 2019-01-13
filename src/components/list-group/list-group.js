import { mergeData } from 'vue-functional-data-merge'

export const props = {
  tag: {
    type: String,
    default: 'div'
  },
  flush: {
    type: Boolean,
    default: false
  },
  striped: {
    type: Boolean,
    default: false
  }
}

// @vue/component
export default {
  name: 'BListGroup',
  functional: true,
  props,
  render(h, { props, data, children }) {
    const componentData = {
      staticClass: 'list-group',
      class: {
        'list-group-flush': props.flush,
        'list-group-striped': props.striped
      }
    }
    return h(props.tag, mergeData(data, componentData), children)
  }
}
