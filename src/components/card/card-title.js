import { mergeData } from 'vue-functional-data-merge'
import stripScripts from '../../utils/strip-scripts'

export const props = {
  title: {
    type: String,
    default: null
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
  render (h, { props, data, children }) {
    const domProps = children ? {} : { innerHTML: stripScripts(props.title) }
    return h(
      props.titleTag,
      mergeData(data, {
        staticClass: 'card-title',
        domProps
      }),
      children
    )
  }
}
