import Popper from "popper.js";
import clickoutMixin from "./clickout";
import listenOnRootMixin from "./listen-on-root";
import { from as arrayFrom } from "../utils/array";
import { assign } from "../utils/object";
import { isVisible, closest, selectAll, getAttr, setAttr, eventOn, eventOff } from "../utils/dom";

// Return an Array of visible items
function filterVisible(els) {
    return (els || []).filter(isVisible);
}

// Dropdown item CSS selectors
// TODO: .dropdown-form handling
const ITEM_SELECTOR = ".dropdown-item:not(.disabled):not([disabled])";

// Popper attachment positions
const AttachmentMap = {
    // DropUp Left Align
    TOP: "top-start",
    // DropUp Right Align
    TOPEND: "top-end",
    // Dropdown left Align
    BOTTOM: "bottom-start",
    // Dropdown Right Align
    BOTTOMEND: "bottom-end"
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
            default: ""
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
        popperOpts: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            visible: false,
            _popper: null,
            inNavbar: null
        };
    },
    created() {
        const listener = el => {
            if (el !== this) {
                this.visible = false;
            }
        };

        // To keep one dropdown opened on page
        this.listenOnRoot("bv::dropdown::shown", listener);

        // Hide when clicked on links
        this.listenOnRoot("clicked::link", listener);
        // Use new namespaced events
        this.listenOnRoot("bv::link::clicked", listener);
    },
    watch: {
        visible(state, old) {
            if (state === old) {
                // Avoid duplicated emits
                return;
            }
            if (state) {
                this.showMenu();
            } else {
                this.hideMenu();
            }
        },
        disabled(state, old) {
            if (state !== old && state && this.visible) {
                // Hide dropdown if disabled changes to true
                this.visible = false;
            }
        }
    },
    computed: {
        toggler() {
            return this.$refs.toggle.$el || this.$refs.toggle;
        }
    },
    destroyed() {
        if (this._popper) {
            // Ensure popper event listeners are removed cleanly
            this._popper.destroy();
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
            this.$emit("show");
            // Ensure other menus are closed
            this.emitOnRoot("bv::dropdown::shown", this);

            // If popper not installed, then fallback gracefully to dropdown only with left alignment
            if (typeof Popper === "function") {
                // Are we in a navbar ?
                if (this.inNavbar === null && this.isNav) {
                    this.inNavbar = Boolean(closest(".navbar", this.$el));
                }
                // for dropup with alignment we use the parent element as popper container
                let element = ((this.dropup && this.right) || this.split || this.inNavbar) ? this.$el : this.$refs.toggle;
                // Make sure we have a reference to an element, not a component!
                element = element.$el || element;

                // Instantiate popper.js
                this._popper = new Popper(element, this.$refs.menu, this.getPopperConfig());
            }

            this.setTouchStart(true);
            this.$emit("shown");

            // Focus on the first item on show
            this.$nextTick(this.focusFirstItem);
        },
        hideMenu() {
            // TODO: move emit hide to visible watcher, to allow cancelling of hide
            this.$emit("hide");
             if (this._popper) {
                // Ensure popper event listeners are removed cleanly
                this._popper.destroy();
            }
            this._popper = null;
            this.setTouchStart(false);
            this.emitOnRoot("bv::dropdown::hidden", this);
           this.$emit("hidden");
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
                // dropdown + right
                placement = AttachmentMap.BOTTOMEND;
            }
            const popperConfig = {
                placement,
                modifiers: {
                    offset: {
                        offset: this.offset || 0
                    },
                    flip: {
                        enabled: !this.noFlip
                    },
                    applyStyle: {
                        // Disable Popper.js for Dropdown in Navbar
                        enabled: !this.inNavbar
                    }
                }
            };
            return assign(popperConfig, this.popperOpts || {});
        },
        setTouchStart(on) {
            /*
             If this is a touch-enabled device we add extra
             empty mouseover listeners to the body's immediate children;
             only needed because of broken event delegation on iOS
             https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
             */
            if ("ontouchstart" in document.documentElement) {
                const children = arrayFrom(document.body.children);
                children.forEach(el => {
                    if (on) {
                        eventOn("mouseover", this._noop);
                    } else {
                        eventOff("mouseover", this._noop);
                    }
                });
            }
        },
        _noop() {
            // Do nothing event handler (used in touchstart event handler)
        },
        clickOutListener() {
            this.visible = false;
        },
        click(e) {
            // Calle only in split button mode, for the split button
            if (this.disabled) {
                this.visible = false;
                return;
            }

            this.$emit("click", e);
        },
        toggle() {
            // Called only by a button that toggles the menu
            if (this.disabled) {
                this.visible = false;
                return;
            }
            this.visible = !this.visible;
        },
        show() {
            // Public method to show dropdown
            if (this.disabled) {
                return;
            }
            this.visible = true;
        },
        hide() {
            // Public method to hide dropdown
            if (this.disabled) {
                return;
            }
            this.visible = false;
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
                this.$nextTick(this.focusToggler);
            }
        },
        onFocusOut(evt) {
            if (this.$refs.menu.contains(evt.relatedTarget)) {
                return;
            }
            this.visible = false;
        },
        onMouseOver(evt) {
            // Focus the item on hover
            // TODO: Special handling for inputs? Inputs are in a special .dropdown-form container
            const item = evt.target;
            if (
                item.classList.contains("dropdown-item") &&
                !item.disabled &&
                !item.classList.contains("disabled") &&
                item.focus
            ) {
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
            let el = items.find((el, i) => i === idx);
            if (el && getAttr(el, "tabindex") !== "-1") {
                el.focus();
            }
        },
        getItems() {
            // Get all items
            return filterVisible(selectAll(ITEM_SELECTOR, this.$refs.menu));
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
            let toggler = this.toggler;
            if (toggler && toggler.focus) {
                toggler.focus();
            }
        }
    }
};
