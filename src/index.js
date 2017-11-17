import * as components from './components';
import * as directives from './directives';
import { vueUse } from './utils';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const VuePlugin = {
    install: function (Vue) {
        if (Vue._bootstrap_vue_installed) {
            return;
        }

        Vue._bootstrap_vue_installed = true;

        // Register component plugins
        for (var plugin in components) {
            Vue.use(components[plugin]);
        }

        // Register directive plugins
        for (var plugin in directives) {
            Vue.use(directives[plugin]);
        }
    }
};

vueUse(VuePlugin);

export default VuePlugin;
