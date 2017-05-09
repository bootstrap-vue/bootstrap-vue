const all_listen_types = {hover: true, click: true, focus: true};

export default function targets(el, binding, listen_types, fn) {
    const vm = el.__vue__;

    if (!vm) {
        console.warn('__vue__ is not available on element', el);
        return;
    }

    const targets = Object.keys(binding.modifiers || {})
        .filter(t => !all_listen_types[t]);

    if (binding.value) {
        targets.push(binding.value);
    }

    const listener = () => {
        fn({targets, vm});
    };

    Object.keys(all_listen_types).forEach(type => {
        if (listen_types[type] || binding.modifiers[type]) {
            el.addEventListener(type, listener);
        }
    });
}
