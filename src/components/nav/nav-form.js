import Vue from 'vue'
import BForm from '../form/form'
import { mergeData } from 'vue-functional-data-merge'

// @vue/component
export default Vue.extend({
  name: 'BNavForm',
  functional: true,
  props: {
    id: {
      type: String,
      default: null
    }
  },
  render(h, { props, data, children }) {
    return h(BForm, mergeData(data, { attrs: { id: props.id }, props: { inline: true } }), children)
  }
})
