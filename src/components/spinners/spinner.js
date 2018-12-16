import { mergeData } from 'vue-functional-data-merge'

const props = {
  type: {
    type: String,
    default: 'border' // SCSS currently supports 'border' or 'grow'
  },
  label: {
    type: String,
    default: 'Loading...'
  },
  variant: {
    type: String,
    default: null
  },
  small: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    default: 'status'
  },
  tag: {
    type: String,
    default: 'div'
  }
}

// @vue/component
export default {
  name: 'BSpinner',
  functional: true,
  props,
  render (h, { props, data, slots }) {
    return h(
      props.tag,
      mergeData (
        data,
        {
          attrs: { role: props.role },
          class: {
            [`spinner-${props.type}`]: Boolean(props.type),
            [`spinner-${props.type}-sm`]: props.small,
            [`text-${props.variant}`]: Boolean(props.variant)
          }
        },
        [h('span', { staticClass: 'sr-only' }, slots().label || props.label)]
      )
    )
  }
}
