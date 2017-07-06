const inBrowser = typeof window !== 'undefined';

import target from './_target';
const listen_types = {click: true};

export default {

    bind(el, binding, vnode) {

        const targets = target(vnode, binding, listen_types, ({targets, vnode}) => {
            targets.forEach(target => {
                vnode.context.$root.$emit('collapse::toggle', target);
            });
        });

        if (inBrowser && vnode.context && targets.length > 0) {
            el.setAttribute('aria-controls', targets.join(' '));
            el.setAttribute('aria-expanded', 'false');

            vnode.context.$root.$on('collapse::toggle::state', (id, state) => {
                if (targets.indexOf(id) !== -1) {
                    el.setAttribute('aria-expanded', state ? 'true' : 'false');
                }
            });
        }
    }
};
