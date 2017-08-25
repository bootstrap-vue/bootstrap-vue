import Popper from 'popper.js';
import { isArray, from as arrayFrom } from '../utils/array';
import { assign, keys } from '../utils/object';
const inBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

/*
 * Constants / Defaults
 */

const NAME = 'v-b-tooltp';
const BVTT = '__BV_ToolTip__';

const TRANS_DURATION = 150;
const CLASS_PREFIX = 'bs-tooltip';
const BSCLS_PREFIX_REGEX = new RegExp(`(^|\\s)${CLASS_PREFIX}\\S+`, 'g');

const TEMPLATE = '<div class="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>';

const DEFAULT = {
    title: '',
    placement: 'top',
    // We fallback to the dfault triggers once config is loaded
    trigger: '',
    animation: true,
    // signify body
    container: false,
    template: TEMPLATE,
    fallbackPlacement: 'flip',
    offset: 0,
    delay: 0
};

const HoverState = {
    SHOW: 'show',
    OUT: 'out'
};

const DEFAULT_TRIGGER = 'hover focus';
const VALID_TRIGGERS = ['hover', 'focus', 'click'];

const AttachmentMap = {
    AUTO   : 'auto',
    TOP    : 'top',
    RIGHT  : 'right',
    BOTTOM : 'bottom',
    LEFT   : 'left'
};

// Transition Event names
const TransitionEndEvents = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'otransitionend oTransitionEnd',
    transition: 'transitionend'
};

// Return the brtowser specific transitionend event name
function getTransisionEndEvent() {
    for (const name in TransitionEndEvents) {
        if (document.body.style[name] !== undefined) {
            return TransitionEndEvents[name];
        }
    }
    // fallback
    return null;
}

// Client Side Tip ID counter for aria-describedby attribute
// Could use Alex's uid generator util
// Each tooltip requires a unique client side ID
let NEXTID = 1000;

function generateId() {
    const id = ++NEXTID;
    return `__BV_vbtooltip_${id}__`;
}

// Compile a string of HTML and return the DOM element
function compileHtml(str) {
    let div = document.createElement('div');
    div.innerHTML = String(str || '').trim();
    const node = div.firstElementChild ? div.removeChild(div.firstElementChild) : null;
    console.log(node);
    div = null;
    return node;
}

/*
 * Polyfill for Element.closest() for IE :(
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
 * ToolTip Class
 */
function ToolTip(el, bindings, vnode) {
    // The element that is the trigger
    this.$element = el;

    // Reference to the $root VM so we can spew events
    this.$root = vnode.context.$root || null;

    // The tooltip element reference
    this.$toolip = null;

    // Our ID for this tooltip
    this.$id = generateId();

    // Reference to popper instance
    this.$popper = null;

    // Start off with default configurtion
    this.$config = {};

    // Current hover state
    this.$hoverState = '';

    // Hash of currently active trigger events
    this.$activeTrigger = {};

    // Delay timer reference
    this.$timer = null;
    this.$fadetimer = null;

    // What transitionend event to use in this browser?
    this.transitionEndEvent = getTransisionEndEvent();

    // Process bindings/config
    this.updateConfig(el, bindings, vnode);
};

// Dispose  of our stuff
ToolTip.prototype.destroy = function () {
    // Ensure we are not listening to events
    this.unListen();
    this.setOnTouchStart(false);

    // Clear any timeout if necesary
    clearTimeout(this.$timer);
    this.$timer = null;
    clearTimeout(this.$fadetimer);
    this.$fadetimer = null;

    if (this.$popper) {
        this.$popper.destroy();
    }
    this.$popper = null;
    if (this.$tooltip && document.body.contains(this.$tooltip)) {
        this.$tooltip.parentElement.removeChild(this.$tooltip);
    }
    this.$tooltip = null;
    this.$element = null;
    this.$id = null;
    this.$root = null;
    this.$config = null;
};

