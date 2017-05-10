const inBrowser = typeof window !== 'undefined';
const isServer = !inBrowser;

/*
 * Pollyfill for Element.closest() for IE :(
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
 */

if (inBrowser && window.Element && !Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        const matches = (this.document || this.ownerDocument).querySelectorAll(s);
        let el = this;
        let i;
        do {
            i = matches.length;
            // eslint-disable-next-line no-empty
            while (--i >= 0 && matches.item(i) !== el) {
            }
        } while ((i < 0) && (el = el.parentElement));
        return el;
    };
}

/*
 * Constants / Defaults
 */

const NAME = 'v-b-scrollspy';
const EVENT = 'scrollspy::activate';
const BVSS = '__BV_ScrollSpy__';

const Default = {
    element: 'body',
    offset: 10,
    method: 'auto',
    throttle: 200
};

const DefaultType = {
    element: '(string|element)',
    offset: 'number',
    method: 'string',
    throttle: 'number'
};

const ClassName = {
    DROPDOWN_ITEM: 'dropdown-item',
    DROPDOWN_MENU: 'dropdown-menu',
    DROPDOWN_TOGGLE: 'dropdown-toggle',
    NAV_LINK: 'nav-link',
    LIST_ITEM: 'list-group-item',
    ACTIVE: 'active'
};

const Selector = {
    ACTIVE: '.active',
    NAV_LIST_GROUP: '.nav, .list-group',
    NAV: '.nav',
    LIST_GROUP: '.list-group',
    NAV_LINKS: '.nav-link',
    LIST_ITEMS: '.list-group-item',
    DROPDOWN: '.dropdown',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
};

const OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'
};

/*
 * DOM Utility Methods
 */

function isElement(obj) {
    return obj.nodeType;
}

// Wrapper for Element.closest to emulate jQuery's closest (sorta)
function closest(element, selector) {
    const el = element.closest(selector);
    return el === element ? null : el;
}

// Query Selector All wrapper
function $QSA(selector, element) {
    if (!element) {
        element = document;
    }
    if (!isElement(element)) {
        return [];
    }
    return Array.prototype.slice.call(element.querySelectorAll(selector));
}

// Query Selector wrapper
function $QS(selector, element) {
    if (!element) {
        element = document;
    }
    if (!isElement(element)) {
        return null;
    }
    return element.querySelector(selector) || null;
}

/*
 * Utility Methods
 */

// Get Vue VM from element
function getVm(el) {
    return el ? el.__vue__ : null;
}

// Better var type detection
function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

// Check config properties for expected types
function typeCheckConfig(componentName, config, configTypes) {
    for (const property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
            const expectedTypes = configTypes[property];
            const value = config[property];
            const valueType = value && isElement(value) ? 'element' : toType(value);

            if (!new RegExp(expectedTypes).test(valueType)) {
                console.error(
                    componentName + ': Option "' + property + '" provided type "' +
                    valueType + '" but expected type "' + expectedTypes + '"'
                );
            }
        }
    }
}

/*
 * ScrollSpy Class
 */

function ScrollSpy(el, binding) {
    // The element that contains the nav-links et al
    this._$el = el;
    // The selectors to find the nav-links
    this._selector = [
        Selector.NAV_LINKS,
        Selector.LIST_ITEMS,
        Selector.DROPDOWN_ITEMS
    ].join(',');
    // Start off with default configurtion
    this._config = Object.assign({}, Default);
    // Target HREF IDs and their offsets
    this._offsets = [];
    this._targets = [];
    // The currently active target (as an HREF id)
    this._activeTarget = null;
    // Curent scroll height (for detecting document height changes)
    this._scrollHeight = 0;
    // Reference to the $root VM so we can spew events
    this._$root = null;
    // Reference to our throttled resize timeout
    this._resizeTimeout = null;

    // Process bindings/config
    this.updateConfig(binding);
}

/*
 * ScrollSpy Public methods
 */

// Update config
ScrollSpy.prototype.updateConfig = function (binding) {
    // If Argument, assume element ID
    if (binding.arg) {
        // Element ID specified as arg. We must pre-pend #
        this._config.element = '#' + binding.arg;
    }

    // Process modifiers
    Object.keys(binding.modifiers).forEach(val => {
        if (/^\d+$/.test(val)) {
            // Offest value
            this._config.offset = parseInt(val, 10);
        } else if (/^(auto|position|offset)$/.test(val)) {
            // Offset method
            this._config.method = val;
        }
    });

    // Process value
    if (typeof binding.value === 'string') {
        // Value is  a CSS ID or selector
        this._config.element = binding.value;
    } else if (typeof binding.value === 'number') {
        // Value is offset
        this._config.offset = Math.round(binding.value);
    } else if (typeof binding.value === 'object') {
        // Value is config object
        Object.keys(binding.value).filter(k => Boolean(DefaultType[k])).forEach(k => {
            this._config[k] = binding.value[k];
        });
    }

    // Check the config and log error to console. Unknown options are ignored
    typeCheckConfig(NAME, this._config, DefaultType);

    // Get Vue instance from element
    const vm = getVm(this._$el);
    if (vm && vm.$root) {
        this._$root = vm.$root;
    }

    return this;
};

