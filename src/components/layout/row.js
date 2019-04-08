import Vue from 'vue'
import { mergeData } from 'vue-functional-data-merge'
import { arrayIncludes } from '../../utils/array'

const COMMON_ALIGNMENT = ['start', 'end', 'center']

export const props = {
  tag: {
    type: String,
    default: 'div'
  },
  noGutters: {
    type: Boolean,
    default: false
  },
  alignV: {
    type: String,
    default: null,
    validator: str => arrayIncludes(COMMON_ALIGNMENT.concat(['baseline', 'stretch']), str)
  },
  alignH: {
    type: String,
    default: null,
    validator: str => arrayIncludes(COMMON_ALIGNMENT.concat(['between', 'around']), str)
  },
  alignContent: {
    type: String,
    default: null,
    validator: str => arrayIncludes(COMMON_ALIGNMENT.concat(['between', 'around', 'stretch']), str)
  }
}

// @vue/component
export default Vue.extend({
  name: 'BRow',
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      props.tag,
      mergeData(data, {
        staticClass: 'row',
        class: {
          'no-gutters': props.noGutters,
          [`align-items-${props.alignV}`]: props.alignV,
          [`justify-content-${props.alignH}`]: props.alignH,
          [`align-content-${props.alignContent}`]: props.alignContent
        }
      }),
      children
    )
  }
})
