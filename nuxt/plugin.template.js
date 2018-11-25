import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
<% if (options.bootstrapVueCSS) { %>include 'bootstrap-vue/dist/bootstrap-vue.css'<% } %>

Vue.use(BootstrapVue)
