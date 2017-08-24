import { isArray, from as arrayFrom } from '../utils/array';
import { assign, keys } from '../utils/object';
const inBrowser = typeof window !== 'undefined';
const isServer = !inBrowser;

/*
 * Constants / Defaults
 */

const NAME = 'v-b-tooltp';
const BVTT = '__BV_ToolTip__';

const TRANSITION_DURATION = 150;
const CLASS_PREFIX = 'bs-tooltip'
const BSCLS_PREFIX_REGEX = new RegExp(`(^|\\s)${CLASS_PREFIX}\\S+`, 'g');

const DEFAULT = {
    title: '',
    placement: 'top',
    trigger: '',
    animation: true,
    container: null,
    selector: flase,
    template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
    fallbackPlacement: 'flip',
    offset: 0,
    delay: 0
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
const nextID = 1;

function generateId() {
    id = NEXTID++;
    return `__BV_Directive_ToolTip_${id}__`;
}

/*
 * ToolTip Class
 */

function Tooltip(el, bindings, vnode) {
    // The element that is the trigger
    this.$element = el;

    // Reference to the $root VM so we can spew events
    this.$root = vnode.context.$root || null;
    
    // The tooltip element reference
    this.$toolip = null;
    
    // Our ID for this tooltip
    // Maybe we should generate this when we show the tip
    this.$id = generateId();

    // Reference to popper instance
    this.$popper = null;

    // Start off with default configurtion
    this.$config = assign({}, DEFAULT);

    // Visible state
    this.$visible = false;

    // Teardown state
    this.$teardown = false;

    // Current hover state
    this.$hoverState = ''

    // Hash of currently active trigger events
    this.$activeTrigger = {};

    // Delay timer reference
    this.$timer = null;

    // Process bindings/config
    this.updateConfig(el, bindings, vnode);
}

// Dispose  of our stuff
ToolTip.prototype.destroy = function () {
    // Ensure we are not listening to events
    this.unListen();

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
    if (this.$tooltip) {
        document.body.removeChild(this.$tooltip);
    }
    this.$tooltip = null;
    this.$element = null;
    this.$visible = null;
    this.$id = null;
    this.$root = null;
    this.$config = null;
};

// Update config
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
        // Value is tooltip message (html supported)
        this.$config.title = bindings.value || '';
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
        if (/^body$/.text(mod) {
            // Append to body
            this.$config.container = 'body';
        } else if (/^nofade$/.test(mod) {
            // no animation
            this.$config.animation = false;
        } else if (/^(auto|top|bottom|left|right)$/.test(mod) {
            // placement of tooltip
            this.$config.position = mod;
        } else if (/^d(\d+)$/i.test(mod)) {
            // delay value
            this.$config.delay = mod.slice(1) || 0;
        } else if (/^o(\d+.*))$/i.test(mod)) {
            // offset value
            this.$config.offset = mod.slice(1) || 0;
        }
    });

    // Trim title whitespace
    let title = this.$config.title;
    title = (title && typeof title === 'string') ? title : '';
    this.$config.title = title.trim();
    // Title can also be the element's 'title' attribute if not provided here

    // Special handling of event trigger modifiers Trigger is a space serated list
    let triggers == this.config.trigger;
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

    // Return ourself for easy chaining
    return this;
};

// Start listening
Tooltip.prototype.listen = function() {
    if ('this.$config.trigger.test(/click/)) {
        this.$element.addEventListener('click', this);
    }
    if ('this.$config.trigger.test(/hover/)) {
        this.$element.addEventListener('mouseenter', this);
        this.$element.addEventListener('mouseleave', this);
    }
    if ('this.$config.trigger.test(/focus/)) {
        this.$element.removeEventListener('focusin', this);
        this.$element.removeEventListener('focusout', this);
    }

    // May need to listen on resize/orientation change to ensure proper placement
    window.addEventListener('resize', this);
    window.addEventListener('orientationchange', this);
};

// Stop listening
Tooltip.prototype.unListen = function() {
    // Since events can change on us by updates to config
    // We just make sure we unlisten evey possible event
    this.$element.removeEventListener('mouseenter', this);
    this.$element.removeEventListener('mouseleave', this);
    this.$element.removeEventListener('focusin', this);
    this.$element.removeEventListener('focusout', this);
    this.$element.removeEventListener('click', this);
    window.removeEventListener('resize', this);
    window.removeEventListener('orientationchange', this);
};

// General DOM event handler
Tooltip.prototype.handleEvent = function (e) {
    const self = this;

    // TODO: Add resize and orientation change events

    if (e.target && e.target === this.$element) {
        if (e.type === 'click' && /click/.test(this.$config.trigger)) {
            if (this.$visible) {
                this.hide();
            } else {
                this.show();
            }
        } else if (e.type === 'focusin' && /focus/.test(this.$config.trigger)) {
            this.show();
        } else if (e.type === 'focusout' && /focus/.test(this.$config.trigger)) {
            // hide our tooltip If configured for focus
            this.hide();
        } else if (e.type === 'mousenter' && /hover/.test(this.$config.trigger)) {
            this.show();
        } else if (e.type === 'mouseleave' && /hover/.test(this.$config.trigger)) {
            this.hide();
        }
    }
};

