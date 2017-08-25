import Popper from 'popper.js';
import { assign, keys } from '../utils/object';
import { isArray, from as arrayFrom } from '../utils/array';

const NAME = 'v-b-tooltp';
const CLASS_PREFIX = 'bs-tooltip';
const BSCLS_PREFIX_REGEX = new RegExp(`\\b${CLASS_PREFIX}\\S+`, 'g');
const inBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

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
    fallbackPlacement : 'flip'
};

// Transition Event names
const TransitionEndEvents = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'otransitionend oTransitionEnd',
    transition: 'transitionend'
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
        this.$root = $root || null;
        this.updateConfig(config);
    };

    static get Default() {
        return Defaults;
    };

    static get NAME() {
        return NAME;
    }


    // Update config
    updateConfig(config) {
        // Merge config into defaults
        let updatedConfig = assign({}, ToolTip.Default, config);

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
        this.$root = null;
        this.$element = null;
        this.$config = null;
        this.$hoverState = null;
        this.$activeTrigger = null;
    };

    // What transitionend event(s) to use?
    getTransitionEndEvent() {
        for (const name in TransitionEndEvents) {
            if (this.$element.style[name] !== undefined) {
                return TransitionEndEvents[name];
            }
        }
        // fallback
        return null;
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

        // Make sure ID is set on tooltip
        tip.setAttribute('id', generateId(this.constructor.NAME));

        // Add aria-described by on trigger element, without removing any other IDs
        let desc = this.$element.getAttribute('aria-describedby') || '';
        desc = desc.split(/\s+/).concat(this.$id).join(' ').trim();
        this.$element.setAttribute('aria-describedby', desc);

        // Set tooltip content
        this.setContent(tip);

        // Handle fade/animation
        tip.classList[this.$config.animation ? 'add' : 'remove'](ClassName.FADE);

        const placement = this.getPlacement();
        const attachment = ToolTip.getAttachment(placement);
        this.addAttachmentClass(ToolTip.getAttachment(attachment));

        // Insert tooltip if needed
        let container = this.$config.container;
        container = container === false ? document.body : (document.body.querySelector(container) || document.body);
        if (!document.body.contains(this.$tip)) {
            container.appendChild(this.$tip);
        }

        // Add popper
        if (this.$popper) {
            this.$popper.destroy();
        }
        this.$popper = new Popper(this.$element, this.$tip, this.getPopperConfig(attachment));

        const transEvent = this.getTransitionEndEvent();

        // Initialize transition end handler
        let called = false; // Where is this used ?
        const complete = () => {
            called = true; // and this
            clearTimeout(this.$fadeTimeout);
            this.$fadeTimeout = null;
            if (transEvent) {
                transEvent.split(/\s+/).forEach(evt => {
                    if (evt) {
                        this.$tip.removeEventListener(evt, complete);
                    }
                }, this);
            }
            if (this.$config.animation) {
                this.fixTransition(tip);
            }
            const prevHoverState = this.$hoverState;
            this.$hoverState = null;
            if (prevHoverState === HoverState.OUT) {
                this.leave(null);
            }
        };

        // Show tip
        this.$tip.classList.add(ClassName.SHOW);
        this.setOnTouchStartListener(true);

        if (this.$tip.classList.contains(ClassName.FADE)) {
            if (transEvent) {
                transEvent.split(/\s+/).forEach(evt => {
                    if (evt) {
                        this.$tip.addEventListener(evt, complete);
                    }
                });
            }
            // Fallback to setTimeout
            this.$fadeTimeout = setTimeout(complete, TRANSITION_DURATION);
        } else {
            complete();
        }
    };

    // Hide tooltip
    hide(callback) {
        const tip = this.getTipElement();

        const transEvent = this.getTransitionEndEvent();
        let called = false;
        const complete = () => {
            called = true;
            clearTimeout(this.$fadeTimeout);
            this.$fadeTimeout = null;
            if (transEvent) {
                transEvent.split(/\s+/).forEach(evt => {
                    if (evt) {
                        this.$tip.removeEventListener(evt, complete);
                    }
                });
            }
            if (this.$hoverState !== HoverState.SHOW && tip.parentNode) {
                // Remove tip from dom (but leaves refernce in this.$tip)
                tip.parentNode.removeChild(tip);
            }

            ToolTip.cleanTipClass(tip);

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
        this.setOnTouchStartListener(false);
        tip.classList.remove(ClassName.SHOW);


        this.$activeTrigger.click = false;
        this.$activeTrigger.focus = false;
        this.$activeTrigger.hover = false;

        if (this.$tip.classList.contains(ClassName.SHOW)) {
            if (this.transEvent) {
                transEvent.split(/\s+/).forEach(evt => {
                    if (evt) {
                        this.$tip.addEventListener(evt, complete);
                    }
                });
            }
            // Fallback to setTimeout
            this.$fadeTimeout = setTimeout(complete, TRANSITION_DURATION);
        } else {
            complete();
        }

        this.$hoverState = '';
    };

    update() {
        if (this.$popper !== null) {
            this.$popper.scheduleUpdate();
        }
    };

    isWithContent() {
        return Boolean(this.getTitle());
    };

    addAttachmentClass(attachment) {
        this.getTipElement().classList.add(`${CLASS_PREFIX}-${attachment}`);
    };

    getTipElement() {
        if (!this.$tip) {
            // Try and compile user supplied template, or fallback to default template
            this.$tip = ToolTip.compileTemplate(this.$config.template) || this.compileTemplate(this.constructor.Default.template);
        }
        return this.$tip;
    };

    static compileTemplate(html) {
        if (!html || typeof html !== 'string') {
            return null;
        }
        let div = document.createElement('div');
        div.innerHTML = html.trim();
        const node = div.firstElementChild ? div.removeChild(div.firstElementChild) : null;
        div = null;
        return node;
    };

    setContent(tip) {
        this.setElementContent(tip.querySelector(Selector.TOOLTIP_INNER), this.getTitle());
        tip.classList.remove(ClassName.FADE);
        tip.classList.remove(ClassName.SHOW);
    };

    setElementContent(element, content) {
        const html = this.$config.html;
        if (typeof content === 'object' && content.nodeType) {
            // content is a DOM node
            if (html) {
                if (content.parentElement !== element) {
                    element.innerHtml = '';
                    element.appendChild(content);
                }
            } else {
                element.innerText = content.innerText;
            }
        } else {
            element[html ? 'innerHTML' : 'innerText']=content;
        }
    };

    getTitle() {
        let title = this.$config.title || '';
        if (typeof title === 'function') {
            title = title.call(this.$element).toString();
        }
        if (!title) {
            title = this.$element.getAttribute('title') || this.$element.getAttribute('data-original-title');
        }

        return title.trim();
    };

    static getAttachment(placement) {
        return AttachmentMap[placement.toUpperCase()];
    };

    listen() {
        console.log(this.$config);
        const triggers = this.$config.trigger.trim().split(/\s+/);

        // Using "this" as the hander will get automagically directed to this.handleEvent
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
    };

    unListen() {
        const events = ['click','focusin','focusout','mouseenter','mouseleave'];
        // Using "this" as the hander will get automagically directed to this.handleEvent
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
        } else if (e.type === 'focusin' || e.type === 'mousenter') {
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

    static cleanTipClass(tip) {
        const tabClass = tip.className.match(BSCLS_PREFIX_REGEX);
        if (tabClass !== null && tabClass.length > 0) {
            tip.classList.remove(tabClass.join(''));
        }
    };

    handlePopperPlacementChange(data) {
        ToolTip.cleanTipClass();
        this.addAttachmentClass(this.getAttachment(data.placement));
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
