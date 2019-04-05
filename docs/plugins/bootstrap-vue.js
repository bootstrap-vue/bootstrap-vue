import Vue from 'vue'
import BootstrapVue from '../../src'

Vue.use(BootstrapVue, {
  // Make sure modals in the docs are above anything else
  BModal: { zIndexOffset: 2000 }
})
