import target from './_target';

const listen_types = {click: true};

export default {
// eslint-disable-next-line no-shadow-restricted-names
    bind(undefined, binding, vnode) {
        target(vnode, binding, listen_types, ({targets, vnode}) => {
            targets.forEach(target => {
                // TODO: use BvEvent object
                // set button element as relatedTarget, target as modal
                vnode.context.$root.$emit('bv::modal::show', target, vnode.elm);
            });
        });
    }
};
