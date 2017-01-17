import components from './components';

const VuePlugin = {
    install(Vue){
        if (VuePlugin.installed) return;
        VuePlugin.installed = true;
        for (let key in components) {
            Vue.component(key, components[key])
        }
    }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
}

module.exports = VuePlugin;