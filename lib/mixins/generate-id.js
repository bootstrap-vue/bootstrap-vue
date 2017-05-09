/**
 * Tries to generate id using uid if no id prop is provided.
 * NOTE: this mixin should be used only when `aria` and `for` tags are needed, in other cases.
 * it is better to prefer references/refs and events over relying on generated id.
 * @see https://github.com/bootstrap-vue/bootstrap-vue/issues/281
 *
 * Currently is being used in:
 *  - dropdown.vue
 *  - form-checkbox-vue
 *  - form-file.vue
 *  - form-input.vue
 *  - form-select.vue
 */

const inBrowser = typeof window !== 'undefined';
const UNSAFE_UID = (inBrowser && window.UNSAFE_UID === true) || (!inBrowser && process.env.UNSAFE_UID === true);

export default {
    computed: {
        _id() {
            if (!UNSAFE_UID || this.id) {
                return this.id;
            }

            return `__b_${this._uid}__`;
        }
    }
};