// Turn on event listener
ScrollSpy.prototype.listen = function () {
    const scroller = this._getScroller();
    if (scroller) {
        if (scroller.tagName !== 'BODY') {
            scroller.addEventListener('scroll', this, false);
        }
        window.addEventListener('scroll', this, false);
        window.addEventListener('orientationchange', this, false);
        window.addEventListener('resize', this, false);
    }

    return this;
};

// Turn off event listener
ScrollSpy.prototype.unListen = function () {
    const scroller = this._getScroller();
    if (scroller) {
        if (scroller.tagName !== 'BODY') {
            scroller.removeEventListener('scroll', this, false);
        }
        window.removeEventListener('scroll', this, false);
        window.removeEventListener('orientationchange', this, false);
        window.removeEventListener('resize', this, false);
    }

    return this;
};

// Refresh the positions of the target IDs
ScrollSpy.prototype.refresh = function () {
    const scroller = this._getScroller();
    if (!scroller) {
        return this;
    }

    const autoMethod = scroller.tagName === 'BODY' ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
    const offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
    const offsetBase = offsetMethod === OffsetMethod.OFFSET ? 0 : this._getScrollTop();

    this._offsets = [];
    this._targets = [];
    this._scrollHeight = this._getScrollHeight();

    // Find all nav link/dropdown/list-item links in our element
    $QSA(this._selector, this._$el).map(el => {
        const href = el.getAttribute('href');
        if (href && href.charAt(0) === '#' && href !== '#' && href.indexOf('#/') === -1) {
            const target = $QS(href, scroller);
            if (!target) {
                return null;
            }
            const bcr = target.getBoundingClientRect();
            if (bcr.width || bcr.height) {
                return {
                    offset: (offsetMethod === OffsetMethod.OFFSET ? bcr.top : target.offsetTop) + offsetBase,
                    href
                };
            }
        }
        return null;
    }).filter(
        item => item
    ).sort(
        (a, b) => a.offset - b.offset
    ).forEach(item => {
        this._offsets.push(item.offset);
        this._targets.push(item.href);
    });

    return this;
};

// Handle the active target selection
ScrollSpy.prototype.process = function () {
    if (!this._getScroller) {
        return this;
    }
    const scrollTop = this._getScrollTop() + this._config.offset;
    const scrollHeight = this._getScrollHeight();
    const maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

    if (this._scrollHeight !== scrollHeight) {
        this.refresh();
    }

    if (scrollTop >= maxScroll) {
        const target = this._targets[this._targets.length - 1];
        if (this._activeTarget !== target) {
            this._activate(target);
        }
        return this;
    }

    if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;
        this._clear();
        return this;
    }

    for (let i = this._offsets.length; i--;) {
        const isActiveTarget =
            this._activeTarget !== this._targets[i] &&
            scrollTop >= this._offsets[i] &&
            (this._offsets[i + 1] === undefined ||
            scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
            this._activate(this._targets[i]);
        }
    }

    return this;
};

// Dispose  of our stuff
ScrollSpy.prototype.dispose = function () {
    // Ensure we are not listening to events
    this.unListen();

    // Garbage collection
    clearTimeout(this._resizeTimeout);
    this._resizeTimeout = null;
    this._$el = null;
    this._config = null;
    this._selector = null;
    this._offsets = null;
    this._targets = null;
    this._activeTarget = null;
    this._scrollHeight = null;
    this._$root = null;
};

/*
 * ScrollSpy event handler
 */

ScrollSpy.prototype.handleEvent = function (e) {
    const self = this;

    function resizeThrottle() {
        clearTimeout(this._resizeTimeout);
        this._resizeTimeout = setTimeout(() => {
            self.refresh().process();
        }, self._config.throttle || Default.throttle);
    }

    if (e.type === 'scroll') {
        this.process();
    } else if (e.type === 'orientationchange') {
        this.refresh().process();
    } else if (e.type === 'resize') {
        resizeThrottle();
    }
};

/*
 * ScrollSpy private methods
 */

// Get the srolling element
ScrollSpy.prototype._getScroller = function () {
    if (isServer) {
        return null;
    }
    const scroller = this._config.element;
    if (!scroller) {
        return null;
    }
    if (scroller && isElement(scroller)) {
        return scroller;
    } else if (typeof scroller === 'string') {
        if (scroller === 'body') {
            return document.body;
        }
        // Otherwise assume CSS selector
        return $QS(scroller);
    }
    return null;
};

