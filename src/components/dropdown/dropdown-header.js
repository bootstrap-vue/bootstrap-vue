import { Vue, mergeData } from '../../vue'
import { NAME_DROPDOWN_HEADER } from '../../constants/components'
import { PROP_TYPE_STRING } from '../../constants/props'
import { omit } from '../../utils/object'
import { makeProp, makePropsConfigurable } from '../../utils/props'

// --- Props ---

export const props = makePropsConfigurable(
  {
    id: makeProp(PROP_TYPE_STRING),
    tag: makeProp(PROP_TYPE_STRING, 'header'),
    variant: makeProp(PROP_TYPE_STRING)
  },
  NAME_DROPDOWN_HEADER
)

// --- Main component ---

// @vue/component
export const BDropdownHeader = /*#__PURE__*/ Vue.extend({
  name: NAME_DROPDOWN_HEADER,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const { variant } = props

    return h('li', mergeData(omit(data, ['attrs']), { attrs: { role: 'presentation' } }), [
      h(
        props.tag,
        {
          staticClass: 'dropdown-header',
          class: { [`text-${variant}`]: variant },
          attrs: {
            ...(data.attrs || {}),
            id: props.id || null,
            role: 'heading'
          },
          ref: 'header'
        },
        children
      )
    ])
  }
})
