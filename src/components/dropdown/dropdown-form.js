import BForm, { props as formProps } from '../form/form'
import { mergeData } from 'vue-functional-data-merge'

export default {
  name: 'BDropdownForm',
  functional: true,
  props: { ...formProps },
  render(h, { props, data, children }) {
    return h(BForm, mergeData(data, { props, staticClass: 'b-dropdown-form' }), children)
  }
}
