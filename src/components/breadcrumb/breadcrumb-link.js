import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import pluckProps from '../../utils/pluck-props'
import { htmlOrText } from '../../utils/html'
import { BLink, propsFactory as linkPropsFactory } from '../link/link'

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
export const BBreadcrumbLink = /*#__PURE__*/ Vue.extend({
  name: 'BBreadcrumbLink',
  functional: true,
  props,
  render(h, { props: suppliedProps, data, children }) {
    const tag = suppliedProps.active ? 'span' : BLink

    const componentData = { props: pluckProps(props, suppliedProps) }
    if (suppliedProps.active) {
      componentData.attrs = { 'aria-current': suppliedProps.ariaCurrent }
    }

    if (!children) {
      componentData.domProps = htmlOrText(suppliedProps.html, suppliedProps.text)
    }

    return h(tag, mergeData(data, componentData), children)
  }
})
