import Vue from 'vue'
import { mergeData } from 'vue-functional-data-merge'
import pluckProps from '../../utils/pluck-props'
import BLink, { propsFactory as linkPropsFactory } from '../link/link'
import { htmlOrText } from '../../utils/html'

export const props = {
  ...linkPropsFactory(),
  text: {
    type: String,
    default: null
  },
  html: {
    type: String,
    default: null
  },
  ariaCurrent: {
    type: String,
    default: 'location'
  }
}

// @vue/component
export default Vue.extend({
  name: 'BBreadcrumbLink',
  functional: true,
  props,
  render(h, { props: suppliedProps, data, children }) {
    const tag = suppliedProps.active ? 'span' : BLink

    let componentData = { props: pluckProps(props, suppliedProps) }
    if (suppliedProps.active) {
      componentData.attrs = { 'aria-current': suppliedProps.ariaCurrent }
    }

    if (!children) {
      componentData.domProps = htmlOrText(suppliedProps.html, suppliedProps.text)
    }

    return h(tag, mergeData(data, componentData), children)
  }
})
