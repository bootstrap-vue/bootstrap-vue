import { mergeData } from 'vue-functional-data-merge'

export const props = {
  disabled: {
    type: Boolean,
    default: false
  }
}

export default {
  functional: true,
  props,
  render (h, { props, data, parent, children }) {
    return h(
      'button',
      mergeData(data, {
        props,
        staticClass: 'dropdown-item',
        attrs: { role: 'menuitem', type: 'button', disabled: props.disabled },
        on: {
          click (e) {
            parent.$root.$emit('clicked::link', e)
          }
        }
      }),
      children
    )
  }
}
