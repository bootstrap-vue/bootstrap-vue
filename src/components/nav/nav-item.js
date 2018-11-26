import { mergeData } from 'vue-functional-data-merge'
import Link, { propsFactory as linkPropsFactory } from '../link/link'

export const props = linkPropsFactory()

export default {
  functional: true,
  props,
  render (h, { props, data, children }) {
    const listeners = data.on
    return h(
      'li',
      mergeData(data, {
        staticClass: 'nav-item',
        on: {}
      }),
      [h(Link, { staticClass: 'nav-link', props, on: listeners }, children)]
    )
  }
}
