import target from './_target';

const listen_types = {click: true};

export default {
// eslint-disable-next-line no-shadow-restricted-names
    bind(undefined, binding, vnode) {
        target(vnode, binding, listen_types, ({targets, vnode}) => {
            targets.forEach(target => {
                vnode.context.$root.$emit('bv::show::modal', target, vnode.elm);
            });
        });
    }
};
