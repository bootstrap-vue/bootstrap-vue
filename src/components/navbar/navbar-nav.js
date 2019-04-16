import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import pluckProps from '../../utils/pluck-props'
import { props as BNavProps } from '../nav/nav'

// -- Constants --

export const props = pluckProps(['tag', 'fill', 'justified', 'align', 'small'], BNavProps)

// -- Utils --

const computeJustifyContent = value => {
  // Normalize value
  value = value === 'left' ? 'start' : value === 'right' ? 'end' : value
  return `justify-content-${value}`
}

// @vue/component
export default Vue.extend({
  name: 'BNavbarNav',
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      props.tag,
      mergeData(data, {
        staticClass: 'navbar-nav',
        class: {
          'nav-fill': props.fill,
          'nav-justified': props.justified,
          [computeJustifyContent(props.align)]: props.align,
          small: props.small
        }
      }),
      children
    )
  }
})
