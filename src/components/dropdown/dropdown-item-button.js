import { mergeData } from 'vue-functional-data-merge'

export const props = {
  active: {
    type: Boolean,
    default: false
  },
  activeClass: {
    type: String,
    default: 'active'
  },
  disabled: {
    type: Boolean,
    default: false
  }
}

// @vue/component
export default {
  name: 'BDropdownItemButton',
  functional: true,
  props,
  render (h, { props, data, parent, children }) {
    return h(
      'button',
      mergeData(data, {
        props,
        staticClass: 'dropdown-item',
        class: { [props.activeClass]: props.active },
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
