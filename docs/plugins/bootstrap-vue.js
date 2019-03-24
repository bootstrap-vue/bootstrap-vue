import Vue from 'vue'
import BootstrapVue from '../../src'

Vue.use(BootstrapVue)

if (window !== undefined && !window.Vue) {
  window.Vue = Vue
}
