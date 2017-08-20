import clickoutMixin from './clickout';
import listenOnRootMixin from './listen-on-root'
import { from as arrayFrom } from '../utils/array'

// Determine if an HTML element is visible - Faster than CSS check
function isVisible(el) {
    return el && (el.offsetWidth > 0 || el.offsetHeight > 0);
}

// Return an Array of visible items
function filterVisible(els) {
    return els ? els.filter(el => isVisible(el)) : [];
}

// Dropdown item CSS selectors
const ITEM_SELECTOR = '.dropdown-item:not(.disabled):not([disabled])';

export default {
    mixins: [clickoutMixin, listenOnRootMixin],
    props: {
        id: {
            type: String
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
    data() {
        return {
            visible: false
        };
    },
    created() {
        const listener = el => {
            if (el !== this) {
                this.visible = false;
            }
        };

        // To keep one dropdown opened on page
        this.listenOnRoot('shown::dropdown', listener);

        // Hide when clicked on links
        this.listenOnRoot('clicked::link', listener);
    },
    watch: {
        visible(state, old) {
            if (state === old) {
                return; // Avoid duplicated emits
            }
            if (state) {
                this.emitOnRoot('shown::dropdown', this);
                this.$emit('shown');
                /*
                 If this is a touch-enabled device we add extra
                 empty mouseover listeners to the body's immediate children;
                 only needed because of broken event delegation on iOS
                 https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
                 */
                if ('ontouchstart' in document.documentElement) {
                    const children = arrayFrom(document.body.children);
                    children.forEach(el => {
                        el.addEventListener('mouseover', this.noop);
                    });
                }

                // Focus on the first item on show
                this.$nextTick(() => { this.focusFirstItem() });

            } else {
                this.emitOnRoot('hidden::dropdown', this);
                this.$emit('hidden');
                /*
                 If this is a touch-enabled device we remove the extra
                 empty mouseover listeners we added for iOS support
                 */
                if ('ontouchstart' in document.documentElement) {
                    const children = arrayFrom(document.body.children);
                    children.forEach(el => {
                        el.removeEventListener('mouseover', this.noop);
                    });
                }
            }
        }
    },
    computed: {
        toggler() {
            if (this.split && this.$refs.toggle) {
                return this.$refs.toggle.$el || this.$refs.toggle;
            } 
            return this.$refs.button.$el || this.$refs.button;
        }
    },
    methods: {
        noop() {
            // Do nothing event handler (used in visible watch)
        },
        clickOutListener() {
            this.visible = false;
        },
        click(e) {
            if (this.disabled) {
                this.visible = false;
                return;
            }
            if (this.split) {
                this.$emit('click', e);
                this.emitOnRoot('shown::dropdown', this);
            } else {
                this.toggle();
            }
        },
        toggle() {
            if (this.disabled) {
                this.visible = false;
                return;
            }
            this.visible = !this.visible;
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
                // Return focus to original trigger button
                this.$nextTick(() => { this.focusToggler() });
            }
        },
        onMouseOver(evt) {
            // Focus the item on hover
            const item = evt.target;
            if (item.classList.contains('dropdown-item')
                    && !item.disabled
                    && !item.classList.contains('disabled')
                    && item.focus) {
                item.focus();
            }
        },
        focusNext(e, up) {
            if (!this.visible) {
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            this.$nextTick(() => {
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
                this.focusItem(index, items);
            });
        },
        focusItem(idx, items) {
            let el = items.find((el, i) => i === idx)
            if (el && el.getAttribute('tabindex') !== "-1") {
                el.focus()
            }
        },
        getItems() {
            // Get all items
            return filterVisible(arrayFrom(this.$refs.menu.querySelectorAll(ITEM_SELECTOR)));
        },
        getFirstItem() {
            // Get the first non-disabled item
            let item = this.getItems()[0];
            return item || null;
        },
        focusFirstItem() {
            const item = this.getFirstItem();
            if (item) {
                this.focusItem(0, [item]);
            }
        },
        focusToggler() {
            let toggler = this.toggler
            if (toggler && toggler.focus) {
                toggler.focus();
            }
        }
    }
};
