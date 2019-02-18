import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
<% if (options.bootstrapVueCss) { %>import 'bootstrap-vue/dist/bootstrap-vue.min.css'<% } %>

Vue.use(BootstrapVue)
