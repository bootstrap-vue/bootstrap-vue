import Vue from 'vue'
import BForm, { props as BFormProps } from '../form/form'
import { mergeData } from 'vue-functional-data-merge'
import copyProps from '../../utils/copy-props'

const formProps = copyProps(BFormProps)
delete formProps.inline

export const props = {
  ...formProps
}

// @vue/component
export default Vue.extend({
  name: 'BNavForm',
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(BForm, mergeData(data, { props: { ...props, inline: true } }), children)
  }
})
