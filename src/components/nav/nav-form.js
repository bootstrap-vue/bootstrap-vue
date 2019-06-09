import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import { omit } from '../../utils/object'
import { BForm, props as BFormProps } from '../form/form'

export const props = omit(BFormProps, ['inline'])

// @vue/component
export const BNavForm = /*#__PURE__*/ Vue.extend({
  name: 'BNavForm',
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(BForm, mergeData(data, { props: { ...props, inline: true } }), children)
  }
})

export default BNavForm
