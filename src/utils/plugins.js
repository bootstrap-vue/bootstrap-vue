/**
 * Register a component plugin as being loaded. returns true if compoent plugin already registered
 * @param {object} Vue
 * @param {string} component group name
 */
export function registerComponent(Vue, name) {
    Vue._bootstrap_vue_components_ = Vue._bootstrap_vue_components_ || {};
    const loaded = Vue._bootstrap_vue_components_[name];
    Vue._bootstrap_vue_components_[name] = true;
    return loaded;
}

/**
 * Register a directive plugin as being loaded. returns true if directive plugin already registered
 * @param {object} Vue
 * @param {string} directive group name
 */
export function registerDirective(Vue, name) {
    Vue._bootstrap_vue_directives_ = Vue._bootstrap_vue_directives_ || {};
    const loaded = Vue._bootstrap_vue_directives_[name];
    Vue._bootstrap_vue_directives_[name] = true;
    return loaded;
}

