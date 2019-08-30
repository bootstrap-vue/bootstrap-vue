import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'

export const props = {
  tag: {
    type: String,
    default: 'div'
  },
  fluid: {
    // String breakpoint name new in Bootstrap v4.4.x
    type: [Boolean, String],
    default: false
  }
}

// @vue/component
export const BContainer = /*#__PURE__*/ Vue.extend({
  name: 'BContainer',
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      props.tag,
      mergeData(data, {
        class: {
          container: !(props.fluid || props.fluid === ''),
          'container-fluid': props.fluid === true || props.fluid === '',
          // Bootstrap v4.4+ responsive containers
          [`container-${props.fluid}`]: props.fluid && props.fluid !== true
        }
      }),
      children
    )
  }
})
