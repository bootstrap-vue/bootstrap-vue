import Vue from 'vue'
import BootstrapVue from '../../src'

if (window && !window.Vue) {
  // We add Vue to window to help with debugging
  window.Vue = Vue
}

Vue.use(BootstrapVue)
