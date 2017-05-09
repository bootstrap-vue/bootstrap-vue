/*
 * Directive v-b-scrollspy
 *
 * Usage:
 *   Assume body is the scroll element, and use default offset of 10 pixels
 *   <ul v-b-scrollspy>
 *      <li><a href="#bar">Foo</a></li>
 *      <li><a href="#baz">Bar</a></li>
 *   </el>
 *
 *   Assume body is the scroll element, and use offset of 20 pixels
 *   <ul v-b-scrollspy="20">
 *      <li><a href="#bar">Foo</a></li>
 *      <li><a href="#baz">Bar</a></li>
 *   </el>
 *
 *   Element with ID #foo is the scroll element, and use default offset of 10 pixels
 *   <ul v-b-scrollspy:foo>
 *      <li><a href="#bar">Foo</a></li>
 *      <li><a href="#baz">Bar</a></li>
 *   </el>
 *
 *   #foo is the scroll element, and use offset of 20 pixels
 *   <ul v-b-scrollspy:foo="20">
 *      <li><a href="#bar">Foo</a></li>
 *      <li><a href="#baz">Bar</a></li>
 *   </el>
 *
 *   #foo is the scroll element, and use offset of 25 pixels
 *   <ul v-b-scrollspy:foo.25>
 *      <li><a href="#foo">Foo</a></li>
 *      <li><a href="#bar">Bar</a></li>
 *   </el>
 *
 *   #foo is the scroll element, and use default offset of 10 pixels
 *   <ul v-b-scrollspy="'#foo'">
 *      <li><a href="#foo">Foo</a></li>
 *      <li><a href="#bar">Bar</a></li>
 *   </el>
 *
 *   Pass object as config element can be a CSS ID, a CSS selector (i.e. body), or a node reference
 *   <ul v-b-scrollspy="{element: '#id', offset: 50}">
 *      <li><a href="#bar">Foo</a></li>
 *      <li><a href="#baz">Bar</a></li>
 *   </el>
 *
 * If scroll element is not present, then we assume scrolling on 'body'
 * If scroll element is a CSS selector, the first found element is chosen
 * if scroll element is not found, then ScrollSpy silently does nothing
 *
 * Config object properties:
 *   config = {
 *      element: <cssstring|elementref>,
 *      offset: <number>,
 *      method: <auto|position|offset>,
 *      throttle: <number>
 *   }
 *
 *  element:
 *    Element to be monitored for swcrolling. defaults to 'body'. can be an ID (#foo), a
 *    css Selector (#foo div), or a reference to an element node. If a CSS string, then
 *    the first matching element is used. if an ID is sued it must start with '#'
 *  offset:
 *    offset befor triggering active state, number of pixels. defaults to 10
 *  method:
 *    method of calculating target offets.
 *    'auto' will choose 'offset' if  scroll element is 'body', else 'position'
 *    'position' will calculate target offsets relative to the scroll contaner.
 *    'offset' will calulate the target offsets relative to the top of the window/viewport
 *    Defaults to 'auto'
 *  throttle:
 *    timeout for resize events to stop firing before recalculating offsets.
 *    defaults to 200ms
 *
 * if args/modifiers and a value (object or number) is passed, the value takes presidence over
 * the arg and modifiers
 *
 * Events:
 *  Whenever a target is activted, the event 'scrollspy::activate' is emitted on $root with the
 *  targets HREF (ID) as the argument
 */

/*
 * Pollyfill for Element.closest() for IE :(
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
 */
const inBrowser = typeof window !== 'undefined';

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

const isServer = typeof window === 'undefined';

/*
 * Utility Methods
 */

function getVm(el) {
    return el ? el.__vue__ : null;
}

function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

function isElement(obj) {
    return obj.nodeType;
}

function typeCheckConfig(componentName, config, configTypes) {
    for (const property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
            const expectedTypes = configTypes[property];
            const value = config[property];
            const valueType = value && isElement(value) ? 'element' : toType(value);

            if (!new RegExp(expectedTypes).test(valueType)) {
                console.error(
                    NAME + ': Option "' + property + '" provided type "' +
                    valueType + '" but expected type "' + expectedTypes + '"'
                );
            }
        }
    }
}

