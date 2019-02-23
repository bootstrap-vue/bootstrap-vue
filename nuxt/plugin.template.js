import Vue from 'vue'
<% if (options.componentPlugins.length || options.directivePlugins.length) { %><%=
options.componentPlugins.reduce((acc, p) => (acc += `import ${p[0]} from 'bootstrap-vue/es/components/${p[1]}'\n` ), '') %><%=
options.directivePlugins.reduce((acc, p) => (acc += `import ${p[0]} from 'bootstrap-vue/es/directives/${p[1]}'\n` ), '') %>

<%=
options.componentPlugins.reduce((acc, p) => (acc += `Vue.use(${p[0]})\n` ), '') %><%= 
options.directivePlugins.reduce((acc, p) => (acc += `Vue.use(${p[0]})\n` ), '') %>
<% } else { %>
import BootstrapVue from 'bootstrap-vue/es'

Vue.use(BootstrapVue)
<% } %>
