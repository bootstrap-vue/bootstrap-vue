const ITEM_SELECTOR = '.dropdown-item:not(.disabled):not([disabled]),dropdown-header';

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
    methods: {
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
