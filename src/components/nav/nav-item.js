import { mergeData } from 'vue-functional-data-merge'
import BLink, { propsFactory as linkPropsFactory } from '../link/link'

export const props = linkPropsFactory()

// @vue/component
export default {
  name: 'BNavItem',
  functional: true,
  props,
  render(h, { props, data, listeners, children }) {
    // We transfer the listeners to the link
    delete data.on
    return h(
      'li',
      mergeData(data, {
        staticClass: 'nav-item'
      }),
      [
        h(
          BLink,
          {
            staticClass: 'nav-link',
            props,
            on: listeners
          },
          children
        )
      ]
    )
  }
}
