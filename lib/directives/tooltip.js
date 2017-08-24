import Popper from 'popper.js';

import { isArray, from as arrayFrom } from '../utils/array';
import { assign, keys } from '../utils/object';
const inBrowser = typeof window !== 'undefined';
const isServer = !inBrowser;

/*
 * Constants / Defaults
 */

const NAME = 'v-b-tooltp';
const BVTT = '__BV_ToolTip__';

const TRANS_DURATION = 150;
const CLASS_PREFIX = 'bs-tooltip'
const BSCLS_PREFIX_REGEX = new RegExp(`(^|\\s)${CLASS_PREFIX}\\S+`, 'g');

const TEMPLATE = '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>';

const DEFAULT = {
    title: '',
    placement: 'top',
    trigger: '',
    animation: true,
    container: false, // signify body
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

// Client Side TIP ID counter for aria-describedby attribute
// Could use Alex's uid generator util
const NEXTID = 1000;

function generateId() {
    id = ++NEXTID;
    return `__BV_Directive_ToolTip_${id}__`;
}

/*
 * ToolTip Class
 */
Tooltip = function(el, bindings, vnode) {
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
    this.$config = assign({}, DEFAULT);

    // Current hover state
    this.$hoverState = ''

    // Hash of currently active trigger events
    this.$activeTrigger = {};

    // Delay timer reference
    this.$timer = null;
    
    // What transitionend event to use in this browser?
    this.transitionEndEvent = this.getTransisionEndEvent();

    // Process bindings/config
    this.updateConfig(el, bindings, vnode);
}

// Dispose  of our stuff
ToolTip.prototype.destroy = function () {
    // Ensure we are not listening to events
    this.unListen();
    this.setOnTouchStart(false);

    // Clera any timeout if necesary
    if (this.$timer) {
        clearTimeout(this.$timer);
    }
    this.$timer = null;
    // Hide tooltip if visible
    this.hide();

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
// What transitionend event does this browser use
//
ToolTip.prototype.getTransisionEndEvent = function() {
    if (!this.$element) {
        return null;
    }
    for (const name in TransitionEndEvents) {
        if (this.$element.style[name] !== undefined) {
            return TransitionEndEvents[name];
        }
    }
    // fallback
    return null;
};

//
// Update config
//
ToolTip.prototype.updateConfig = function (el, bindings, vnode) {
    // Arguments and modifiers take precedence over pased value object

    this.$root = this.$root || vnode.context.$root;
    
    if (this.$element !== el) {
        this.unListen()
        if (this.$visible) {
            this.listen();
        }
    }

    // Process value
    if (typeof bindings.value === 'string') {
        // Value is tooltip content (html supported)
        this.$config.title = bindings.value || '';
    } else if (typeof bindings.value === 'function') {
        // Title generator function
        this.config.title = bindings.value;
    } else if (typeof bindings.value === 'object') {
        // Value is config object, so merge
        this.$config = assign(this.$config, value);
    }

    // If Argument, assume element ID of container element
    if (bindings.arg) {
        // Element ID specified as arg. We must prepend '#'
        this.$config.container = '#' + bindings.arg;
    }

    // Process modifiers
    keys(bindings.modifiers).forEach(mod => {
        if (/^body$/.text(mod)) {
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
            this.$config.delay = mod.slice(1) || 0;
        } else if (/^o\d+.*$/.test(mod)) {
            // offset value
            this.$config.offset = mod.slice(1) || 0;
        }
    });

    // Sanitize Title
    let title = this.$config.title || '';
    if (title && typeof title === 'number') {
        title = config.title.toString();
    }
    this.$config.title = title || null;

    // Title can also be the element's 'title' attribute if not provided here

    // Special handling of event trigger modifiers Trigger is a space serated list
    let triggers = this.config.trigger;
    triggers = (trigers && typeof triggers === 'string') ? triggers : '';
    VALID_TRIGGERS.forEach(trigger => {
        if (bindings.modifiers[trigger] && !triggers.indexOf(trigger) > -1) {
            triggers = triggers.split(' ').concat(trigger).join(' ').trim();
        }
    });
    this.$config.trigger = triggers ? triggers : DEFAULT_TRIGGERS;

    // Sanitize placement
    if (!AttachmentMap[this.$config.placement.toUpperCase()]) {
        // Fallback to top placement
        this.$config.placement = 'top';
    }

    if (this.$config.delay && typeof this.$config.delay === 'number') {
        this.$config.delay = {
            show : this.$config.delay,
            hide : this.$config.delay
        }
    }

    // Is this an options update? might be a better way to do this
    this.updatePopper();
    
    // Return ourself for easy chaining
    return this;
};

// Update popper positioning
ToolTip.prototype.updatePopper = function() {
    if (this.$popper !== null) {
        this.$popper.scheduleUpdate();
    }
};

// Start listening
ToolTip.prototype.listen = function() {
    const triggers = this.config.trigger.trim().split(' ');

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
ToolTip.prototype.unListen = function() {
    // Since events can change on us by updates to config
    // We just make sure we unlisten every possible event
    this.$element.removeEventListener('mouseenter', this);
    this.$element.removeEventListener('mouseleave', this);
    this.$element.removeEventListener('focusin', this);
    this.$element.removeEventListener('focusout', this);
    this.$element.removeEventListener('click', this);
    this.setModalListener(false);
};

//
// General DOM event handler
//
Tooltip.prototype.handleEvent = function (e) {
    if (!e.target || e.target !== this.$element) {
        // If this event isn't for us, then just return
        return;
    }

    if (e.type === 'click' && /click/.test(this.$config.trigger)) {
        this.toggle(e);
    } else if (e.type === 'focusin' && /focus/.test(this.$config.trigger)) {
        this.enter(e);
    } else if (e.type === 'focusout' && /focus/.test(this.$config.trigger)) {
        this.leaev(e);
    } else if (e.type === 'mousenter' && /hover/.test(this.$config.trigger)) {
        this.enter(e);
    } else if (e.type === 'mouseleave' && /hover/.test(this.$config.trigger)) {
        this.leave(e);
    }
};

//
// Modal Listener on/off
//
ToolTip.prototype.setModalListener = function(on) {
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
ToolTip.prototype.setOnTouchStart = function(on) {
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
ToolTip.prototype.noop = function() {
    // Empty noop handler for ontouchstart devices
};

//
// Fix element title (so native tooltip doesn't show)
//
ToolTip.prototype.fixTitle = function() {
    const titleType = typeof this.element.getAttribute('data-original-title');
    if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
    }
};

//
// Tootip Entering state
//
ToolTip.prototype.enter = function(e) {
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
ToolTip.prototype.leave = function(e) {
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
// Is Tooltip is active with a handler
//
ToolTip.prototype.isWithActiveTrigger = function() {
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
ToolTip.prototype.fixTransition = function() {
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
    } else {
        if (this.getTipElement().classList.contains('show')) {
            this.$leave(null);
            return
        }
        this.enter(null);
    }
};

//
// Show tooltip
//
ToolTip.prototype.show = function () {
    const isInTheDom = document.body.contains(this.$element);
    if (!isInTheDom) {
        // IF trigger element isn';t in the  DOM then just return
        return;
    }

    if (!Boolean(this.getTitle())) {
        // Don't display if we do not have a content
        return;
    }

    // Build tooltip element
    const tip = this.getTipElement();

    // Make sure ID is set on tooltip
    tip.setAttribute('id', this.$id);

    // Add aria-described by on trigger element, without removing any other IDs
    let desc = this.$element.getAttribute('aria-describedby') || '';
    desc = desc.split().concat(this.$id).join(' ').trim();
    this.$element.setAttribute('aria-describedby', desc);

    // Set tooltip content
    this.setContent();

    // Handle fade/animation
    tip.classList[this.$config.animation ? 'add' : 'remove']('fade');
    
    const placement = this.$config.placement;
    const attachment = this.getAttachment(placement);
    this.addAttachmentClass(attachment);

    // Insert tooltip if needed
    let container = this.$config.container;
    container = container === false ? document.body : (document.querySelector(container) || document.body);
    if (!document.body.contains(this.tip)) {
        container.appendChild(tip);
    }

    // Add popper
    if (this.$popper) {
        this.$popper.destroy();
    }
    this.$popper = new Popper(this.$element, this.$tooltip, this.getPopperConfig());
    
    // Show tip
    this.$tooltip.classList.add('show');
    this.setOnTouchStart(true);
 
    // Initialize transition end handler
    let called = false;
    const complete = () => {
        called = true;
        if (this.$config.animation) {
            this.fixTransition();
        }
        const prevHoverState = this.$hoverState;
        this.$hoverState = null;
        if (prevHoverState === HoverState.OUT) {
            this.leave(null);
        }
    }

    if (this.$config.animation) {
        if (this.transitionEndEvent) {
            const events = this.transitionEndEvent.split(/\s+/);
            events.forEach(event => {
                this.$tooltip.addEventListener(event, complete);
            });
        }
        // Fallback to setTimeout
        setTimeout(complete, TRANS_DURATION);
    } else {
        complete();
    }
};


//
// Hide tooltip
//
ToolTip.prototype.hide = function(callback) {
    const tip = this.getTipElement();

    let called = false;
    const complete = () => {
        called = true;
        if (this.$hoverState !== HoverState.SHOW && tip.parentNode) {
            // Remove tip from dom
            tip.parentNode.removeChild(tip);
        }

        this.cleanTipClass();

        // Remove aria-describedby
        let desc = this.$element.getAttribute('aria-describedby') || '';
        desc = desc.replace(this.$id, '').replace(/(^\s+|\s+$)/g, '').replace(/\s+/g.' ');
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
    }

    // Hide tip
    tip.classList.remove('show');

    this.setOnTouchStart(false);
    
    this.$activeTrigger['click'] = false;
    this.$activeTrigger['focus'] = false;
    this.$activeTrigger['hover'] = false;
    
    if (this.$config.animation) {
        if (this.transitionEndEvent) {
            const events = this.transitionEndEvent.split(/\s+/);
            events.forEach(event => {
                this.$tooltip.addEventListener(event, complete);
            });
        }
        // Fallback to setTimeout
        setTimeout(complete, TRANS_DURATION);
    } else {
        complete();
    }

    this._hoverState = '';
};

ToolTip.prototype.getTitle = function() {
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

ToolTip.prototype.getPopperConfig = function() {
    const cfg = {
        placement: this.$config.placement, // Warning we dont support functions yet
        modifiers: {
            offset: { offset: this.$config.offset || 0 },
            flip: { behavior: this.$config.fallbackPlacement },
            arrow: { element: '.arrow' }
        },
        onCreate: (data) => {
            // Handle flipping arrow classes
            if (data.originalPlacement !== data.placement) {
                this.handlePopperPlacementChange(data)
            }
        },
        onUpdate: (data) => {
            // Handle flipping arrow classes
            this.handlePopperPlacementChange(data)
        }
    };
    return cfg;
};

ToolTip.prototype.handlePopperPlacementChange = function(data) {
    this.cleanTipClass();
    this.$tooltip.classList.add(this.getAttachmentClass(data.placement))
};

ToolTip.prototype.cleanTipClass = function() {
    const $tip = this.$tooltip;
    const tabClass = $tip.className.match(BSCLS_PREFIX_REGEX);
    if (tabClass !== null && tabClass.length > 0) {
        $tip.classList.remove(tabClass.join(''));
    }
};

ToolTip.prototype.getTipElement = function(msg) {
    // Build tooltip structure
    if (this.$tooltip) {
        return this.$tooltip;
    }
    const holder = document.createElement('div');
    holder.innerHTML = this.$config.template;

    const tip = holder.firstElementChild;
    if (tip) {
        tip.addAttribute('id', this.$id);
        tip.addAttribute('role', 'tooltip');
        tip.classList.add('tooltip');
        this.$tooltip = tip;
    } else {
        this.$tooltip = null;
    }
    holder = null;
    return this.$tooltip;
};

ToolTip.prototype.getAttachmentClass = function(placement) {
    // Fallback to top
    placement = placement || this.$config.placement;
    const attachment = AttachmentMap[this.$config.placement.toUpperCase()] || AttachmentMap['TOP'];
    return `${CLASS_PREFIX}-${attachment}`;
};

ToolTip.prototype.getAttachment = function(placement) {
    return AttachmentMap[placement.toUpperCase()];
};

ToolTip.prototype.addAttachmentClass = function(attachment) {
     attachment = attachment || this.$config.placemnt;
     this.getTipElement().classList.add(`${CLASS_PREFIX}-${attachment}`);
}


/*
 * Export our directive
 */

export default {
    bind(el, binding, vnode) {
        if (!el[BVTT]) {
            el[BVTT] = new ToolTip(el, bindings, vnode);
        }
    },
    inserted(el, binding, vnode) {
        if (!el[BVTT]) {
            el[BVTT] = new ToolTip(el, bindings, vnode);
        } else {
            el[BVTT].updateConfig(el, bindings, vnode);
        }
    },
    update(el, bindings, vnode) {
        if (!el[BVTT]) {
            el[BVTT] = new ToolTip(el, bindings, vnode);
        } else {
            el[BVTT].updateConfig(el, bindings, vnode);
        }
    },
    componentUpdated(el, bindings, vnode) {
        if (!el[BVTT]) {
            el[BVTT] = new ToolTip(el, binding, vnode);
        } else {
            el[BVTT].updateConfig(el, bindings, vnode);
        }
    },
    unbind(el) {
        // Remove scroll event listener on scrollElId
        el[BVTT].destroy();
        el[BVTT] = null;
        delete el[BVTT];
    }
};