// Wrapper for Element.closest to emulate jQuery's closest (sorta)
function closest(element, selector) {
    const el = element.closest(selector);
    return el === element ? null : el;
}

/*
 * ScrollSpy Class
 */

function ScrollSpy(el, binding) {
    // The element that contains the nav-links et al
    this._element = el;
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
    // The currently active target (as an HREF id
    this._activeTarget = null;
    this._scrollHeight = 0;
    // Reference to the $root VM so we can spew events
    this._$root = null;
    // Reference to our throttled resize hanlder
    this._resizeTimeout = null;

    // Process bindings/config
    this.updateConfig(binding);
}

/*
 * ScrollSpy Public methods
 */

// Update config
ScrollSpy.prototype.updateConfig = function (binding) {
    if (binding.arg) {
        // Element ID specified as arg. We must pre-pend #
        this._config.element = '#' + binding.arg;
    }
    if (binding.modifiers.length > 0) {
        for (let i = 0; i < binding.modifiers.length - 1; i++) {
            if (/^\d+$/.test(binding.modifiers[i])) {
                // Assume offest value
                this._config.offset = parseInt(binding.modifiers[0], 10);
            } else if (/^(position|offset)$/.test(binding.modifiers[i])) {
                // Assume offset method
                this._config.method = binding.modifiers[i];
            }
        }
    }
    if (typeof binding.value === 'string') {
        // Value is  a CSS ID or selector
        this._config.element = binding.value;
    } else if (typeof binding.value === 'number') {
        // Value is offset
        this._config.offset = Math.round(binding.value);
    } else if (typeof binding.value === 'object') {
        // Value is config object
        this._config = Object.assign({}, this._config, binding.value);
    }
    // Check the config and log error to console. Unknown options are ignored
    typeCheckConfig(NAME, this._config, DefaultType);

    const vm = getVm(this._element);
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
    const navs = Array.prototype.slice.call(this._element.querySelectorAll(this._selector));

    navs.map(el => {
        const href = el.getAttribute('href');
        if (href && href.charAt(0) === '#' && href !== '#' && href.indexOf('#/') === -1) {
            const target = scroller.querySelector(href);
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
    this._element = null;
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
        return document.querySelector(scroller);
    }
    return null;
};

ScrollSpy.prototype._getScrollTop = function () {
    const scroller = this._getScroller();
    if (!scroller) {
        return 0;
    }
    return scroller.tagName === 'BODY' ? window.pageYOffset : scroller.scrollTop;
};

ScrollSpy.prototype._getScrollHeight = function () {
    const scroller = this._getScroller();
    if (!scroller) {
        return 0;
    }
    return scroller.tagName === 'BODY' ?
        Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) :
        scroller.scrollHeight;
};

ScrollSpy.prototype._getOffsetHeight = function () {
    const scroller = this._getScroller();
    if (!scroller) {
        return 0;
    }
    return scroller.tagName === 'BODY' ? window.innerHeight : scroller.getBoundingClientRect().height;
};

ScrollSpy.prototype._activate = function (target) {
    this._activeTarget = target;
    this._clear();

    let queries = this._selector.split(',');
    queries = queries.map(selector => {
        return selector + '[href="' + target + '"]';
    });

    const links = Array.prototype.slice.call(this._element.querySelectorAll(queries.join(',')));

    links.forEach(link => {
        if (link.classList.contains(ClassName.DROPDOWN_ITEM)) {
            // This is a dropdown item, so find the .dropdown-toggle and set it's state
            const dropdown = closest(link, Selector.DROPDOWN);
            if (dropdown) {
                const toggle = dropdown.querySelector(Selector.DROPDOWN_TOGGLE);
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
    if (links && links.length > 0) {
        if (this._$root && this._$root.$emit) {
            this._$root.$emit(EVENT, target);
        }
    }
};

ScrollSpy.prototype._clear = function () {
    const els = Array.prototype.slice.call(document.querySelectorAll(this._selector));
    els.filter(el => {
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
