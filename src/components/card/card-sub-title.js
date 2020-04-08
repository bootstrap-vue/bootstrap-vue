import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import { getComponentConfig } from '../../utils/config'
import { toString } from '../../utils/string'

const NAME = 'BCardSubTitle'

export const props = {
  subTitle: {
    type: String
    // default: null
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
export const BCardSubTitle = /*#__PURE__*/ Vue.extend({
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
      children || toString(props.subTitle)
    )
  }
})
