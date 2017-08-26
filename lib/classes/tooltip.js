import Popper from 'popper.js';
import { assign } from '../utils/object';
import { from as arrayFrom } from '../utils/array';
import BvEvent from '../utils/BvEvent';

const inBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

const NAME = 'v-b-tooltp';
const CLASS_PREFIX = 'bs-tooltip';
const BSCLS_PREFIX_REGEX = new RegExp(`\\b${CLASS_PREFIX}\\S+`, 'g');

const TRANSITION_DURATION = 150;

// Modal $root event
const MODAL_CLOSE_EVENT = 'hidden::modal';
const MODAL_CLASS = '.modal';

const AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
};

const HoverState = {
    SHOW : 'show',
    OUT  : 'out'
};

const ClassName = {
    FADE : 'fade',
    SHOW : 'show'
};

const Selector = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner',
    ARROW: '.arrow'
};

const Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'
};

const Defaults = {
    animation : true,
    template: '<div class="tooltip" role="tooltip">' +
              '<div class="arrow"></div>' +
              '<div class="tooltip-inner"></div>' +
              '</div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip',
    calbacks: {}
};

// Transition Event names
const TransitionEndEvents = {
    WebkitTransition: ['webkitTransitionEnd'],
    MozTransition: ['transitionend'],
    OTransition: ['otransitionend', 'oTransitionEnd'],
    transition: ['transitionend']
};

// Client Side Tip ID counter for aria-describedby attribute
// Could use Alex's uid generator util
// Each tooltip requires a unique client side ID
let NEXTID = 1;
const generateId = name => `__BV_${name}_${NEXTID++}__`;

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
 * ToolTip Class definition
 */
class ToolTip {

    // Main constructor
    constructor(element, config, $root) {
        // New tooltip object
        this.$fadeTimeout = null;
        this.$hoverTimeout = null;
        this.$hoverState = '';
        this.$activeTrigger = {};
        this.$popper = null;
        this.$element = element;
        this.$tip = null;
        this.$id = generateId(this.constructor.NAME);
        this.$root = $root || null;
        this.updateConfig(config);
    };

    // NOTE: Overridden by PopOver class
    static get Default() {
        return Defaults;
    };

    // NOTE: Overridden by PopOver class
    static get NAME() {
        return NAME;
    }

    // Update config
    updateConfig(config) {
        // Merge config into defaults. We use "this" here because PopOver overrides Default
        let updatedConfig = assign({}, this.constructor.Default, config);

        // Sanitize delay
        if (config.delay && typeof config.delay === 'number') {
            updatedConfig.delay = {
                show : config.delay,
                hide : config.delay
            };
        }

        // Title for tooltip and popover
        if (config.title && typeof config.title === 'number') {
            updatedConfig.title = config.title.toString();
        }

        // Content only for popover
        if (config.content && typeof config.content === 'number') {
            updatedConfig.content = config.content.toString();
        }

        this.$config = updatedConfig;
        // Stop/Restart listening
        this.unListen();
        this.listen();
    };

    // Destroy this instance
    destroy() {
        clearTimeout(this.$hoverTimeout);
        this.$hoverTimeout = null;
        clearTimeout(this.$fadeTimeout);
        this.$fadeTimeout = null;
        this.unListen();
        this.setOnTouchStartListener(false);
        if (this.$popper) {
            this.$popper.destroy();
        }
        this.$popper = null;
        if (this.$tip && this.$tip.parentElement) {
            this.$tip.parentElement.removeChild(this.$tip);
        }
        this.$tip = null;
        this.$id = null
        this.$root = null;
        this.$element = null;
        this.$config = null;
        this.$hoverState = null;
        this.$activeTrigger = null;
    };

    // Click toggler
    toggle(event) {
        if (event) {
            this.$activeTrigger.click = !this.$activeTrigger.click;

            if (this.isWithActiveTrigger()) {
                this.enter(null);
            } else {
                this.leave(null);
            }
        } else {
            if (this.getTipElement().classList.contains(ClassName.SHOW)) {
                this.leave(null);
            } else {
                this.enter(null);
            }
        }
    };