//
// Update config
//
ToolTip.prototype.updateConfig = function (el, bindings, vnode) {
    // Arguments and modifiers take precedence over pased value object

    this.$root = this.$root || vnode.context.$root;
    this.$config = assign({}, DEFAULT);

    // Process value
    if (typeof bindings.value === 'string') {
        // Value is tooltip content (html supported)
        this.$config.title = bindings.value || '';
    } else if (typeof bindings.value === 'function') {
        // Title generator function
        this.$config.title = bindings.value;
    } else if (typeof bindings.value === 'object') {
        // Value is config object, so merge
        this.$config = assign(this.$config.value);
    }

    // If Argument, assume element ID of container element
    if (bindings.arg) {
        // Element ID specified as arg. We must prepend '#'
        this.$config.container = '#' + bindings.arg;
    }

    // Process modifiers
    keys(bindings.modifiers).forEach(mod => {
        if (/^body$/.test(mod)) {
            // Append to body
            this.$config.container = 'body';
        } else if (/^nofade$/.test(mod)) {
            // no animation
            this.$config.animation = false;
        } else if (/^(auto|top|bottom|left|right)$/.test(mod)) {
            // placement of tooltip
            this.$config.position = mod;
        } else if (/^d\d+$/.test(mod)) {
            // delay value
            this.$config.delay = parseInt(mod.slice(1), 10) || 0;
        } else if (/^o\d+$/.test(mod)) {
            // offset value
            this.$config.offset = parseInt(mod.slice(1), 10) || 0;
        }
    });

    // Sanitize Title
    let title = this.$config.title || '';
    if (title && typeof title === 'number') {
        title = this.$config.title.toString();
    }
    this.$config.title = title;
    // Title can also be the element's 'title' attribute if not provided here

    // Special handling of event trigger modifiers Trigger is a space separated list
    let triggers = this.$config.trigger;
    triggers = (triggers && typeof triggers === 'string') ? triggers : '';
    VALID_TRIGGERS.forEach(trigger => {
        if (bindings.modifiers[trigger] && !triggers.indexOf(trigger) > -1) {
            triggers = triggers.split(/\s+/).concat(trigger).join(' ').trim();
        }
    });
    this.$config.trigger = triggers || DEFAULT_TRIGGER;

    // Sanitize placement
    if (!AttachmentMap[this.$config.placement.toUpperCase()]) {
        // Fallback to top placement
        this.$config.placement = AttachmentMap.TOP;
    }

    if (this.$config.delay && typeof this.$config.delay === 'number') {
        this.$config.delay = {
            show : this.$config.delay,
            hide : this.$config.delay
        };
    }

    // Start/Restart listening
    this.unListen();
    this.listen();
};

//
// Update popper positioning
//
ToolTip.prototype.updatePopper = function () {
    if (this.$popper !== null) {
        this.$popper.scheduleUpdate();
    }
};

//
// Start listening
//
ToolTip.prototype.listen = function () {
    const triggers = this.$config.trigger.trim().split(/\s+/);

    triggers.forEach(trigger => {
        if (trigger === 'click') {
            this.$element.addEventListener('click', this);
        } else if (trigger === 'focus') {
            this.$element.addEventListener('focusin', this);
            this.$element.addEventListener('focusout', this);
        } else if (trigger === 'hover') {
            this.$element.addEventListener('mouseenter', this);
            this.$element.addEventListener('mouseleave', this);
        }
    });
    // If we are in a modal, we need to hide when it closes
    this.setModalListener(true);

    this.fixTitle();
};

// Stop listening
ToolTip.prototype.unListen = function () {
    // Since events can change on us by updates to config
    // We just make sure we unlisten every possible event
    ['mouseenter','mouseleave','focusin','focusout','click'].forEach(event => {
        this.$element.removeEventListener(event, this);
    });
    this.setModalListener(false);
};

//
// General DOM event handler
//
ToolTip.prototype.handleEvent = function (e) {
    if (!e.target || e.target !== this.$element) {
        // If this event isn't for us, then just return
        return;
    }
    if (e.type === 'click') {
        this.toggle(e);
    } else if (e.type === 'focusin' || e.type === 'mousenter') {
        this.enter(e);
    } else if (e.type === 'focusout' || e.type === 'mouseleave') {
        this.leave(e);
    }
};

