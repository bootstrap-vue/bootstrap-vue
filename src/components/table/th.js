import Vue from '../../utils/vue'
import { BTd } from './td'

// @vue/component
export const BTh = /*#__PURE__*/ Vue.extend({
  name: 'BTh',
  extends: BTd,
  computed: {
    tag() {
      return 'th'
    }
  }
})
