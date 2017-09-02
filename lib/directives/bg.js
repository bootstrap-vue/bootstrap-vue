/*
 * v-b-bg directive
 *
 * Usage: 
 *  Variants: v-b-bg.danger
 */

import { variants } from '../utils/enums';
import { keys } from '../utils/object';
import { arrayIncludes } from '../utils/array';

export default {
    bind(el, binding, vnode) {
        let variant = null;
        // Scan through the modifiers and see what we have. Last one wins
        keys(bindings.modifiers).forEach(mod => {
            if (arrayIncludes(variants, mod)) {
                variant = mod;
            }
        });
        if (variant) {
            el.classList.add(`bgt-${variant}`);
        };
    }
};
