import Vue from 'vue'
<% if (options.plugins) { %>
<%= options.plugins.reduce((acc, p) => (acc += `import ${p[0]} from 'bootstrap-vue/es/components/${p[1]}'\n` ), '') %>

<%= options.plugins.reduce((acc, p) => (acc += `Vue.use(${p[0]})\n` ), '') %>
<% } else { %>
import BootstrapVue from 'bootstrap-vue/es'

Vue.use(BootstrapVue)
<% } %>
