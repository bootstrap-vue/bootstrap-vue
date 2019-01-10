import { mergeData } from 'vue-functional-data-merge'
import BLink, { propsFactory as linkPropsFactory } from '../link/link'

export const props = linkPropsFactory()

// @vue/component
export default {
  name: 'BDropdownItem',
  functional: true,
  inject: {
    dropdown: {
      from: 'dropdown',
      default: null
    }
  },
  props,
  render (h, { props, injections, data, children }) {
    const dropdown = injections.dropdown
    return h(
      BLink,
      mergeData(data, {
        props,
        staticClass: 'dropdown-item',
        attrs: { role: 'menuitem' },
        on: {
          click: () => { dropdown && dropdown.hide(true) }
        }
      }),
      children
    )
  }
}
