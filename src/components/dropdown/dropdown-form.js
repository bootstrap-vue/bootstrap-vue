import { CLASS_NAME_DISABLED, CLASS_NAME_BV_DROPDOWN_FORM } from '../../constants/class-names'
import { NAME_DROPDOWN_FORM } from '../../constants/components'
import { ROLE_PRESENTATION } from '../../constants/roles'
import Vue, { mergeData } from '../../utils/vue'
import { BForm, props as formProps } from '../form/form'

// @vue/component
export const BDropdownForm = /*#__PURE__*/ Vue.extend({
  name: NAME_DROPDOWN_FORM,
  functional: true,
  props: {
    ...formProps,
    disabled: {
      type: Boolean,
      default: false
    },
    formClass: {
      type: [String, Object, Array]
      // default: null
    }
  },
  render(h, { props, data, children }) {
    const $attrs = data.attrs || {}
    const $listeners = data.on || {}
    data.attrs = {}
    data.on = {}
    return h('li', mergeData(data, { attrs: { role: ROLE_PRESENTATION } }), [
      h(
        BForm,
        {
          ref: 'form',
          staticClass: CLASS_NAME_BV_DROPDOWN_FORM,
          class: [props.formClass, { [CLASS_NAME_DISABLED]: props.disabled }],
          props,
          attrs: {
            ...$attrs,
            disabled: props.disabled,
            // Tab index of -1 for keyboard navigation
            tabindex: props.disabled ? null : '-1'
          },
          on: $listeners
        },
        children
      )
    ])
  }
})
