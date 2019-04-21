import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import BForm, { props as BFormProps } from '../form/form'
import { omit } from '../../utils/object'

export const props = omit(BFormProps, ['inline'])

// @vue/component
export default Vue.extend({
  name: 'BNavForm',
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(BForm, mergeData(data, { props: { ...props, inline: true } }), children)
  }
})
