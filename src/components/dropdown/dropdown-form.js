import Vue from '../../utils/vue'
import BForm, { props as formProps } from '../form/form'
import { mergeData } from 'vue-functional-data-merge'

export default Vue.extend({
  name: 'BDropdownForm',
  functional: true,
  inheritAttrs: false,
  props: { ...formProps },
  render(h, { props, data, children }) {
    return h('li', [
      h(
        BForm,
        mergeData(data, {
          ref: 'form',
          staticClass: 'dropdown-item b-dropdown-form',
          props,
          attrs: { tabindex: props.disabled ? null : '0' }
        }),
        children
      )
    ])
  }
})
