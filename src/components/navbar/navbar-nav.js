import Vue from 'vue'
import { mergeData } from 'vue-functional-data-merge'
import { props as BNavProps } from '../nav/nav'
import { pick } from '../../utils/object'

// -- Constants --

export const props = pick(BNavProps, ['tag', 'fill', 'justified', 'align', 'small'])

// -- Utils --

const computeJustifyContent = value => {
  if (value === 'left') {
    value = 'start'
  } else if (value === 'right') {
    value = 'end'
  }
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
