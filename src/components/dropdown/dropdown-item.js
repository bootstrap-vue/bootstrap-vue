import { mergeData } from '../../utils'
import Link, { propsFactory as linkPropsFactory } from '../link/link'

export const props = linkPropsFactory()

export default {
  functional: true,
  props,
  render (h, { props, data, children }) {
    return h(
      Link,
      mergeData(data, {
        props,
        staticClass: 'dropdown-item',
        attrs: { role: 'menuitem' }
      }),
      children
    )
  }
}
