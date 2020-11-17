import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_DROPDOWN_DIVIDER } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'

// --- Props ---

export const props = makePropsConfigurable(
  {
    tag: {
      type: String,
      default: 'hr'
    }
  },
  NAME_DROPDOWN_DIVIDER
)

// --- Main component ---

// @vue/component
export const BDropdownDivider = /*#__PURE__*/ defineComponent({
  name: NAME_DROPDOWN_DIVIDER,
  functional: true,
  props,
  render(_, { props, data }) {
    const $attrs = data.attrs || {}
    data.attrs = {}
    return h('li', mergeProps(data, { attrs: { role: 'presentation' } }), [
      h(props.tag, {
        staticClass: 'dropdown-divider',
        attrs: {
          ...$attrs,
          role: 'separator',
          'aria-orientation': 'horizontal'
        },
        ref: 'divider'
      })
    ])
  }
})
