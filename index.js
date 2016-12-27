import * as components from './components';

function plugin(Vue) {
    if (plugin.installed) return;

    Object.keys(components).forEach(key =>
        Vue.component(key, components[key])
    );
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

export * from './components';
export default plugin;
