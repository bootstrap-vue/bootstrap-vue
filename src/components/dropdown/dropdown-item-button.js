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
  inject: {
    dropdown: {
      from: 'dropdown',
      default: null
    }
  },
  props,
  render (h, { props, injections, data, parent, children }) {
    const dropdown = injections.dropdown
    console.log('Dropdown:', dropdown)
    return h(
      'button',
      mergeData(data, {
        props,
        staticClass: 'dropdown-item',
        class: { [props.activeClass]: props.active },
        attrs: { role: 'menuitem', type: 'button', disabled: props.disabled },
        on: {
          click: () => {
            console.log('Click Dropdown:', dropdown)
            dropdown && dropdown.hide(true)
          }
        }
      }),
      children
    )
  }
}
