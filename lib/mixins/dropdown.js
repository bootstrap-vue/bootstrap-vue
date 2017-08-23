import Popper from 'popper.js';

import clickoutMixin from './clickout';
import listenOnRootMixin from './listen-on-root'
import { from as arrayFrom } from '../utils/array'
import { assign } from '../utils/object'

// Determine if an HTML element is visible - Faster than CSS check
function isVisible(el) {
    return el && (el.offsetWidth > 0 || el.offsetHeight > 0);
}

// Return an Array of visible items
function filterVisible(els) {
    return els ? els.filter(el => isVisible(el)) : [];
}

// Dropdown item CSS selectors
// TODO: .dropdown-form handling
const ITEM_SELECTOR = '.dropdown-item:not(.disabled):not([disabled])';

// Popper attachment positions
const AttachmentMap = {
    // DropUp Left Align
    TOP: 'top-start',
    // DropUp Right Align
    TOPEND: 'top-end',
    // Dropdown left Align
    BOTTOM: 'bottom-start',
    // Dropdown Right Align
    BOTTOMEND: 'bottom-end'
};

export default {
    mixins: [clickoutMixin, listenOnRootMixin],
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        text: {
            // Button label
            type: String,
            default: ''
        },
        dropup: {
            // place on top if possible
            type: Boolean,
            default: false
        },
        right: {
            // Right align menu (default is left align)
            type: Boolean,
            default: false
        },
        offset: {
            // Number of pixels to offset menu, or a CSS unit value (i.e. 1px, 1rem, etc)
            type: [Number, String],
            default: 0
        },
        noFlip: {
            // Disable auto-flipping of menu from bottom<=>top
            type: Boolean,
            default: false
        },
        popperOps: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            visible: false,
            _popper: null
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
                this.showMenu();
            } else {
                this.hideMenu();
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
    destroy() {
        if (this._popper) {
            this_popper.destroy();
        }
        this._popper = null;
        this.setTouchStart(false);
    },
    methods: {
        showMenu() {
            if (this.disabled) {
                return;
            }
            // TODO: move emit show to visible watcher, to allow cancelling of show
            this.$emit('show');
            // Ensure other menus are closed
            this.emitOnRoot('shown::dropdown', this);

            // for dropup with alignment we use the parent as popper container
            let element = this.dropup ? this.$el : this.$refs.menu;
            this._popper = new Popper(element, this.$refs.menu, this.getPopperConfig());

            this.setTocuhStart(true);
            this.$emit('shown');

            // Focus on the first item on show
            this.$nextTick(() => { this.focusFirstItem() });
        },
        hideMenu() {
            // TODO: move emit hide to visible watcher, to allow cancelling of hide
            this.$emit('hide');
            this.emitOnRoot('hidden::dropdown', this);
            this.setTocuhStart(false);
            this._popper = null;
            this.$emit('hidden');
        },
        getPopperConfig() {
            let placement = AttachmentMap.BOTTOM;
            if (this.dropup && this.right) {
                // dropup + right
                placement = AttachmentMap.TOPEND;
            } else if (this.dropup) {
                // dropup + left
                placement = AttachmentMap.TOP;
            } else if (this.right) {
                // drowndown + right 
                placement = AttachmentMap.BOTTOMEND;
            }
            const popperConfig = {
                placement: placement,
                modifiers: {
                    offset: {
                        offset: this.offset || 0
                    },
                    flip: {
                        enabled: !this.noFlip
                    },
                    applyStyle: {
                        // Disable Popper.js for Dropdown in Navbar
                        enabled: !this.isNav
                    }
                }
            }
            return assign(popperConfig, this.popperOpts || {});
        },
        setTouchStart(on) {
            /*
             If this is a touch-enabled device we add extra
             empty mouseover listeners to the body's immediate children;
             only needed because of broken event delegation on iOS
             https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
             */
            if ('ontouchstart' in document.documentElement) {
                const children = arrayFrom(document.body.children);
                children.forEach(el => {
                    if (on) {
                        el.addEventListener('mouseover', this.noop);
                    } else {
                        el.removeEventListener('mouseover', this.noop);
                    }
                });
            }
        },
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
                // TODO: Need special handler for dealing with form inputs
                // Tab, if in a text-like input, we should just focus next item in the dropdown
                // Note: Inputs are in a special .dropdown-form container
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
        onFocusout(evt) {
            if (this.$refs.menu.contains(evt.relatedTarget)) {
                return;
            }
            this.visible = false;
        },
        onMouseOver(evt) {
            // Focus the item on hover
            // TODO: Special handling for inputs?
            // Inputs are in a special .dropdown-form container
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
