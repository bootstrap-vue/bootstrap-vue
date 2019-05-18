import Vue from 'vue';
<% if (
  options.componentPlugins.length ||
  options.directivePlugins.length ||
  options.components.length ||
  options.directives.length
) { %>
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

<%=
options.componentPlugins.reduce((acc, cp) => (acc += `Vue.use(${cp});\n` ), '')
%><%=
options.directivePlugins.reduce((acc, dp) => (acc += `Vue.use(${dp});\n` ), '')
%><%=
options.components.reduce((acc, c) => (acc += `Vue.component('${c}', ${c});\n` ), '')
%><%=
options.directives.reduce((acc, d) => (acc += `Vue.directive('${d.replace(/^VB/, 'B')}', ${d});\n` ), '')
%>

<% } else { %>
import BootstrapVue from 'bootstrap-vue/<%= options.dist %>';

Vue.use(BootstrapVue, <%= JSON.stringify(options.config || {}, undefined, 2) %>);
<% } %>
