/*
 * v-b-clearfix directive
 *
 * Usage: 
 *  v-b-clearfix
 */

export default {
    bind(el, binding, vnode) {
        el.classList.add(`clearfix`);
    }
};
