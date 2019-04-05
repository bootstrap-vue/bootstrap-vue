import Vue from 'vue'
import BootstrapVue from '../../src'

Vue.use(BootstrapVue, {
  BModal: {
    // To match the header navbar
    zIndexOffset: 1071
  }
})
