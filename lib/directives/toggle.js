import { create } from "../utils/object";
import { uid } from "../utils";
const inBrowser = typeof window !== "undefined";

import target from "./_target";
const listen_types = { click: true };

// We only need a basic dictionary here.
let cache = create(null);

export default {
    bind(el, binding, vnode) {
        const targets = target(vnode, binding, listen_types, ({ targets, vnode }) => {
            targets.forEach(target => {
                vnode.context.$root.$emit("collapse::toggle", target);
            });
        });

        if (inBrowser && vnode.context && targets.length > 0) {
            const _uid = uid();
            el.setAttribute("aria-controls", targets.join(" "));
            el.setAttribute("aria-expanded", "false");
            el.setAttribute("data-v-bv-toggle-id", _uid);

            // Use named function to make debugging easier in stack traces.
            cache[_uid] = function toggleDirectiveHandler(id, state) {
                if (targets.indexOf(id) !== -1) {
                    el.setAttribute("aria-expanded", state ? "true" : "false");
                }
            };

            vnode.context.$root.$on("collapse::toggle::state", cache[_uid]);
        }
    },

    unbind(el, binding, vnode) {
        vnode.context.$root.$off("collapse::toggle::state", cache[el.dataset.vBvToggleId]);
        delete cache[el.dataset.vBvToggleId];
    }
};
