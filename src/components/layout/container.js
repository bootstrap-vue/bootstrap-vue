import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'

export const props = {
  tag: {
    type: String,
    default: 'div'
  },
  fluid: {
    type: Boolean,
    default: false
  },
  breakpoint: {
    // New in Bootstrap v4.4.x
    type: String,
    default: null
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
          container: !props.fluid && !props.breakpoint,
          'container-fluid': props.fluid && !props.breakpoint,
          [`container-${props.breakpoint}`]: !!props.breakpoint
        }
      }),
      children
    )
  }
})

export default BContainer