// Return the scroller top position
ScrollSpy.prototype._getScrollTop = function () {
    const scroller = this._getScroller();
    if (!scroller) {
        return 0;
    }
    return scroller.tagName === 'BODY' ? window.pageYOffset : scroller.scrollTop;
};

// Return the scroller height
ScrollSpy.prototype._getScrollHeight = function () {
    const scroller = this._getScroller();
    if (!scroller) {
        return 0;
    }
    return scroller.tagName === 'BODY' ?
        Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) :
        scroller.scrollHeight;
};

// Return the scroller offset top position
ScrollSpy.prototype._getOffsetHeight = function () {
    const scroller = this._getScroller();
    if (!scroller) {
        return 0;
    }
    return scroller.tagName === 'BODY' ? window.innerHeight : scroller.getBoundingClientRect().height;
};

// Activate the scrolled in target nav-link
ScrollSpy.prototype._activate = function (target) {
    this._activeTarget = target;
    this._clear();

    let queries = this._selector.split(',');
    queries = queries.map(selector => {
        return selector + '[href="' + target + '"]';
    });

    const links = $QSA(queries.join(','), this._$el);

    links.forEach(link => {
        if (link.classList.contains(ClassName.DROPDOWN_ITEM)) {
            // This is a dropdown item, so find the .dropdown-toggle and set it's state
            const dropdown = closest(link, Selector.DROPDOWN);
            if (dropdown) {
                const toggle = $QS(Selector.DROPDOWN_TOGGLE, dropdown);
                if (toggle) {
                    this._setActiveState(toggle, true);
                }
            }
            // Also set this link's state
            this._setActiveState(link, true);
        } else {
            // Set triggered link as active
            this._setActiveState(link, true);
            // Set triggered links parents as active
            // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
            // Handle parent .nav's and .list-group's
            this._setParentsSiblingActiveState(link, Selector.NAV_LIST_GROUP, [ClassName.NAV_LINK, ClassName.LIST_ITEM], true);
        }
    });

    // Signal event to root, passing ID of target
    if (links && links.length > 0 && this._$root && this._$root.$emit) {
        this._$root.$emit(EVENT, target);
    }
};

// Clear the 'active' targets in our nav component
ScrollSpy.prototype._clear = function () {
    $QSA(this._selector, this._$el).filter(el => {
        if (el.classList.contains(ClassName.ACTIVE)) {
            const href = el.getAttribute('href');
            if (href.charAt(0) !== '#' || href.indexOf('#/') === 0) {
                return false;
            }
            return true;
        }
        return false;
    }).forEach(el => {
        this._setActiveState(el, false);
    });
};

// Set the active state. if el has a vue insatnce then try setting the active prop,
// Else fallback to adding the active class
ScrollSpy.prototype._setActiveState = function (el, state) {
    if (el) {
        if (el.classList.contains(ClassName.NAV_LINK) && !el.classList.contains(ClassName.DROPDOWN_TOGGLE)) {
            // Special case where VM with 'active' prop is on parent element
            el = el.parentElement;
        }
        const vm = getVm(el);
        if (vm && Object.prototype.hasOwnProperty.call(vm.$props, 'active')) {
            // This is a component that has an `active` prop
            vm.$props.active = state;
        } else {
            // Fallback to setting class attribute since item doesn't have an 'active' prop
            el.classList[state ? 'add' : 'remove'](ClassName.ACTIVE);
        }
    }
};

// Find all the matching parents given a CSS selector, then find previous sibling that matches the supplied classes
// And then set the active state on each immediate previous sibling of the parent(s)
ScrollSpy.prototype._setParentsSiblingActiveState = function (element, selector, classes, state) {
    if (!classes) {
        return;
    }
    if (!Array.isArray(classes)) {
        classes = [classes];
    }
    let el = element;
    while (el) {
        el = closest(el, selector);
        if (el && el.previousElementSibling) {
            for (let i = 0; i < classes.length - 1; i++) {
                if (el.previousElementSibling.classList.contains(classes[i])) {
                    this._setActiveState(el, state);
                }
            }
        }
    }
};

/*
 * Export our directive
 */

export default {
    bind(el, binding) {
        if (isServer || el[BVSS]) {
            return;
        }
        el[BVSS] = new ScrollSpy(el, binding);
    },
    inserted(el, binding) {
        if (isServer || !el[BVSS]) {
            return;
        }
        el[BVSS].updateConfig(binding).listen().refresh().process();
    },
    update(el, binding) {
        if (isServer || !el[BVSS]) {
            return;
        }
        el[BVSS].updateConfig(binding).refresh().process();
    },
    componentUpdated(el, binding) {
        if (isServer || !el[BVSS]) {
            return;
        }
        el[BVSS].updateConfig(binding).refresh().process();
    },
    unbind(el) {
        if (isServer || !el[BVSS]) {
            return;
        }
        // Remove scroll event listener on scrollElId
        el[BVSS].unListen().dispose();
        el[BVSS] = null;
    }
};
