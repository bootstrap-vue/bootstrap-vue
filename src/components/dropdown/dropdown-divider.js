import { extend, mergeData } from '../../vue'
import { NAME_DROPDOWN_DIVIDER } from '../../constants/components'
import { PROP_TYPE_STRING } from '../../constants/props'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { omit } from '../../utils/object'

// --- Props ---

export const props = makePropsConfigurable(
  {
    tag: makeProp(PROP_TYPE_STRING, 'hr')
  },
  NAME_DROPDOWN_DIVIDER
)

// --- Main component ---

// @vue/component
export const BDropdownDivider = /*#__PURE__*/ extend({
  name: NAME_DROPDOWN_DIVIDER,
  functional: true,
  props,
  render(h, { props, data }) {
    return h('li', mergeData(omit(data, ['attrs']), { attrs: { role: 'presentation' } }), [
      h(props.tag, {
        staticClass: 'dropdown-divider',
        attrs: {
          ...(data.attrs || {}),
          role: 'separator',
          'aria-orientation': 'horizontal'
        },
        ref: 'divider'
      })
    ])
  }
})
