import { mergeData, warn } from '../../utils'

export const props = {
  tag: {
    type: String,
    default: 'ul'
  },
  fill: {
    type: Boolean,
    default: false
  },
  justified: {
    type: Boolean,
    default: false
  },
  tabs: {
    type: Boolean,
    default: false
  },
  pills: {
    type: Boolean,
    default: false
  },
  vertical: {
    type: Boolean,
    default: false
  },
  isNavBar: {
    type: Boolean,
    default: false
  }
}

export default {
  functional: true,
  props,
  render (h, { props, data, children }) {
    if (props.isNavBar) {
      warn("b-nav: Prop 'is-nav-bar' is deprecated. Please use component '<b-navbar-nav>' instead.")
    }
    return h(
      props.tag,
      mergeData(data, {
        class: {
          'nav': !props.isNavBar,
          'navbar-nav': props.isNavBar,
          'nav-tabs': props.tabs && !props.isNavBar,
          'nav-pills': props.pills && !props.isNavBar,
          'flex-column': props.vertical && !props.isNavBar,
          'nav-fill': props.fill,
          'nav-justified': props.justified
        }
      }),
      children
    )
  }
}
