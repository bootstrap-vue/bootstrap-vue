import Vue from 'vue'
<% if (
  options.componentPlugins.length ||
  options.directivePlugins.length ||
  options.components.length ||
  options.directives.length
) { %><%=
options.componentPlugins.reduce((acc, p) => (acc += `import { ${p} } from 'bootstrap-vue/${options.dist}/components'\n` ), '') %><%=
options.directivePlugins.reduce((acc, p) => (acc += `import { ${p} } from 'bootstrap-vue/${options.dist}/directives'\n` ), '') %><%=
options.components.reduce((acc, c) => (acc += `import { ${c} } from 'bootstrap-vue/${options.dist}/components'\n` ), '') %><%=
options.directives.reduce((acc, d) => (acc += `import { ${d} } from 'bootstrap-vue/${options.dist}/directives'\n` ), '') %>

<% if (options.config) { %>
import BVConfigPlugin from 'bootstrap-vue/<%= options.dist %>/bv-config'

Vue.use(BVConfigPlugin, <%= JSON.stringify(options.config, undefined, 2) %>)
<% } %>

<%=
options.componentPlugins.reduce((acc, p) => (acc += `Vue.use(${p})\n` ), '') %><%=
options.directivePlugins.reduce((acc, p) => (acc += `Vue.use(${p})\n` ), '') %><%=
options.components.reduce((acc, c) => (acc += `Vue.component('${c}', ${c})\n` ), '') %><%=
options.directives.reduce((acc, d) => (acc += `Vue.directive('${d.replace(/^VB/, 'B')}', ${d})\n` ), '') %>

<% } else { %>
import BootstrapVue from 'bootstrap-vue/<%= options.dist %>'

Vue.use(BootstrapVue, <%= JSON.stringify(options.config || {}, undefined, 2) %>)
<% } %>
