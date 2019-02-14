import { mergeData } from 'vue-functional-data-merge'
import pluckProps from '../../utils/pluck-props'
import { assign } from '../../utils/object'
import BLink, { propsFactory as linkPropsFactory } from '../link/link'
import { htmlOrText } from '../../utils/html'

export const props = assign(linkPropsFactory(), {
  text: {
    type: String,
    default: null
  },
  html: {
    type: String,
    default: null
  },
  active: {
    type: Boolean,
    default: false
  },
  href: {
    type: String,
    default: '#'
  },
  ariaCurrent: {
    type: String,
    default: 'location'
  }
})

// @vue/component
export default {
  name: 'BBreadcrumbLink',
  functional: true,
  props,
  render(h, { props: suppliedProps, data, children }) {
    const tag = suppliedProps.active ? 'span' : BLink

    let componentData = { props: pluckProps(props, suppliedProps) }
    if (suppliedProps.active) {
      componentData.attrs = { 'aria-current': suppliedProps.ariaCurrent }
    } else {
      componentData.attrs = { href: suppliedProps.href }
    }

    if (!children) {
      componentData.domProps = htmlOrText(suppliedProps.html, suppliedProps.text)
    }

    return h(tag, mergeData(data, componentData), children)
  }
}
