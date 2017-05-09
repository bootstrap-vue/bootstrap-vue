import target from './_target';

const listen_types = {click: true};

export default {
    bind(el, binding) {
        target(el, binding, listen_types, ({targets, vm}) => {
            targets.forEach(target => {
                vm.$root.$emit('show::modal', target, el);
            });
        });
    }
};
