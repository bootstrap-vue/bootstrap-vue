import Vue from 'vue';

<% if (!options.treeShake) { %>
import BootstrapVue from '<%= options.dist %>';
Vue.use(BootstrapVue, <%= JSON.stringify(options.config || {}, undefined, 2) %>);
<% } %>

<% if (options.treeShake) { %>
import {
  <%= [].concat(options.componentPlugins, options.directivePlugins, options.components, options.directives).filter(Boolean).join(',\n  ') %>
} from '<%= options.dist %>';

<%   if (options.config) { %>
import BVConfigPlugin from '<%= options.dist %>';

Vue.use(BVConfigPlugin, <%= JSON.stringify(options.config, undefined, 2) %>)'
<%   } %>
<%= options.componentPlugins.reduce((acc, plugin) => (acc += `Vue.use(${plugin});\n` ), '') %>
<%= options.directivePlugins.reduce((acc, plugin) => (acc += `Vue.use(${plugin});\n` ), '') %>
<%= options.components.reduce((acc, c) => (acc += `Vue.component('${c}', ${c});\n` ), '') %>
<%= options.directives.reduce((acc, d) => (acc += `Vue.directive('${d.replace(/^VB/, 'B')}', ${d});\n` ), '') %>
<% } %>
