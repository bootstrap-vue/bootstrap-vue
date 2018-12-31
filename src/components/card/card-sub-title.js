import { mergeData } from 'vue-functional-data-merge'
import stripScripts from '../../utils/strip-scripts'

export const props = {
  subTitle: {
    type: String,
    default: null
  },
  subTitleTag: {
    type: String,
    default: 'h6'
  },
  subTitleTextVariant: {
    type: String,
    default: 'muted'
  }
}

// @vue/component
export default {
  name: 'BCardSubTitle',
  functional: true,
  props,
  render (h, { props, data, children }) {
    const domProps = children ? {} : { innerHTML: stripScripts(props.subTitle) }
    return h(
      props.subTitleTag,
      mergeData(data, {
        staticClass: 'card-subtitle',
        class: [
          props.subTitleTextVariant ? `text-${props.subTitleTextVariant}` : null
        ],
        domProps
      }),
      children
    )
  }
}
