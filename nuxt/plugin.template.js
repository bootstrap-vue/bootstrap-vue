import Vue from 'vue'
<% if (options.componentPlugins.length || options.directivePlugins.length) { %><%=
options.componentPlugins.reduce((acc, p) => (acc += `import { ${p} } from 'bootstrap-vue/${options.dist}/components'\n` ), '') %><%=
options.directivePlugins.reduce((acc, p) => (acc += `import { ${p} } from 'bootstrap-vue/${options.dist}/directives'\n` ), '') %>

<% if (options.config) { %>
import BVConfigPlugin from 'bootstrap-vue/<%= options.dist %>/bv-config'

Vue.use(BVConfigPlugin, <%= JSON.stringify(options.config, undefined, 2) %>)
<% } %>

<%=
options.componentPlugins.reduce((acc, p) => (acc += `Vue.use(${p})\n` ), '') %><%=
options.directivePlugins.reduce((acc, p) => (acc += `Vue.use(${p})\n` ), '') %>
<% } else { %>
import BootstrapVue from 'bootstrap-vue/<%= options.dist %>'

Vue.use(BootstrapVue, <%= JSON.stringify(options.config || {}, undefined, 2) %>)
<% } %>
