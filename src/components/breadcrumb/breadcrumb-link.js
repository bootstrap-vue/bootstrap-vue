import Vue, { mergeData } from '../../vue'
import { NAME_BREADCRUMB_LINK } from '../../constants/components'
import { htmlOrText } from '../../utils/html'
import { omit } from '../../utils/object'
import { pluckProps } from '../../utils/props'
import { BLink, props as BLinkProps } from '../link/link'

// --- Props ---

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

// --- Main component ---
// @vue/component
export const BBreadcrumbLink = /*#__PURE__*/ Vue.extend({
  name: NAME_BREADCRUMB_LINK,
  functional: true,
  props,
  render(h, { props: suppliedProps, data, children }) {
    const { active } = suppliedProps
    const tag = active ? 'span' : BLink

    const componentData = {
      attrs: { 'aria-current': active ? suppliedProps.ariaCurrent : null },
      props: pluckProps(props, suppliedProps)
    }

    if (!children) {
      componentData.domProps = htmlOrText(suppliedProps.html, suppliedProps.text)
    }

    return h(tag, mergeData(data, componentData), children)
  }
})
