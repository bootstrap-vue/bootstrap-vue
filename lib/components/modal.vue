<template>
    <div>
        <transition enter-class=""
                    enter-active-class=""
                    enter-to-class=""
                    @before-enter="onBeforeEnter"
                    @after-enter="onAfterEnter"
                    leave-class=""
                    leave-active-class=""
                    leave-to-class=""
                    :duration="noFade ? 0 : 300"
                    :css="false"
                    @before-leave="onBeforeLeave"
                    @after-leave="onAfterLeave"
        >
            <div :class="['modal',{fade: !noFade, show: isShowing}]"
                 :id="modalId"
                 role="dialog"
                 ref="modal"
                 key="modal"
                 :style="modalStyle"
                 v-show="isShowing"
                 :aria-hidden="isShowing ? 'false' : 'true'"
                 @click="onClickOut"
                 @keyup.esc="onEsc"
            >

                <div :class="['modal-dialog',`modal-${size}`]">
                    <div class="modal-content"
                         tabindex="-1"
                         role="document"
                         ref="content"
                         :aria-labelledby="hideHeader ? null : headerId"
                         :aria-describedby="bodyId"
                         @click.stop
                    >

                        <header class="modal-header"
                                ref="header"
                                :id="headerId"
                                v-if="!hideHeader"
                        >
                            <slot name="modal-header">
                                <h5 :is="titleTag" class="modal-title">
                                    <slot name="modal-title">{{title}}</slot>
                                </h5>
                                <button type="button"
                                        v-if="!hideHeaderClose"
                                        class="close"
                                        :aria-label="headerCloseLabel"
                                        @click="hide"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </slot>
                        </header>

                        <div class="modal-body" ref="body" :id="bodyId">
                            <slot></slot>
                        </div>

                        <footer class="modal-footer" ref="footer" v-if="!hideFooter">
                            <slot name="modal-footer">
                                <b-btn v-if="!okOnly"
                                       variant="secondary"
                                       :size="buttonSize"
                                       @click="hide(false)"
                                ><slot name="modal-cancel">{{ closeTitle }}</slot></b-btn>
                                <b-btn variant="primary"
                                       :size="buttonSize"
                                       :disabled="okDisabled"
                                       @click="hide(true)"
                                ><slot name="modal-ok">{{ okTitle }}</slot></b-btn>
                            </slot>
                        </footer>

                    </div>
                </div>
            </div>
        </transition>

        <div key="modal-backdrop"
             :class="['modal-backdrop',{fade: !noFade, show: (is_visible || isTransitioning)}]"
             v-if="isShowing && !noBackdrop"
        ></div>
    </div>
</template>

