import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

<% if (options.unsafeHTML) { %>
if (process.server) {
  global.BV_UNSAFE_HTML = true
} else {
  window.BV_UNSAFE_HTML = true
}<% } %>

Vue.use(BootstrapVue)