    // Show tooltip
    show() {
        if (!document.body.contains(this.$element) || !this.isWithContent()) {
            // If trigger element isn't in the DOM
            // or
            // if we do not have content
            return;
        }

        // Build tooltip element (also sets this.$tip)
        const tip = this.getTipElement();
        tip.setAttribute('id', this.$id);
        this.addAriaDescribedby();
        this.setContent(tip);
        tip.classList[this.$config.animation ? 'add' : 'remove'](ClassName.FADE);

        const placement = this.getPlacement();
        const attachment = this.constructor.getAttachment(placement);
        this.addAttachmentClass(this.constructor.getAttachment(attachment));

        // Create a canelable BvEvent
        const showEvt = new BvEvent('show', {
            cancelable: true,
            target: this.$element,
            relatedTarget: tip
        });
        this.handleCallback('show', showEvt);
        if (showEvt.defaultPrevented) {
            // Don't show if event cancelled
            return;
        }

        // Insert tooltip if needed
        const container = this.getContainer();
        if (!document.body.contains(tip)) {
            container.appendChild(tip);
        }

        // Refresh popper
        this.removePopper();
        this.$popper = new Popper(this.$element, tip, this.getPopperConfig(attachment));

        // Transitionend Callback
        const complete = () => {
            if (this.$config.animation) {
                this.fixTransition(tip);
            }
            const prevHoverState = this.$hoverState;
            this.$hoverState = null;
            if (prevHoverState === HoverState.OUT) {
                this.leave(null);
            }
            this.handleCallback('shown');
        };

        // Show tip
        tip.classList.add(ClassName.SHOW);
        this.setOnTouchStartListener(true);

        this.transitionOnce(tip, complete);
    };

    // Hide tooltip
    hide(callback) {
        const tip = this.getTipElement();

        // Create a canelable BvEvent
        const hideEvt = new BvEvent('hide', {
            cancelable: true,
            target: this.$element,
            relatedTarget: tip
        });
        this.handleCallback('hide', hideEvt);
        if (hideEvt.defaultPrevented) {
            // Don't hide if event cancelled
            return;
        }

        // Transitionend Callback
        const complete = () => {
            if (this.$hoverState !== HoverState.SHOW && tip.parentNode) {
                // Remove tip from dom (but leaves reference in this.$tip)
                tip.parentNode.removeChild(tip);
            }
            this.removeAriaDescribedby();
            this.removePopper();
            // Force a re-compile of tip in case template has changed.
            this.$tip = null;
            if (callback) {
                callback();
            }
            this.handleCallback('hidden');
        };

        // Hide tip
        this.setOnTouchStartListener(false);
        tip.classList.remove(ClassName.SHOW);

        this.$activeTrigger.click = false;
        this.$activeTrigger.focus = false;
        this.$activeTrigger.hover = false;

        this.transitionOnce(tip, complete);

        this.$hoverState = '';
    };

    handleCallback (evtName, evt) {
        const callbacks = this.$config.callbacks || {};
        if (callbacks[evtName] === 'function') {
            callbacks[evtName](evt);
        }
    };

    getContainer () {
        const container = this.$config.container;
        const body = document.body;
        return container === false ? body : (body.querySelector(container) || body);
    };

    addAriaDescribedby() {
        // Add aria-describedby on trigger element, without removing any other IDs
        let desc = this.$element.getAttribute('aria-describedby') || '';
        desc = desc.split(/\s+/).concat(this.$id).join(' ').trim();
        this.$element.setAttribute('aria-describedby', desc);
    };

    removeAriaDescribedby() {
        let desc = this.$element.getAttribute('aria-describedby') || '';
        desc = desc.replace(this.$id, '').replace(/\s+/g,' ').trim();
        if (desc) {
            this.$element.setAttribute('aria-describedby', desc);
        } else {
            this.$element.removeAttribute('aria-describedby');
        }
    };
    
    removePopper() {
        if (this.$popper) {
            this.$popper.destroy();
        }
        this.$popper = null;
    };

