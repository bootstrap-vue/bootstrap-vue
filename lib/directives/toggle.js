const inBrowser = typeof window !== 'undefined';

import target from './_target';
const listen_types = {click: true};

// Property key for handler
const BVT = '__BV_toggle__';

// Emitted Contreol Event for collapse (emitted to collapse)
const EVENT_TOGGLE = 'bv::toggle::collapse';
// Listen to event for toggle state update (Emited by collapse)
const EVENT_STATE = 'bv::collapse::state';

export default {

    bind(el, binding, vnode) {

        const targets = target(vnode, binding, listen_types, ({targets, vnode}) => {
            targets.forEach(target => {
                vnode.context.$root.$emit(EVENT_TOGGLE, target);
            });
        });

        if (inBrowser && vnode.context && targets.length > 0) {
            // Add aria attributes to element
            el.setAttribute('aria-controls', targets.join(' '));
            el.setAttribute('aria-expanded', 'false');

            // Toggle state hadnler, stored on element
            el[BVT] = function toggleDirectiveHandler(id, state) {
                if (targets.indexOf(id) !== -1) {
                    // Set aria-expanded state
                    el.setAttribute('aria-expanded', state ? 'true' : 'false');
                    // Set 'collapsed' class state
                    if (state) {
                        el.classList.remove('collapsed');
                    } else {
                        el.classList.add('collapsed');
                    }
                }
            };

            // Listen for toggle state changes
            vnode.context.$root.$on(EVENT_STATE, el[BVT]);
        }
    },
    unbind(el, binding, vnode) {
        if (el[BVT]) {
            // Remove our $root listener
            vnode.context.$root.$off(EVENT_STATE, el[BVT]);
            el[BVT] = null;
        }
    }
};
