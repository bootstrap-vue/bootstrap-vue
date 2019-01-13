import { mergeData } from 'vue-functional-data-merge'

export const props = {
  title: {
    type: String,
    default: ''
  },
  titleTag: {
    type: String,
    default: 'h4'
  }
}

// @vue/component
export default {
  name: 'BCardTitle',
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      props.titleTag,
      mergeData(data, {
        staticClass: 'card-title'
      }),
      children || props.title
    )
  }
}
