const inBrowser = typeof window !== 'undefined';

import target from './_target';

const listen_types = {click: true};

export default {
    bind(el, binding) {
        const targets = target(el, binding, listen_types, ({targets, vm}) => {
            targets.forEach(target => {
                vm.$root.$emit('collapse::toggle', target);
            });
        });
        if (inBrowser && el.__vue__ && targets.length > 0) {
            el.setAttribute('aria-controls', targets.join(' '));
            el.setAttribute('aria-expanded', 'false');
            el.__vue__.$root.$on('collapse::toggle::state', (id, state) => {
                if (targets.indexOf(id) !== -1) {
                    el.setAttribute('aria-expanded', state ? 'true' : 'false');
                }
            });
        }
    }
};
