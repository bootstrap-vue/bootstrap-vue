import { mergeData } from 'vue-functional-data-merge'
import Vue from '../../utils/vue'
import pluckProps from '../../utils/pluck-props'
import { htmlOrText } from '../../utils/html'
import { omit } from '../../utils/object'
import { BLink, props as BLinkProps } from '../link/link'

export const props = {
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
  },
  ...omit(BLinkProps, ['event', 'routerTag'])
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
