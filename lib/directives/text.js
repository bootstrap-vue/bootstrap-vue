/*
 * v-b-text directive
 *
 * Usage: 
 *  Variants: v-b-text.danger
 *  Alignment: v-b-text.center
 *  Nowrap:    v-b-text.nowrap
 *  Transform: v-b-text.lowercase
 *  Combo:     v-b-text.center.info.uppercase
 *
 */

const inBrowser = typeof window !== 'undefined';

import { variants, halign, transform } from '../utils/enums';
import { keys } from '../utils/object';
import { arrayIncludes } from '../utils/array';

export default {
    bind(el, binding, vnode) {
        const opts = {};
        // Scan through the modifiers and see what we have. Last one of each type wins
        keys(bindings.modifiers).forEach(mod => {
            if (arrayIncludes(variants, mod)) {
                opts.variant = mod;
            } else if (arrayIncludes(halign, mod)) {
                opts.align = mod;
            } else if (mod === 'nowrap') {
                opts.nowrap = mod;
            } else if (arrayIncludes(transform, mod)) {
                opts.transform = mod;
            }
        });
        keys(opts).forEach(key => {
            el.classList.add(`text-${opts[key]}`);
        });
    }
};
