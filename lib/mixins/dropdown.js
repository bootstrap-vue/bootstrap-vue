import clickOutMixin from './clickout';
import triggersMixin from './triggers';

// Determine if an HTML element is visible - Faster than CSS check
function isVisible(el) {
    return el && (el.offsetWidth > 0 || el.offsetHeight > 0);
}

// Convert a nodeList into an array
function nodeListToArray(nodeList) {
    return Array.prototype.slice.call(nodeList || []);
}

// Return an Array of visible items
function filterVisible(els) {
    return els ? els.filter(el => isVisible(el)) : [];
}

// Dropdown item CSS selectors
const ITEM_SELECTOR = '.dropdown-item:not(.disabled):not([disabled])';
const HEADER_SELECTOR = '.dropdown-header';
const ALL_SELECTOR = [ITEM_SELECTOR, HEADER_SELECTOR].join(',');

export default {
    mixins: [clickOutMixin, triggersMixin],
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
        },
        debounce: {
            default: 0
        },
        delay: {
            default: () => { return { show: 0, hide: 150 }}
        }
    },
    data() {
        return {
            triggerName: 'dropdown'
        };
    },
    created() {
        this.triggersCreated();

        const listener = el => {
            if (el !== this) {
                this.toggle(false);
            }
        };

        // To keep one dropdown opened on page
        // this.$root.$on('shown::dropdown', listener);

        // Hide when clicked on links
        this.$root.$on('clicked::link', listener);
    },
    mounted() {
        this.triggersMounted([this.split ? this.$refs.toggle : this.$refs.button, this.$refs.menu]);
    },
    beforeDestroy() {
        this.triggersBeforeDestroy();
    },
    methods: {
        noop() {
            // Do nothing event handler (used in visible watch)
        },
        clickOutListener() {
            if (this.classState) {
                this.toggle(false)
            }
        },
        hideComponent() {
            this.classState = false
            clearTimeout(this.$data._timeout);

            /*
             If this is a touch-enabled device we remove the extra
             empty mouseover listeners we added for iOS support
             */
            if (typeof document !== 'undefined' && 'ontouchstart' in document.documentElement) {
                const children = Array.prototype.slice.call(document.body.children);
                children.forEach(el => {
                    el.removeEventListener('mouseover', this.noop);
                });
            }
        },
        showComponent() {
            clearTimeout(this.$data._timeout);
            if (this.disabled) {
                this.classState = false;
                return;
            }
            this.classState = true

            /*
             If this is a touch-enabled device we add extra
             empty mouseover listeners to the body's immediate children;
             only needed because of broken event delegation on iOS
             https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
             */
            if (typeof document !== 'undefined' && 'ontouchstart' in document.documentElement) {
                const children = Array.prototype.slice.call(document.body.children);
                children.forEach(el => {
                    el.addEventListener('mouseover', this.noop);
                });
            }

            this.$nextTick(function () {
                // Clear any items that may have active state left
                this.clearItems();
                // Focus first visible non-disabled item
                const item = this.getFirstItem();
                if (item) {
                    this.focusItem(0, [item]);
                }
            });
        },
        onTab() {
            if (this.classState) {
                this.classState = false;
            }
        },
        onEsc(e) {
            if (this.classState) {
                this.classState = false;
                e.preventDefault();
                e.stopPropagation();
                this.$nextTick(function () {
                    // Return focus to original trigger button
                    let el;
                    if (this.split && this.$refs.toggle) {
                        el = this.$refs.toggle.$el || this.$refs.toggle;
                    } else {
                        el = this.$refs.button.$el || this.$refs.button;
                    }
                    if (el && el.focus) {
                        el.focus();
                    }
                });
            }
        },
        focusNext(e, up) {
            if (!this.classState) {
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
        focusHovered(e) {
            if (!this.classState) {
                return;
            }
            this.$nextTick(() => {
                const items = this.getItems();
                if (items.length < 1) {
                    return;
                }
                const index = items.indexOf(e.target);
                if (index > -1) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.focusItem(index, items);
                }
            });
        },
        focusItem(idx, items) {
            items.forEach((el, i) => {
                if (i === idx) {
                    el.classList.add('active');
                    el.focus();
                } else {
                    el.classList.remove('active');
                }
            });
        },
        clearItems() {
            const items = this.getItems();
            items.forEach(el => {
                el.classList.remove('active');
            });
        },
        getItems() {
            // Get all items and headers
            return filterVisible(nodeListToArray(this.$refs.menu.querySelectorAll(ALL_SELECTOR)));
        },
        getFirstItem() {
            // Get the first non-header non-disabled item
            let item = filterVisible(nodeListToArray(this.$refs.menu.querySelectorAll(ITEM_SELECTOR)))[0];
            if (!item) {
                // If no items then try a header
                item = filterVisible(nodeListToArray(this.$refs.menu.querySelectorAll(HEADER_SELECTOR)))[0];
            }
            return item || null;
        }
    }
};
