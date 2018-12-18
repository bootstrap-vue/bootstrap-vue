import { mergeData } from 'vue-functional-data-merge'
import BLink, { propsFactory as linkPropsFactory } from '../link/link'

export const props = linkPropsFactory()

// @vue/component
export default {
  name: 'BDropdownItem',
  functional: true,
  props,
  render (h, { props, data, children }) {
    return h(
      BLink,
      mergeData(data, {
        props,
        staticClass: 'dropdown-item',
        attrs: { role: 'menuitem' }
      }),
      children
    )
  }
}
