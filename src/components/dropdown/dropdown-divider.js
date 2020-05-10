import { ARIA_ORIENTATION_HORIZONTAL } from '../../constants/aria'
import { CLASS_NAME_DROPDOWN_DIVIDER } from '../../constants/class-names'
import { NAME_DROPDOWN_DIVIDER } from '../../constants/components'
import { ROLE_PRESENTATION, ROLE_SEPARATOR } from '../../constants/roles'
import Vue, { mergeData } from '../../utils/vue'

export const props = {
  tag: {
    type: String,
    default: 'hr'
  }
}

// @vue/component
export const BDropdownDivider = /*#__PURE__*/ Vue.extend({
  name: NAME_DROPDOWN_DIVIDER,
  functional: true,
  props,
  render(h, { props, data }) {
    const $attrs = data.attrs || {}
    data.attrs = {}
    return h('li', mergeData(data, { attrs: { role: ROLE_PRESENTATION } }), [
      h(props.tag, {
        staticClass: CLASS_NAME_DROPDOWN_DIVIDER,
        attrs: {
          ...$attrs,
          role: ROLE_SEPARATOR,
          'aria-orientation': ARIA_ORIENTATION_HORIZONTAL
        },
        ref: 'divider'
      })
    ])
  }
})
