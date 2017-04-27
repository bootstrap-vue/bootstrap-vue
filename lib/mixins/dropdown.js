const ITEM_SELECTOR = '.dropdown-item:not(.disabled):not([disabled]),.dropdown-header';

export default {
    props: {
        split: {
            type: Boolean,
            default: false
        },
        text: {
            type: String,
            default: ''
        },
        dropup: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        right: {
            type: Boolean,
            default: false
        }
    },
    created() {
        this.$root.$on('shown::dropdown', el => {
            // To keep one dropdown opened on page
            if (el !== this) {
                this.visible = false;
            }
        });
    },
    watch: {
        visible(state, old) {
            if (state === old) {
                return; // Avoid duplicated emits
            }

            if (state) {
                this.$root.$emit('shown::dropdown', this);
                /*
                 If this is a touch-enabled device we add extra
                 empty mouseover listeners to the body's immediate children;
                 only needed because of broken event delegation on iOS
                 https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
                 */
                if (typeof document !== 'undefined' && 'ontouchstart' in document.documentElement) {
                    const children = [...document.body.children];
                    children.forEach(el => {
                        el.addEventListener('mouseover', this.noop);
                    });
                }
            } else {
                this.$root.$emit('hidden::dropdown', this);
                /*
                 If this is a touch-enabled device we remove the extra
                 empty mouseover listeners we added for iOS support
                 */
                if (typeof document !== 'undefined' && 'ontouchstart' in document.documentElement) {
                    const children = [...document.body.children];
                    children.forEach(el => {
                        el.removeEventListener('mouseover', this.noop);
                    });
                }
            }
        }
    },
    methods: {
        noop() {
            // Do nothing event handler (used in visible watch)
        },
        toggle() {
            if (this.disabled) {
                this.visible = false;
                return;
            }
            this.visible = !this.visible;
            if (this.visible) {
                // Focus first non-dsabled item
                const items = this.getItems();
                if (items.length > 0) {
                    items[0].focus();
                }
            }
        },
        onTab() {
            if (this.visible) {
                this.visible = false;
            }
        },
        onEsc(e) {
            if (this.visible) {
                this.visible = false;
                e.preventDefault();
                e.stopPropagation();
                // Return focus to original button
                ((this.split && this.$refs.toggle) ? this.$refs.toggle : this.$refs.button).focus();
            }
        },
        focusNext(e, up) {
            if (!this.visible) {
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            const items = this.getItems();
            if (items.length < 1) {
                return;
            }
            let index = items.indexOf(e.target);
            if (up && index > 0) {
                index--;
            } else if (!up && index < items.length - 1) {
                index++;
            }
            if (index < 0) {
                index = 0;
            }
            items[index].focus();
        },
        getItems() {
            return [...this.$refs.menu.querySelectorAll(ITEM_SELECTOR)];
        }
    }
};
