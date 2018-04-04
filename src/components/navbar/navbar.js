import { mergeData } from 'vue-functional-data-merge'

export const props = {
  tag: {
    type: String,
    default: 'nav'
  },
  type: {
    type: String,
    default: 'light'
  },
  variant: {
    type: String
  },
  toggleable: {
    type: [Boolean, String],
    default: false
  },
  toggleBreakpoint: {
    // Deprecated.  Set toggleable to a string breakpoint
    type: String,
    default: null
  },
  fixed: {
    type: String
  },
  sticky: {
    type: Boolean,
    default: false
  }
}

export default {
  functional: true,
  props,
  render (h, { props, data, children }) {
    let breakpoint = props.toggleBreakpoint || (props.toggleable === true ? 'sm' : props.toggleable) || 'sm'
    return h(
      props.tag,
      mergeData(data, {
        staticClass: 'navbar',
        class: {
          [`navbar-${props.type}`]: Boolean(props.type),
          [`bg-${props.variant}`]: Boolean(props.variant),
          [`fixed-${props.fixed}`]: Boolean(props.fixed),
          'sticky-top': props.sticky,
          [`navbar-expand-${breakpoint}`]: props.toggleable !== false
        }
      }),
      children
    )
  }
}