//
// Modal Listener on/off
//
ToolTip.prototype.setModalListener = function (on) {
    const modal = this.$element.closest('.modal');
    if (!modal) {
        return;
    }
    // Currently modal has a span wrapper and then the root div
    const vm = modal.__vue__ || modal.parentElement.__vue__ || modal.parentElement.parentElement.__vue__;
    if (vm) {
        if (on) {
            vm.$on('hide', this.hide);
        } else {
            vm.$off('hide', this.hide);
        }
    }
};

//
// Tocustart Listeners on/off
//
ToolTip.prototype.setOnTouchStart = function (on) {
    // if this is a touch-enabled device we add extra
    // empty mouseover listeners to the body's immediate children;
    // only needed because of broken event delegation on iOS
    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
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
};

//
// Tocustart No-op listeners
//
ToolTip.prototype.noop = function () {
    // Empty noop handler for ontouchstart devices
};

//
// Fix element title (so native tooltip doesn't show)
//
ToolTip.prototype.fixTitle = function () {
    const titleType = typeof this.$element.getAttribute('data-original-title');
    if (this.$element.getAttribute('title') || titleType !== 'string') {
        this.$element.setAttribute('data-original-title', this.$element.getAttribute('title') || '');
        this.$element.setAttribute('title', '');
    }
};

//
// Tootip Entering state
//
ToolTip.prototype.enter = function (e) {
    if (e) {
        this.$activeTrigger[e.type === 'focusin' ? 'focus' : 'hover'] = true;
    }
    if (this.getTipElement().classList.contains('show') || this.$hoverState === HoverState.SHOW) {
        this.$hoverState = HoverState.SHOW;
        return;
    }
    clearTimeout(this.$timer);
    this.$hoverState = HoverState.SHOW;
    if (!this.$config.delay || !this.$config.delay.show) {
        this.show();
        return;
    }
    this.$timer = setTimeout(() => {
        if (this.$hoverState === HoverState.SHOW) {
            this.show();
        }
    }, this.$config.delay.show);
};

//
// Tootip Leaving state
//
ToolTip.prototype.leave = function (e) {
    if (e) {
        this.$activeTrigger[e.type === 'focusout' ? 'focus' : 'hover'] = false;
    }
    if (this.isWithActiveTrigger()) {
        return;
    }
    clearTimeout(this.$timer);
    this.$hoverState = HoverState.OUT;
    if (!this.$config.delay || !this.$config.delay.hide) {
        this.hide();
        return;
    }
    this.$timer = setTimeout(() => {
        if (this.$hoverState === HoverState.OUT) {
            this.hide();
        }
    }, this.$config.delay.hide);
};

//
// Is Tooltip active with a handler
//
ToolTip.prototype.isWithActiveTrigger = function () {
    for (const trigger in this.$activeTrigger) {
        if (this.$activeTrigger[trigger]) {
            return true;
        }
    }
    return false;
};

//
// Fix Transition (stop it)
//
ToolTip.prototype.fixTransition = function () {
    const tip = this.getTipElement();
    const initConfigAnimation = this.$config.animation;
    if (tip.getAttribute('x-placement') !== null) {
        return;
    }
    tip.classList.remove('fade');
    this.$config.animation = false;
    this.hide();
    this.show();
    this.$config.animation = initConfigAnimation;
};

//
// Toggle tooltip (used by click handler)
//
ToolTip.prototype.toggle = function (e) {
    if (e) {
        this.$activeTrigger.click = !this.$activeTrigger.click;

        if (this.isWithActiveTrigger()) {
            this.enter(null);
        } else {
            this.leave(null);
        }
    } else if (this.getTipElement().classList.contains('show')) {
        this.leave(null);
    } else {
        this.enter(null);
    }
};

