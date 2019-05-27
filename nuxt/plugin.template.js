import Vue from 'vue';

<% if (!options.treeShake) { %>
import BootstrapVue from 'bootstrap-vue/<%= options.dist %>';

Vue.use(BootstrapVue, <%= JSON.stringify(options.config || {}, undefined, 2) %>);
<% } %>

<% if (options.treeShake) { %>

<% if (options.componentPlugins.length || options.components.length) { %>
import {
  <%= [].concat(options.componentPlugins, options.components).filter(Boolean).join(',\n  ') %>
} from 'bootstrap-vue/<%= options.dist %>/components';
<% } %>
<% if (options.directivePlugins.length || options.directives.length) { %>
import {
  <%= [].concat(options.directivePlugins, options.directives).filter(Boolean).join(',\n  ') %>
} from 'bootstrap-vue/<%= options.dist %>/directives';
<% } %>

<% if (options.config) { %>
import BVConfigPlugin from 'bootstrap-vue/<%= options.dist %>/bv-config';

Vue.use(BVConfigPlugin, <%= JSON.stringify(options.config, undefined, 2) %>)'
<% } %>

<%= options.componentPlugins.reduce((acc, plugin) => (acc += `Vue.use(${plugin});\n` ), '') %>
<%= options.directivePlugins.reduce((acc, plugin) => (acc += `Vue.use(${plugin});\n` ), '') %>
<%= options.components.reduce((acc, component) => (acc += `Vue.component('${component}', ${component});\n` ), '') %>
<%= options.directives.reduce((acc, directive) => (acc += `Vue.directive('${directive.replace(/^VB/, 'B')}', ${directive});\n` ), '') %>

<% } %>
