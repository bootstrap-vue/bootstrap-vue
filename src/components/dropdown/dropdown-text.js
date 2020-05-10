import { CLASS_NAME_BV_DROPDOWN_TEXT, CLASS_NAME_TEXT } from '../../constants/class-names'
import { NAME_DROPDOWN_TEXT } from '../../constants/components'
import { ROLE_PRESENTATION } from '../../constants/roles'
import Vue, { mergeData } from '../../utils/vue'
import { omit } from '../../utils/object'
import { suffixClass } from '../../utils/string'

// @vue/component
export const BDropdownText = /*#__PURE__*/ Vue.extend({
  name: NAME_DROPDOWN_TEXT,
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'p'
    },
    variant: {
      type: String
      // default: null
    }
  },
  render(h, { props, data, children }) {
    return h('li', mergeData(omit(data, ['attrs']), { attrs: { role: ROLE_PRESENTATION } }), [
      h(
        props.tag,
        {
          staticClass: CLASS_NAME_BV_DROPDOWN_TEXT,
          class: { [suffixClass(CLASS_NAME_TEXT, props.variant)]: props.variant },
          props,
          attrs: data.attrs,
          ref: 'text'
        },
        children
      )
    ])
  }
})
