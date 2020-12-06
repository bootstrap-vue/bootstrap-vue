import { Vue, mergeData } from '../../vue'
import { NAME_DROPDOWN_FORM } from '../../constants/components'
import { PROP_TYPE_ARRAY_OBJECT_STRING, PROP_TYPE_BOOLEAN } from '../../constants/props'
import { omit, sortKeys } from '../../utils/object'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { BForm, props as formControlProps } from '../form/form'

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...formControlProps,
    disabled: makeProp(PROP_TYPE_BOOLEAN, false),
    formClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING)
  }),
  NAME_DROPDOWN_FORM
)

// --- Main component ---

// @vue/component
export const BDropdownForm = /*#__PURE__*/ Vue.extend({
  name: NAME_DROPDOWN_FORM,
  functional: true,
  props,
  render(h, { props, data, listeners, children }) {
    return h('li', mergeData(omit(data, ['attrs', 'on']), { attrs: { role: 'presentation' } }), [
      h(
        BForm,
        {
          staticClass: 'b-dropdown-form',
          class: [props.formClass, { disabled: props.disabled }],
          props,
          attrs: {
            ...(data.attrs || {}),
            disabled: props.disabled,
            // Tab index of -1 for keyboard navigation
            tabindex: props.disabled ? null : '-1'
          },
          on: listeners,
          ref: 'form'
        },
        children
      )
    ])
  }
})
