import { Vue, mergeData } from '../../vue'
import { NAME_DROPDOWN_TEXT } from '../../constants/components'
import { PROP_TYPE_ARRAY_OBJECT_STRING, PROP_TYPE_STRING } from '../../constants/props'
import { omit } from '../../utils/object'
import { makeProp, makePropsConfigurable } from '../../utils/props'

// --- Props ---

export const props = makePropsConfigurable(
  {
    tag: makeProp(PROP_TYPE_STRING, 'p'),
    textClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    variant: makeProp(PROP_TYPE_STRING)
  },
  NAME_DROPDOWN_TEXT
)

// --- Main component ---

// @vue/component
export const BDropdownText = /*#__PURE__*/ Vue.extend({
  name: NAME_DROPDOWN_TEXT,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const { tag, textClass, variant } = props

    return h('li', mergeData(omit(data, ['attrs']), { attrs: { role: 'presentation' } }), [
      h(
        tag,
        {
          staticClass: 'b-dropdown-text',
          class: [textClass, { [`text-${variant}`]: variant }],
          props,
          attrs: data.attrs || {},
          ref: 'text'
        },
        children
      )
    ])
  }
})
