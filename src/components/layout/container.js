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
          container: !props.fluid,
          'container-fluid': props.fluid
        }
      }),
      children
    )
  }
})

export default BContainer
