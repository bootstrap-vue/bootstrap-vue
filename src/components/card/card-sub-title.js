import { mergeData } from 'vue-functional-data-merge'
import { getComponentConfig } from '../../utils/config'

const NAME = 'BCardSubTitle'

export const props = {
  subTitle: {
    type: String,
    default: ''
  },
  subTitleTag: {
    type: String,
    default: 'h6'
  },
  subTitleTextVariant: {
    type: String,
    default: () => getComponentConfig(NAME, 'subTitleTextVariant')
  }
}

// @vue/component
export default {
  name: NAME,
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      props.subTitleTag,
      mergeData(data, {
        staticClass: 'card-subtitle',
        class: [props.subTitleTextVariant ? `text-${props.subTitleTextVariant}` : null]
      }),
      children || props.subTitle
    )
  }
}
