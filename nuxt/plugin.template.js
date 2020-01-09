import Vue from 'vue';

<% if (!options.treeShake) { %>
<%   if (options.icons) { %>
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';

Vue.use(BootstrapVue, <%= JSON.stringify(options.config || {}, undefined, 2) %>);
Vue.use(BootstrapVueIcons);
<%   } else { %>
import { BootstrapVue } from 'bootstrap-vue';

Vue.use(BootstrapVue, <%= JSON.stringify(options.config || {}, undefined, 2) %>);
<%   } %>
<% } %>

<% if (options.treeShake) { %>
import {
  <%= [].concat(
    options.config ? 'BVConfigPlugin' : null,
    options.componentPlugins,
    options.directivePlugins,
    options.components,
    options.directives
  ).filter(Boolean).join(',\n  ') %>
} from 'bootstrap-vue';

<%   if (options.config) { %>
Vue.use(BVConfigPlugin, <%= JSON.stringify(options.config, undefined, 2) %>);
<%   } %>

<%= options.componentPlugins.reduce((acc, plugin) => (acc += `Vue.use(${plugin});\n` ), '') %>
<%= options.directivePlugins.reduce((acc, plugin) => (acc += `Vue.use(${plugin});\n` ), '') %>
<%= options.components.reduce((acc, c) => (acc += `Vue.component('${c}', ${c});\n` ), '') %>
<%= options.directives.reduce((acc, d) => (acc += `Vue.directive('${d.replace(/^VB/, 'B')}', ${d});\n` ), '') %>
<% } %>
