import Vue from 'vue'
<% if (options.componentPlugins.length || options.directivePlugins.length) { %><%=
options.componentPlugins.reduce((acc, p) => (acc += `import ${p[0]} from 'bootstrap-vue/es/components/${p[1]}'\n` ), '') %><%=
options.directivePlugins.reduce((acc, p) => (acc += `import ${p[0]} from 'bootstrap-vue/es/directives/${p[1]}'\n` ), '') %>

<% if (options.config) { %>
import BVConfigPlugin from 'bootstrap-vue/es/bv-config'

Vue.use(BVConfigPlugin, <%= JSON.stringify(options.config, undefined, 2) %>)
<% } %>

<%=
options.componentPlugins.reduce((acc, p) => (acc += `Vue.use(${p[0]})\n` ), '') %><%=
options.directivePlugins.reduce((acc, p) => (acc += `Vue.use(${p[0]})\n` ), '') %>
<% } else { %>
import BootstrapVue from 'bootstrap-vue/es'

Vue.use(BootstrapVue, <%= JSON.stringify(options.config || {}, undefined, 2) %>)
<% } %>
