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
        // Scan through the modifiers and see what we have. first one of each type wins
        keys(bindings.modifiers).forEach(mod => {
            if (!opts.variant && arrayIncludes(variants, mod)) {
                opts.variant = mod;
            } else if (!opts.align && arrayIncludes(halign, mod)) {
                opts.align = mod;
            } else if (!opts.nowrap && mod === 'nowrap') {
                opts.nowrap = mod;
            } else if (!opts.transform && arrayIncludes(transform, mod)) {
                opts.transform = mod;
            }
        });
        keys(opts).forEach(key => {
            el.classList.add(`text-${opts[key]}`);
        });
    }
};