    transitionOnce (tip, complete) {
        const transEvents = this.getTransitionEndEvents();
        let called = false;
        clearTimeout(this.$fadeTimeout);
        this.$fadeTimeout = null;
        const fnOnce = () => {
            if (called) { return; }
            called = true;
            clearTimeout(this.$fadeTimeout);
            this.$fadeTimeout = null;
            transEvents.forEach(evtName => {
                tip.removeEventListener(evtName, fnOnce);
            });
            // Call complete callback
            complete();
        };
        if (tip.classList.contains(ClassName.FADE)) {
            transEvents.forEach(evtName => {
                this.$tip.addEventListener(evtName, fnOnce);
            });
            // Fallback to setTimeout
            this.$fadeTimeout = setTimeout(fnOnce, TRANSITION_DURATION);
        } else {
            fnOnce();
        }
    };

    // What transitionend event(s) to use? (returns array of event names)
    getTransitionEndEvents() {
        for (const name in TransitionEndEvents) {
            if (this.$element.style[name] !== undefined) {
                return TransitionEndEvents[name];
            }
        }
        // fallback
        return [];
    };

    update() {
        if (this.$popper !== null) {
            this.$popper.scheduleUpdate();
        }
    };

    // NOTE: Overridden by PopOver class
    isWithContent() {
        return Boolean(this.getTitle());
    };

    // NOTE: Overridden by PopOver class
    addAttachmentClass(attachment) {
        this.getTipElement().classList.add(`${CLASS_PREFIX}-${attachment}`);
    };

    getTipElement() {
        if (!this.$tip) {
            // Try and compile user supplied template, or fallback to default template
            this.$tip = this.compileTemplate(this.$config.template) || this.compileTemplate(this.constructor.Default.template);
        }
        return this.$tip;
    };

    compileTemplate(html) {
        if (!html || typeof html !== 'string') {
            return null;
        }
        let div = document.createElement('div');
        div.innerHTML = html.trim();
        const node = div.firstElementChild ? div.removeChild(div.firstElementChild) : null;
        div = null;
        return node;
    };

    // NOTE: Overridden by PopOver class
    setContent(tip) {
        this.setElementContent(tip.querySelector(Selector.TOOLTIP_INNER), this.getTitle());
        tip.classList.remove(ClassName.FADE);
        tip.classList.remove(ClassName.SHOW);
    };

    setElementContent(container, content) {
        if (!container) {
            // If container element doesn't exist, just return
            return;
        }
        const allowHtml = this.$config.html;
        if (typeof content === 'object' && content.nodeType) {
            // content is a DOM node
            if (allowHtml) {
                if (content.parentElement !== container) {
                    container.innerHtml = '';
                    container.appendChild(content);
                }
            } else {
                container.innerText = content.innerText;
            }
        } else {
            // We have a plain HTML string or Text
            container[allowHtml ? 'innerHTML' : 'innerText'] = content;
        }
    };

    // NOTE: Overridden by PopOver class
    getTitle() {
        let title = this.$config.title || '';
        if (typeof title === 'function') {
            title = title.call(this.$element).toString().trim();
        }
        if (typeof title === 'object' && title.nodeType && !title.innerHTML.trim()) {
            // We have a DOM node, but without inner content, so just return empty string
            title = '';
        }
        if (!title) {
            // If an explicit title is not given, try element's title atributes
            title = this.$element.getAttribute('title') || this.$element.getAttribute('data-original-title') || '';
            title = title.trim();
        }

        return title;
    };

    static getAttachment(placement) {
        return AttachmentMap[placement.toUpperCase()];
    };

