import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import BLink, { propsFactory as linkPropsFactory } from '../link/link'

export const props = linkPropsFactory()

// @vue/component
export default Vue.extend({
  name: 'BNavItem',
  functional: true,
  props: {
    ...props,
    linkAttrs: {
      type: Object,
      default() {
        return {}
      }
    },
    linkClasses: {
      type: [String, Object, Array],
      default: null
    }
  },
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
            class: props.linkClasses,
            attrs: props.linkAttrs,
            props,
            on: listeners
          },
          children
        )
      ]
    )
  }
})
