const inBrowser = typeof window !== 'undefined';

import target from './_target';

const listen_types = {click: true};

export default {
    bind(el, binding) {
        if (inBrowser && el.__vue__) {
            const targets = Object.keys(binding.modifiers || {}).filter(t => !listen_types[t]);
            if (binding.value) {
                targets.push(binding.value);
            }
            if (targets.length > 0) {
                el.setAttribute('aria-controls', targets.join(' '));
                el.setAttribute('aria-expanded', 'false');
                el.__vue__.$root.$on('collapse::toggle::state', (id, state) => {
                    if (targets.indexOf(id) !== -1) {
                        el.setAttribute('aria-expanded', state ? 'true' : 'false');
                    }
                });
            }
        }
        
        target(el, binding, listen_types, ({targets, vm}) => {
            targets.forEach(target => {
                vm.$root.$emit('collapse::toggle', target);
            });
        });
    }
};
