import { mergeData } from 'vue-functional-data-merge'
import BLink, { propsFactory as linkPropsFactory } from '../link/link'

export const props = linkPropsFactory()

// @vue/component
export default {
  name: 'BNavItem',
  functional: true,
  props: {
    ...props,
    linkRole: {
      type: String,
      default: null
    }
  },
  render(h, { props, data, children }) {
    return h(
      'li',
      mergeData(data, {
        staticClass: 'nav-item'
      }),
      [h(BLink, { staticClass: 'nav-link', props, attrs: { role: props.linkRole } }, children)]
    )
  }
}
