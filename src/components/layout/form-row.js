import Vue, { mergeData } from '../../utils/vue'

export const props = {
  tag: {
    type: String,
    default: 'div'
  }
}

// @vue/component
export const BFormRow = /*#__PURE__*/ Vue.extend({
  name: 'BFormRow',
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      props.tag,
      mergeData(data, {
        staticClass: 'form-row'
      }),
      children
    )
  }
})
