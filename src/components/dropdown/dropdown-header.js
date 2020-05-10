import { CLASS_NAME_DROPDOWN_HEADER, CLASS_NAME_TEXT } from '../../constants/class-names'
import { NAME_DROPDOWN_HEADER } from '../../constants/components'
import { ROLE_HEADING, ROLE_PRESENTATION } from '../../constants/roles'
import Vue, { mergeData } from '../../utils/vue'
import { omit } from '../../utils/object'
import { suffixClass } from '../../utils/string'

// --- Props ---
export const props = {
  id: {
    type: String
    // default: null
  },
  tag: {
    type: String,
    default: 'header'
  },
  variant: {
    type: String
    // default: null
  }
}

// --- Main component ---
// @vue/component
export const BDropdownHeader = /*#__PURE__*/ Vue.extend({
  name: NAME_DROPDOWN_HEADER,
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h('li', mergeData(omit(data, ['attrs']), { attrs: { role: ROLE_PRESENTATION } }), [
      h(
        props.tag,
        {
          staticClass: CLASS_NAME_DROPDOWN_HEADER,
          class: { [suffixClass(CLASS_NAME_TEXT, props.variant)]: props.variant },
          attrs: {
            ...data.attrs,
            id: props.id || null,
            role: ROLE_HEADING
          },
          ref: 'header'
        },
        children
      )
    ])
  }
})
