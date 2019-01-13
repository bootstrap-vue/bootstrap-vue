import { mergeData } from 'vue-functional-data-merge'

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

// @vue/component
export default {
  name: 'BDropdownHeader',
  functional: true,
  props,
  render(h, { props, data, children }) {
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
