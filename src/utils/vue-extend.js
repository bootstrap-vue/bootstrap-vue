//
// Single point of contact for Vue.extend
//
// TODO:
//   Conditionally import Vue if no global Vue
//
import Vue from 'vue'

const vueExtend = Vue.extend

// Default export
export default vueExtend

// Named export(s)
export { vueExtend }
