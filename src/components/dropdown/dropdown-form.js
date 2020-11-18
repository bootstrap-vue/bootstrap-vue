import { defineComponent, h, mergeData } from '../../vue'
import { NAME_DROPDOWN_FORM } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import { omit } from '../../utils/object'
import { BForm, props as formControlProps } from '../form/form'

// @vue/component
export const BDropdownForm = /*#__PURE__*/ defineComponent({
  name: NAME_DROPDOWN_FORM,
  functional: true,
  props: makePropsConfigurable(
    {
      ...formControlProps,
      disabled: {
        type: Boolean,
        default: false
      },
      formClass: {
        type: [String, Object, Array]
        // default: null
      }
    },
    NAME_DROPDOWN_FORM
  ),
  render(_, { props, data, listeners, children }) {
    return h(
      'li',
      mergeData(omit(data, ['attrs', 'on']), {
        attrs: { role: 'presentation' }
      }),
      [
        h(
          BForm,
          {
            ref: 'form',
            staticClass: 'b-dropdown-form',
            class: [props.formClass, { disabled: props.disabled }],
            props,
            attrs: {
              ...(data.attrs || {}),
              disabled: props.disabled,
              // Tab index of -1 for keyboard navigation
              tabindex: props.disabled ? null : '-1'
            },
            on: listeners
          },
          children
        )
      ]
    )
  }
})
