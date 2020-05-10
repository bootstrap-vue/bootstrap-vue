import { NAME_BREADCRUMB_LINK } from '../../constants/components'
import Vue, { mergeData } from '../../utils/vue'
import pluckProps from '../../utils/pluck-props'
import { hasChildren } from '../../utils/dom'
import { htmlOrText } from '../../utils/html'
import { BLink, propsFactory as linkPropsFactory } from '../link/link'

// --- Props ---
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

// --- Main component ---
// @vue/component
export const BBreadcrumbLink = /*#__PURE__*/ Vue.extend({
  name: NAME_BREADCRUMB_LINK,
  functional: true,
  props,
  render(h, { props: suppliedProps, data, children }) {
    const tag = suppliedProps.active ? 'span' : BLink

    const componentData = { props: pluckProps(props, suppliedProps) }
    if (suppliedProps.active) {
      componentData.attrs = { 'aria-current': suppliedProps.ariaCurrent }
    }

    if (!hasChildren(children)) {
      componentData.domProps = htmlOrText(suppliedProps.html, suppliedProps.text)
    }

    return h(tag, mergeData(data, componentData), children)
  }
})