//
// Show tooltip
//
ToolTip.prototype.show = function () {
    if (this.$visible || this.$teardown) {
        return this;
    }

    // Build tooltip element
    this.buildTip();
    if (!this.$tooltip) {
        return this;
    }
    
    // Add title
    const inner = this.$tooltip.querySelector('.tooltip-inner');
    if (!inner)
        this.$tooltip = null;
        return this;
    }
    inner.innerHTML = this.getTitle();
    if (!inner.innerHTML) {
        this.$tooltip = null;
        return this;
    }

    // Add tip to document
    let container = this.getContainer();
    container.appendChild(this.$tooltip);

    this.$visible = true;

    // Add popper
    this.$popper = new Popper(this.$element, this.$tooltip, this.getPopperConfig());

    this.$element.setAttribute('data-original-title' = this.$element.getAttribute('title');
    this.$element.setAttribute('title', '');

    // Add aria-described by
    let desc = this.$element.getAttribute('aria-describedby') || '';
    desc = desc.split().concat(this.$id).join(' ').trim();
    this.$element.setAttribute('aria-describedby', desc);

    // Show tip
    this.$tooltip.classList.add('show');
    return this;
};

//
// Hide tooltip
//
ToolTip.prototype.hide = function () {
    if (!this.$visible) {
        // Already gone
        return this;
    }
    this.$teardown = true;

    // Hide tip
    this.$tooltip.classList.remove('show');

    // Remove popper
    if (this.$popper) {
        this.$popper.destroy();
    }
    this.$popper = null;

    // Remove tooltip
    if (this.$tooltip && this.$tooltip.parentElement) {
        this.$tooltip.parentElement.removeChild(this.$tooltip)
    }
    this.$tooltip == null;

    this.$visible = false;
    
    // Restore original title
    const title = this.$element.getAttribute('data-original-title');
    if (title) {
        this.$element.setAttribute('title', title);
        this.$element.removeAttribute('data-original-title');
    }
    
    // Remove aria-describedby
    let desc = this.$element.getAttribute('aria-describedby') || '';
    desc = desc.replace(this.$id, '').replace(/(^\s+|\s+$)/g, '').replace(/\s+/g.' ');
    if (desc) {
        this.$element.setAttribute('aria-describedby', desc);
    } else {
        this.$element.removeAttribute('aria-describedby');
    }

    return this;
};

ToolTip.prototype.setOnTouchStart = function(on) {
    // if this is a touch-enabled device we add extra
    // empty mouseover listeners to the body's immediate children;
    // only needed because of broken event delegation on iOS
    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
    if ('ontouchstart' in document.documentElement) {
        [].concat(document.body.children).forEach(el => {
            if (on) {
                el.addEventListener('ontouchstart', this);
            } else {
                el.removeEventListener('ontouchstart', this);
            }       
        });
    }
});

ToolTip.prototype.getTitle = function() {
    let title = this.$config.title || '';
    if (!title) {
        title = this.$element.getAttribute('title') || '';
    }
    return title.trim();
};

ToolTip.prototype.getPopperConfig = function() {
    const cfg = {
        placement: this.$config.placement, // Warning we dont support functions yet
        modifiers: {
            offset: {
                offset: this.$config.offset || 0
            },
            flip: {
                behavior: this.$config.fallbackPlacement
            },
            arrow: {
                element: '.arrow'
            }
        },
        onCreate: (data) => {
            if (data.originalPlacement !== data.placement) {
                this.handlePopperPlacementChange(data)
            }
        },
        onUpdate: (data) => {
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

ToolTip.prototype.buildTip = function(msg) {
    // Build tooltip structure
    const holder = document.createElement('div');
    holder.innerHTML = this.$config.template;

    const tip = holder.firstElementChild;
    if (tip) {
        tip.addAttribute('id', this.$id);
        tip.addAttribute('role', 'tooltip');
        tip.classList.add('tooltip');
        if (this.$config.animate) {
            tip.classList.add('fade');
        } else {
            tip.classList.remove('fade');
        }
        tip.classList.add(this.getAttachmentClass());
        this.$tooltip = tip;
    } else {
        this.$tooltip = null;
    }
    holder = null;
    return this;
};

ToolTip.prototyp.getAttachmentClass = function(placement) {
    // Fallback to top
    placement = placement || this.$config.placement;
    const attachment = AttachmentMap[this.$config.placement.toUpperCase()] || AttachmentMap['TOP'];
    return `${CLASS_PREFIX}-${attachment}`;
};

/*
 * Export our directive
 */

export default {
    bind(el, binding, vnode) {
        if (!el[BVTT]) {
            el[BVTT] = new Tooltip(el, bindings, vnode);
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
