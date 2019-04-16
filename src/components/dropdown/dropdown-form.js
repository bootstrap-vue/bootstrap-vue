import Vue from '../../utils/vue'
import BForm, { props as formProps } from '../form/form'
import { mergeData } from 'vue-functional-data-merge'

export default Vue.extend({
  name: 'BDropdownForm',
  functional: true,
  props: { ...formProps },
  render(h, { props, data, children }) {
    return h('li', [
      h(
        BForm,
        mergeData(data, {
          staticClass: 'b-dropdown-form',
          props,
          ref: 'form'
        }),
        children
      )
    ])
  }
})