//
// Show tooltip
//
ToolTip.prototype.show = function () {
    const isInTheDom = document.body.contains(this.$element);
    if (!isInTheDom) {
        // If trigger element isn't in the  DOM then just return
        return;
    }

    if (!this.getTitle()) {
        // Don't display if we do not have a content
        return;
    }

    // Build tooltip element (also sets this.$tooltip)
    const tip = this.getTipElement();

    // Make sure ID is set on tooltip
    tip.setAttribute('id', this.$id);
    tip.setAttribute('role', 'tooltip');

    // Add aria-described by on trigger element, without removing any other IDs
    let desc = this.$element.getAttribute('aria-describedby') || '';
    desc = desc.split(/\s+/).concat(this.$id).join(' ').trim();
    this.$element.setAttribute('aria-describedby', desc);

    tip.classList.add('tooltip');

    // Set tooltip content
    this.setContent();

    // Handle fade/animation
    tip.classList[this.$config.animation ? 'add' : 'remove']('fade');

    const placement = typeof this.$config.placement === 'function' ?
        this.$config.placement.call(this, tip, this.$element) :
        this.$config.placement;
    const attachment = this.getAttachment(placement);
    this.addAttachmentClass(attachment);

    // Insert tooltip if needed
    let container = this.$config.container;
    container = container === false ? document.body : (document.body.querySelector(container) || document.body);
    if (!document.body.contains(this.$tooltip)) {
        container.appendChild(this.$tooltip);
    }

    // Add popper
    if (this.$popper) {
        this.$popper.destroy();
    }
    this.$popper = new Popper(this.$element, this.$tooltip, this.getPopperConfig());

    // Initialize transition end handler
    let called = false;
    const complete = () => {
        called = true;
        clearTimeout(this.$fadetimer);
        this.$fadetimer = null;
        if (this.transitionEndEvent) {
            const events = this.transitionEndEvent.split(/\s+/);
            events.forEach(event => {
                this.$tooltip.removeEventListener(event, complete);
            });
        }
        if (this.$config.animation) {
            this.fixTransition();
        }
        const prevHoverState = this.$hoverState;
        this.$hoverState = null;
        if (prevHoverState === HoverState.OUT) {
            this.leave(null);
        }
    };

    // Show tip
    this.$tooltip.classList.add('show');
    this.setOnTouchStart(true);

    if (this.$tooltip.classList.contains('fade')) {
        if (this.transitionEndEvent) {
            const events = this.transitionEndEvent.split(/\s+/);
            events.forEach(event => {
                this.$tooltip.addEventListener(event, complete);
            });
        }
        // Fallback to setTimeout
        this.$fadetimer = setTimeout(complete, TRANS_DURATION);
    } else {
        complete();
    }
};

//
// Hide tooltip
//
ToolTip.prototype.hide = function (callback) {
    const tip = this.getTipElement();
    let called = false;
    const complete = () => {
        called = true;
        clearTimeout(this.$fadetimer);
        this.$fadetimer = null;
        if (this.transitionEndEvent) {
            const events = this.transitionEndEvent.split(/\s+/);
            events.forEach(event => {
                this.$tooltip.removeEventListener(event, complete);
            });
        }
        if (this.$hoverState !== HoverState.SHOW && tip.parentNode) {
            // Remove tip from dom (but leaves refernce in this.$tooltip)
            tip.parentNode.removeChild(tip);
        }

        this.cleanTipClass();

        // Remove aria-describedby
        let desc = this.$element.getAttribute('aria-describedby') || '';
        desc = desc.replace(this.$id, '').replace(/\s+/g,' ').trim();
        if (desc) {
            this.$element.setAttribute('aria-describedby', desc);
        } else {
            this.$element.removeAttribute('aria-describedby');
        }

        if (this.$popper) {
            this.$popper.destroy();
        }
        this.$popper = null;

        if (callback) {
            callback();
        }
    };

    // Hide tip
    this.setOnTouchStart(false);
    tip.classList.remove('show');

    this.$activeTrigger.click = false;
    this.$activeTrigger.focus = false;
    this.$activeTrigger.hover = false;

    if (this.$config.animation) {
        if (this.transitionEndEvent) {
            const events = this.transitionEndEvent.split(/\s+/);
            events.forEach(event => {
                this.$tooltip.addEventListener(event, complete);
            });
        }
        // Fallback to setTimeout
        this.$fadetimer = setTimeout(complete, TRANS_DURATION);
    } else {
        complete();
    }

    this.$hoverState = '';
};

