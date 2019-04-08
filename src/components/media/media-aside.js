import Vue from 'vue'
import { mergeData } from 'vue-functional-data-merge'

export const props = {
  tag: {
    type: String,
    default: 'div'
  },
  verticalAlign: {
    type: String,
    default: 'top'
  }
}

// @vue/component
export default Vue.extend({
  name: 'BMediaAside',
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      props.tag,
      mergeData(data, {
        staticClass: 'd-flex',
        class: {
          [`align-self-${props.verticalAlign}`]: props.verticalAlign
        }
      }),
      children
    )
  }
})
