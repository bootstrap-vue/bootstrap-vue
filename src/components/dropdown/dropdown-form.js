import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import { BForm, props as formProps } from '../form/form'

export const BDropdownForm = /*#__PURE__*/ Vue.extend({
  name: 'BDropdownForm',
  functional: true,
  inheritAttrs: false,
  props: {
    ...formProps,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  render(h, { props, data, children }) {
    return h('li', [
      h(
        BForm,
        mergeData(data, {
          ref: 'form',
          staticClass: 'b-dropdown-form',
          class: { disabled: props.disabled },
          props,
          attrs: {
            disabled: props.disabled,
            // Tab index of -1 for keyboard navigation
            tabindex: props.disabled ? null : '-1'
          }
        }),
        children
      )
    ])
  }
})

export default BDropdownForm