<script>
    import bBtn from './button';
    import { BvEvent } from '../classes';
    import { listenOnRootMixin } from '../mixins';
    import { from as arrayFrom } from '../utils/array'

    const ClassName = {
        SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
        OPEN: 'modal-open'
    }

    const Selector = {
        FIXED_CONTENT: '.fixed-top,.fixed-bottom,.is-fixed,.sticky-top',
        NAVBAR_TOGGLER: '.navbar-toggler'
    }

    const ON = true;
    const OFF = false;

    // Types of elements that we can focus
    const FOCUS_SELECTOR = [
        `[autofocus]:not([disabled]):not(.disabled)`,
        'button:not([disabled])',
        '.btn:not([disabled]):not(.disabled)',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'a:not([disabled]):not(.disabled)',
        '[tabindex]:not([disabled]):not(.disabled)'
    ].join(',');

    // Measure the scrollbar width
    function getScrollbarWidth() {
        if (typeof document === 'undefined') {
            return 0;
        }
        const scrollDiv = document.createElement('div');
        scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
        document.body.appendChild(scrollDiv);
        const scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
    }

    // Determine if an HTML element is visible - Faster than CSS check
    function isVisible(el) {
        return el && (el.offsetWidth > 0 || el.offsetHeight > 0);
    }

    // Find the first visible element contained in a given root element
    function findFirstVisible(root, selector) {
        if (!root || !root.querySelectorAll || !selector) {
            return null;
        }
        let els = arrayFrom(root.querySelectorAll(selector));

        // IE 10 & 11 do not support native array.find()
        // So we try native find first, then fall back to a loop
        let el = els.find ? els.find(el => isVisible(el)) : null;
        for (let i = 0; !el && i < els.length; i++) {
            if (isVisible(els[i])) {
                el = els[i];
            }
        }
        return el;
    }

    export default {
        mixins: [listenOnRootMixin],
        components: {bBtn},
        data() {
            return {
                is_visible: false,
                return_focus: this.returnFocus || null,
                // Body and scrollbar information
                scrollbarWidth: 0,
                isBodyOverflowing: false,
                originalBodyPadding: '',
                paddingLeft: 0,
                paddingRight: 0,
                // Transitioning flags
                isEntering: false,
                isLeaving: false,
                isShown: false
            };
        },
        model: {
            prop: 'visible',
            event: 'change'
        },
        computed: {
            modalId() {
                return this.id ? this.id : null;
            },
            bodyId() {
                return this.id ? `${this.id}__BV_modal_body_`: null;
            },
            headerId() {
                return this.id ? `${this.id}__BV_modal_header_`: null;
            },
            isTransitioning() {
                return this.isLeaving || this.isEntering;
            },
            isShowing() {
                return !this.isTransitioning && (this.isShown || this.is_visible);
            },
            modalStyle() {
                return {
                    paddingLeft: `${this.paddingLeft}px`,
                    paddingRight: `${this.paddingRight}px`,
                    display: this.isShowing? 'block' : 'none'
                };
            }
        },
        watch: {
            visible(new_val, old_val) {
                if (new_val === old_val) {
                    return;
                }
                return newVal ? this.show() : this.hide();
            }
        },
        props: {
            id: {
                type: String,
                default: null
            },
            title: {
                type: String,
                default: ''
            },
            titleTag: {
                type: String,
                default: 'h5'
            },
            size: {
                type: String,
                default: 'md'
            },
            buttonSize: {
                type: String,
                default: ''
            },
            noFade: {
                type: Boolean,
                default: false
            },
            noCloseOnBackdrop: {
                type: Boolean,
                default: false
            },
            noCloseOnEsc: {
                type: Boolean,
                default: false
            },
            noAutoFocus: {
                type: Boolean,
                default: false
            },
            noEnforceFocus: {
                type: Boolean,
                default: false
            },
            hideHeader: {
                type: Boolean,
                default: false
            },
            hideFooter: {
                type: Boolean,
                default: false
            },
            hideHeaderClose: {
                type: Boolean,
                default: false
            },
            noBackdrop: {
                type: Boolean,
                default: false
            },
            okOnly: {
                type: Boolean,
                default: false
            },
            okDisabled: {
                type: Boolean,
                default: false
            },
            visible: {
                type: Boolean,
                default: false
            },
            returnFocus: {
                default: null
            },
            headerCloseLabel: {
                type: String,
                default: 'Close'
            },
            closeTitle: {
                type: String,
                default: 'Close'
            },
            okTitle: {
                type: String,
                default: 'OK'
            }
        },
        methods: {
            show() {
                if (this.is_visible || typeof document === 'undefined') {
                    return;
                }

                const hideEvent = new BvEvent('show', {
                    cancelable: true,
                    target: this.$refs.modal,
                    relatedTarget: null,
                    vueTarget: this
                });
                // TODO: Handle cancelation
                this.$emit('show', showEvent);

                this.$root.$emit('bv::modal::shown', this.id || this);
                this.$emit('change', true);

                this.is_visible = true;

                if (this.noFade) {
                    // If no fade animation, then triger events ourselves
                    this.onBeforeEnter();
                    this.onAfterEnter();
                }

            },
            hide(isOK) {
                // TODO: use a delegated event listener on the footer
                // and use data attribute to signal which button was pressed 
                // which we include in the isOK (or renamed to button)
                // variable in the BvEvent (and pass button as relatedTarget)
                // This way, users can create their own buttons
                if (!this.is_visible || typeof document === 'undefined') {
                    return;
                }

                // Create event object
                const hideEvent = new BvEvent('hide', {
                    cancelable: true,
                    target: this.$refs.modal,
                    vueTarget: this,
                    relatedTarget: null, // to-do, ref of button
                    isOK: isOK
                });

                // Emit events
                if (isOK === true) (
                    this.$emit('ok', hideEvent);
                } else if (isOK === false) {
                    this.$emit('cancel', hideEvent);
                }
                this.$emit('hide', hideEvent);

                // Hide if not canceled
                if (!hideEvent.defaultPrevented) {
                    this.is_visible = false;
                    if (this.noFade) {
                        // Trigger event handler manually
                        this.beforeLeave();
                        this.afterLeave();
                    }
                    this.$emit('change', false);
                    this.$emit('hidden');
                    this.$root.$emit('bv::modal::hidden', this.id || this);
                } else {
                    this.$emit('change', true):
                }
            },
            onClickOut(e) {
                // If backdrop clicked, hide modal
                if (this.is_visible && !this.noCloseOnBackdrop) {
                    this.hide();
                }
            },
            onEsc(e) {
                // If ESC pressed, hide modal
                // TODO: Move @ event to root div
                if (this.is_visible && !this.noCloseOnEsc) {
                    this.hide();
                }
            },
            onBeforeEnter(el) {
                this.isBodyOverflowing = document.body.clientWidth < window.innerWidth;
                this.isEntering = true;
                this.setScrollBar();
                document.body.classList.add(ClassName.OPEN);
            },
            onAfterEnter(el) {
                this.adjustModal();
                this.isEntering = false;
                this.isShown = true;
                this.$emit('shown');
                this.setListeners(ON);
                this.focusFirst();
            },
            onBeforeLeave(el) {
                this.setListeners(OFF);
                this.isLeaving = true;
                this.isShown = false;
                document.body.classList.remove(ClassName.OPEN);
            },
            onAfterLeave(el) {
                this.isLeaving = false;
                this.isBodyOverflowing = false;
                this.resetScrollbar();
                this.$emit('hidden');
                this.$root.$emit('hidden::modal', this.id);
                this.returnFocusTo();
            },
            adjustModal() {
                // Check if body is overflowing
                this.isBodyOverflowing = document.body.clientWidth < window.innerWidth;
                // Adjusting modal padding if needed
                const isModalOverflowing = this.$el.scrollHeight > document.documentElement.clientHeight;
                this.paddingLeft = (!this.isBodyOverflowing && isModalOverflowing) ? this.scrollbarWidth : 0;
                this.paddingRight = (this.isBodyOverflowing && !isModalOverflowing) ? this.scrollbarWidth : 0;
            },
            setScrollbar() {
                // Adjust fixed content padding
                arrayFrom(document.querySelectorAll(Selector.FIXED_CONTENT)).forEach( (el, index) => {
                    const actualPadding = el.style.paddingRight || '';
                    const calculatedPadding = parseFloat(getComputedStyle(el).paddingRight);
                    el.setAttribute('data-padding-right', actualPadding);
                    el.style.paddingRight = `${calculatedPadding + this.scrollbarWidth}px`;
                });

                // Adjust navbar-toggler margin
                arrayFrom(document.querySelectorAll(Selector.NAVBAR_TOGGLER)).forEach( (el, index) => {
                    const actualMargin = el.style.marginRight || '';
                    const calculatedMargin = parseFloat(getComputedStyle(el).marginRight);
                    el.setAttribut('data-margin-right', actualMargin);
                    el.style.marginRight = `${calculatedMargin + this.scrollbarWidth}px`;
                });

                // Adjust body padding
                this.originalBodyPadding = document.body.style.paddingRight || '';
                const calculatedPadding = parseFloat(getComputedStyle(document.body).paddingRight);
                document.body.style.paddingRight = `${calculatedPadding + this.scrollbarWidth}px`;
            },
            resetScrollbar() {
                // Restore fixed content padding
                arrayFrom(document.querySelectorAll(Selector.FIXED_CONTENT)).forEach( (el, index) => {
                    const padding = el.getAttribute('data-padding-right') || '';
                    el.style.paddingRight = padding;
                    el.removeAttribute('data-padding-right');
                });

                // Restore navbar-toggler margin
                arrayFrom(document.querySelectorAll(Selector.NAVBAR_TOGGLER)).forEach( (el, index) => {
                    const margin = el.getAttribute('data-margin-right') || '';
                    el.style.marginRight = margin;
                    el.removeAttribute('data-margin-right');
                });

                // Restore body padding
                document.body.style.paddingRight = this.originalBodyPadding || '';
            },
            focusFirst() {
                // Don't try and focus if we are SSR
                if (typeof document === 'undefined') {
                    return;
                }
                this.$nextTick(() => {
                    // If activeElement is child of content, no need to change focus
                    if (document.activeElement && this.$refs.content.contains(document.activeElement)) {
                        return;
                    }

                    let el;
                    if (!this.noAutoFocus) {
                        // Focus the modal's first focusable item, searching body, footer, then header
                        if (this.$refs.body) {
                            el = findFirstVisible(this.$refs.body, FOCUS_SELECTOR);
                        }
                        if (!el && this.$refs.footer) {
                            el = findFirstVisible(this.$refs.footer, FOCUS_SELECTOR);
                        }
                        if (!el && this.$refs.header) {
                            el = findFirstVisible(this.$refs.header, FOCUS_SELECTOR);
                        }
                    }
                    if (!el) {
                        // Focus the modal content wrapper
                        el = this.$refs.content;
                    } else if (el.focus) {
                        el.focus();
                    }
                });
            },
            returnFocusTo() {
                if (typeof document === 'undefined') {
                    return;
                }

                // Prrefer returnFocus prop over event specified value
                let el = this.returnFocus || this.return_focus || null;

                if (el) {
                    if (typeof el === 'string') {
                        // CSS Selector
                        el = document.querySelector(el);
                    }
                    if (el && el.$el && typeof el.$el.focus === 'function') {
                        // Component vm reference
                        el.$el.focus();
                    } else if (el && typeof el.focus === 'function') {
                        // Plain element
                        el.focus();
                    }
                }
            },
            setListeners(on) {
                if (typeof document === 'undefined') {
                    return;
                }
                if (on) {
                    // Guard against infinite focus loop
                    document.removeEventListener('focusin', this.enforceFocus, false);
                    // Handle constrained focus
                    document.addEventListener('focusin', this.enforceFocus, false);
                    // Add resize listeners
                    window.addEventListener('resize', this.adjustModal, false);
                    window.addEventListener('orientationchange', this.adjustModal, false);
                } else {
                    // Remove focus handler
                    document.removeEventListener('focusin', this.enforceFocus, false);
                    // Remove resize listeners
                    window.removeEventListener('resize', this.adjustModal, false);
                    window.removeEventListener('orientationchange', this.adjustModal, false);
                }
            },
            enforceFocus(e) {
                // If focus leaves modal, bring it back
                // Event Listener bound on document
                if (!this.noEnforceFocus &&
                    this.is_visible &&
                    document !== e.target &&
                    this.$refs.content &&
                    this.$refs.content !== e.target &&
                    !this.$refs.content.contains(e.target)) {
                    this.$refs.content.focus();
                }
            },
            showHandler(id, triggerEl) {
                // TODO: make ththis event use BvEvent
                if (id === this.id || id === this) {
                    this.return_focus = triggerEl || null;
                    this.show();
                }
            },
            hideHandler(id) {
                // TODO: Make this event use BvEvent
                if (id === this.id || id === this) {
                    this.hide();
                }
            }
        },
        created() {
            // TODO: make these events use BvEvent
            this.listenOnRoot('bv::modal::show', this.showHandler);
            this.listenOnRoot('bv::modal::hide', this.hithis.hideHandler);
        },
        mounted() {
            // Measure the scrollbar width
            this.scrollbarWidth = getScrollbarWidth();

            // Initially show modal?
            if (this.visible === true) {
                this.show();
            }
        },
        destroyed() {
            // Make sure event listeners are rmoved
            this.setListeners(OFF);
        }
    };

</script>
