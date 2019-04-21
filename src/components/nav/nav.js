import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'

// -- Constants --

const DEPRECATED_MSG =
  'Setting prop "is-nav-bar" is deprecated. Use the <b-navbar-nav> component instead.'

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
  align: {
    type: String,
    default: null
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
  small: {
    type: Boolean,
    default: false
  },
  isNavBar: {
    type: Boolean,
    default: false,
    // `deprecated` -> Don't use this prop
    // `deprecation` -> Refers to a change in prop usage
    deprecated: DEPRECATED_MSG
  }
}

// -- Utils --

const computeJustifyContent = value => {
  // Normalize value
  value = value === 'left' ? 'start' : value === 'right' ? 'end' : value
  return `justify-content-${value}`
}

// @vue/component
export default Vue.extend({
  name: 'BNav',
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      props.tag,
      mergeData(data, {
        class: {
          nav: !props.isNavBar,
          'navbar-nav': props.isNavBar,
          'nav-tabs': props.tabs && !props.isNavBar,
          'nav-pills': props.pills && !props.isNavBar,
          'flex-column': props.vertical && !props.isNavBar,
          'nav-fill': !props.vertical && props.fill,
          'nav-justified': !props.vertical && props.justified,
          [computeJustifyContent(props.align)]: !props.vertical && props.align,
          small: props.small
        }
      }),
      children
    )
  }
})
