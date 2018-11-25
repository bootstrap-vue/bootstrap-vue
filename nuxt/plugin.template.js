import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
<% if (options.bootstrapVueCss) { %>include 'bootstrap-vue/dist/bootstrap-vue.css'<% } %>

Vue.use(BootstrapVue)