//
// Add the attachment class to the tooltip
//
ToolTip.prototype.addAttachmentClass = function (attachment) {
    this.getTipElement().classList.add(`${CLASS_PREFIX}-${attachment}`);
};

//
// Return the tooltip element, or create and save if necessary
//
ToolTip.prototype.getTipElement = function (msg) {
    // Build tooltip structure
    this.$tooltip = this.$tooltip || compileHtml(this.$config.template) || compileHtml(TEMPLATE);
    return this.$tooltip;
};

//
// Set the inner HTML of the tooltip
//
ToolTip.prototype.setContent = function () {
    const tip = this.getTipElement();
    const inner = this.$tooltip.querySelector('.tooltiip-inner');
    if (inner) {
        inner.innerHTML = this.getTitle();
    }
    tip.classList.remove('fade');
    tip.classList.remove('show');
};

//
// Get the content (title) for the tooltip
//
ToolTip.prototype.getTitle = function () {
    let title = this.$config.title || '';
    if (typeof title === 'function') {
        title = title.call(this.$element);
    }
    if (!title) {
        title = this.$element.getAttribute('title') || '';
    }
    if (!title) {
        title = this.$element.getAttribute('data-original-title') || '';
    }
    return title.trim();
};

//
// Get/sanitize attachment positin (fallback to top)
//
ToolTip.prototype.getAttachment = function (placement) {
    return AttachmentMap[placement.toUpperCase()] || AttachmentMap.TOP;
};

//
// Compute and return Popper.js config
//
ToolTip.prototype.getPopperConfig = function () {
    return {
        // NOTE: we dont support functions for placement yet
        placement: this.getAttachment(this.$config.placement),
        modifiers: {
            offset: { offset: this.$config.offset || 0 },
            flip: { behavior: this.$config.fallbackPlacement },
            arrow: { element: '.arrow' }
        },
        onCreate: data => {
            // Handle flipping arrow classes
            if (data.originalPlacement !== data.placement) {
                this.handlePopperPlacementChange(data);
            }
        },
        onUpdate: data => {
            // Handle flipping arrow classes
            this.handlePopperPlacementChange(data);
        }
    };
};

//
// Remove any bs-tooltip-* classes from tooltip
//
ToolTip.prototype.cleanTipClass = function () {
    const tip = this.getTipElement();
    const tabClass = tip.className.match(BSCLS_PREFIX_REGEX);
    if (tabClass !== null && tabClass.length > 0) {
        tip.classList.remove(tabClass.join(''));
    }
};

//
// Popper callback for adjusting the attachment class on the tooltip
//
ToolTip.prototype.handlePopperPlacementChange = function (data) {
    this.cleanTipClass();
    this.addAttachmentClass(this.getAttachment(data.placement));
};

//
// Add or Update tooltip on our element
//
function applyBVTT(el, bindings, vnode) {
    if (!inBrowser) {
        return;
    }
    if (!Popper) {
        // Popper is required for tooltips to work
        return;
    }
    if (el[BVTT]) {
        el[BVTT].updateConfig(el, bindings, vnode);
    } else {
        el[BVTT] = new ToolTip(el, bindings, vnode);
    }
};

//
// Add or Update tooltip on our element
//
function removeBVTT(el) {
    if (!inBrowser) {
        return;
    }
    if (el[BVTT]) {
        el[BVTT].destroy();
        el[BVTT] = null;
    }
};

/*
 * Export our directive
 */
export default {
    bind(el, bindings, vnode) {
        applyBVTT(el, bindings, vnode);
    },
    inserted(el, bindings, vnode) {
        applyBVTT(el, bindings, vnode);
    },
    update(el, bindings, vnode) {
        applyBVTT(el, bindings, vnode);
    },
    componentUpdated(el, bindings, vnode) {
        applyBVTT(el, bindings, vnode);
    },
    unbind(el) {
        removeBVTT(el);
    }
};
