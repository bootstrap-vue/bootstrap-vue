import Vue from 'vue'
import { mergeData } from 'vue-functional-data-merge'
import { getBreakpoints } from '../../utils/config'

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
  fixed: {
    type: String
  },
  sticky: {
    type: Boolean,
    default: false
  },
  print: {
    type: Boolean,
    default: false
  }
}

// @vue/component
export default Vue.extend({
  name: 'BNavbar',
  functional: true,
  props,
  render(h, { props, data, children }) {
    let breakpoint = ''
    let xs = getBreakpoints()[0]
    if (props.toggleable && typeof props.toggleable === 'string' && props.toggleable !== xs) {
      breakpoint = `navbar-expand-${props.toggleable}`
    } else if (props.toggleable === false) {
      breakpoint = 'navbar-expand'
    }
    return h(
      props.tag,
      mergeData(data, {
        staticClass: 'navbar',
        class: {
          'd-print': props.print,
          'sticky-top': props.sticky,
          [`navbar-${props.type}`]: Boolean(props.type),
          [`bg-${props.variant}`]: Boolean(props.variant),
          [`fixed-${props.fixed}`]: Boolean(props.fixed),
          [`${breakpoint}`]: Boolean(breakpoint)
        },
        attrs: {
          role: props.tag === 'nav' ? null : 'navigation'
        }
      }),
      children
    )
  }
})
