import { mergeData } from 'vue-functional-data-merge'

const props = {
  type: {
    type: String,
    default: 'border' // SCSS currently supports 'border' or 'grow'
  },
  label: {
    type: String,
    default: null
  },
  variant: {
    type: String,
    default: null
  },
  small: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: 'status'
  },
  tag: {
    type: String,
    default: 'span'
  }
}

// @vue/component
export default {
  name: 'BSpinner',
  functional: true,
  props,
  render (h, { props, data, slots }) {
    let label = h(false)
    const hasLabel = slots().label || props.label
    if (hasLabel) {
      label = h('span', { staticClass: 'sr-only' }, hasLabel)
    }
    return h(
      props.tag,
      mergeData(data, {
        attrs: {
          role: hasLabel ? (props.role || 'status') : null,
          'aria-hiddden': hasLabel ? null : 'true'
        },
        class: {
          [`spinner-${props.type}`]: Boolean(props.type),
          [`spinner-${props.type}-sm`]: props.small,
          [`text-${props.variant}`]: Boolean(props.variant)
        }
      }),
      [label]
    )
  }
}