    listen() {
        const triggers = this.$config.trigger.trim().split(/\s+/);

        // Using "this" as the handler will get automagically directed to this.handleEvent
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
        }, this);
        // If we are in a modal, we need to hide when it closes
        this.setModalListener(true);
    };

    unListen() {
        const events = ['click','focusin','focusout','mouseenter','mouseleave'];
        // Using "this" as the handler will get automagically directed to this.handleEvent
        events.forEach(evt => {
            this.$element.removeEventListener(evt, this);
        }, this);
        this.setModalListener(false);
    };

    handleEvent(e) {
        // This special method allows us to use "this" as the event handlers
        if (!e.target || e.target !== this.$element) {
            // If this event isn't for us, then just return
            return;
        }
        if (e.type === 'click') {
            this.toggle(e);
        } else if (e.type === 'focusin' || e.type === 'mouseenter') {
            this.enter(e);
        } else if (e.type === 'focusout' || e.type === 'mouseleave') {
            this.leave(e);
        }
    };

    setModalListener(on) {
        const modal = this.$element.closest(MODAL_CLASS);
        if (!modal) {
            // If we are not in a modal, don't worry. be happy
             return;
        }
        // We can listen for modal hidden events on $root
        if (this.$root) {
            if (on) {
                this.$root.$on(MODAL_CLOSE_EVENT, this.hide);
            } else {
                this.$root.$off(MODAL_CLOSE_EVENT, this.hide);
            }
        }
    };

    setOnTouchStartListener(on) {
        // if this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
        if ('ontouchstart' in document.documentElement) {
            arrayFrom(document.body.children).forEach(el => {
                if (on) {
                    el.addEventListener('mouseover', this.noop);
                } else {
                    el.removeEventListener('mouseover', this.noop);
                }
            });
        }
    };

    noop() {
        // Empty noop handler for ontouchstart devices
    };

    fixTitle() {
        const titleType = typeof this.$element.getAttribute('data-original-title');
        if (this.$element.getAttribute('title') || titleType !== 'string') {
            this.$element.setAttribute('data-original-title', this.$element.getAttribute('title') || '');
            this.$element.setAttribute('title', '');
        }
    };

    // Enter handler
    enter(e) {
        if (e) {
            this.$activeTrigger[e.type === 'focusin' ? 'focus' : 'hover'] = true;
        }
        if (this.getTipElement().classList.contains(ClassName.SHOW) || this.$hoverState === HoverState.SHOW) {
            this.$hoverState = HoverState.SHOW;
            return;
        }
        clearTimeout(this.$hoverTimeout);
        this.$hoverState = HoverState.SHOW;
        if (!this.$config.delay || !this.$config.delay.show) {
            this.show();
            return;
        }
        this.$hoverTimeout = setTimeout(() => {
            if (this.$hoverState === HoverState.SHOW) {
                this.show();
            }
        }, this.$config.delay.show);

    };

    // Leave handler
    leave(e) {
        if (e) {
            this.$activeTrigger[e.type === 'focusout' ? 'focus' : 'hover'] = false;
        }
        if (this.isWithActiveTrigger()) {
            return;
        }
        clearTimeout(this.$hoverTimeout);
        this.$hoverState = HoverState.OUT;
        if (!this.$config.delay || !this.$config.delay.hide) {
            this.hide();
            return;
        }
        this.$hoverTimeout = setTimeout(() => {
            if (this.$hoverState === HoverState.OUT) {
                this.hide();
            }
        }, this.$config.delay.hide);
    };

    getPopperConfig(attachment) {
        return {
            placement: attachment,
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

    getPlacement() {
        const placement = this.$config.placement;
        if (typeof placement === 'function') {
            return placement.call(this, this.$tip, this.$element);
        }
        return placement;
    };

    isWithActiveTrigger() {
        for (const trigger in this.$activeTrigger) {
            if (this.$activeTrigger[trigger]) {
                return true;
            }
        }
        return false;
    };

    // NOTE: Overridden by PopOver class
    cleanTipClass() {
        const tip = this.getTipElement();
        const tabClass = tip.className.match(BSCLS_PREFIX_REGEX);
        if (tabClass !== null && tabClass.length > 0) {
            tabClass.forEach(cls => {
                tip.classList.remove(cls);
            });
        }
    };

    handlePopperPlacementChange(data) {
        this.cleanTipClass();
        this.addAttachmentClass(this.constructor.getAttachment(data.placement));
    };

    fixTransition(tip) {
        const initConfigAnimation = this.$config.animation;
        if (tip.getAttribute('x-placement') !== null) {
            return;
        }
        tip.classList.remove(ClassName.FADE);
        this.$config.animation = false;
        this.hide();
        this.show();
        this.config.animation = initConfigAnimation;
    };

};

export default ToolTip;
