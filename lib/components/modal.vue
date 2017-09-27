<template>
    <div :id="safeId('__BV_modal_outer_')" v-if="!is_hidden">
        <transition enter-class=""
                    enter-to-class=""
                    enter-active-class=""
                    leave-class=""
                    leave-active-class=""
                    leave-to-class=""
                    @before-enter="onBeforeEnter"
                    @enter="onEnter"
                    @after-enter="onAfterEnter"
                    @before-leave="onBeforeLeave"
                    @leave="onLeave"
                    @after-leave="onAfterLeave"
        >
            <div :class="modalClasses"
                 :id="safeId()"
                 :aria-hidden="is_visible ? null : 'true'"
                 role="dialog"
                 ref="modal"
                 v-show="is_visible"
                 @click="onClickOut"
                 @keyup.esc="onEsc"
            >

                <div :class="dialogClasses">
                    <div class="modal-content"
                         tabindex="-1"
                         role="document"
                         ref="content"
                         :aria-labelledby="hideHeader ? null : safeId('__BV_modal_header_')"
                         :aria-describedby="safeId('__BV_modal_body_')"
                         @focusout="onFocusout"
                         @click.stop
                    >

                        <header :class="headerClasses"
                                ref="header"
                                :id="safeId('__BV_modal_header_')"
                                v-if="!hideHeader"
                        >
                            <slot name="modal-header">
                                <h5 :is="titleTag" class="modal-title">
                                    <slot name="modal-title">{{title}}</slot>
                                </h5>
                                <b-btn-close v-if="!hideHeaderClose"
                                             :disabled="is_transitioning"
                                             :aria-label="headerCloseLabel"
                                             :text-variant="headerTextVariant"
                                             @click="hide('headerclose')"
                                ><slot name="modal-header-close"></slot></b-btn-close>
                            </slot>
                        </header>

                        <div :class="bodyClasses" ref="body" :id="safeId('__BV_modal_body_')">
                            <slot></slot>
                        </div>

                        <footer :class="footerClasses" ref="footer" v-if="!hideFooter" :id="safeId('__BV_modal_footer_')">
                            <slot name="modal-footer">
                                <b-btn v-if="!okOnly"
                                       :variant="cancelVariant"
                                       :size="buttonSize"
                                        :disabled="is_transitioning"
                                       @click="hide('cancel')"
                                ><slot name="modal-cancel">{{ cancelTitle }}</slot></b-btn>
                                <b-btn :variant="okVariant"
                                       :size="buttonSize"
                                       :disabled="okDisabled || is_transitioning"
                                       @click="hide('ok')"
                                ><slot name="modal-ok">{{ okTitle }}</slot></b-btn>
                            </slot>
                        </footer>

                    </div>
                </div>
            </div>
        </transition>
        <div v-if="!hideBackdrop && (is_visible || is_transitioning)" :id="safeId('__BV_modal_backdrop_')" :class="backdropClasses"></div>
    </div>
</template>

<script>
    import bBtn from './button';
    import bBtnClose from './button-close';
    import { idMixin, listenOnRootMixin } from '../mixins';
    import { isVisible, selectAll, select, getBCR, addClass, removeClass, setAttr, removeAttr, getAttr, eventOn, eventOff } from '../utils/dom';
    import { observeDom, warn } from '../utils';
    import { BvEvent } from '../classes';

    const Selector = {
        FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
        STICKY_CONTENT: '.sticky-top',
        NAVBAR_TOGGLER: '.navbar-toggler'
    };

    const OBSERVER_CONFIG = {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['style', 'class']
    };

    export default {
        mixins: [idMixin, listenOnRootMixin],
        components: {bBtn, bBtnClose},
        data() {
            return {
                is_hidden: this.lazy || false,
                is_visible: false,
                is_transitioning: false,
                is_show: false,
                is_block: false,
                scrollbarWidth: 0,
                isBodyOverflowing: false,
                return_focus: this.returnFocus || null
            };
        },
        model: {
            prop: 'visible',
            event: 'change'
        },
        props: {
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
            noEnforceFocus: {
                type: Boolean,
                default: false
            },
            headerBgVariant: {
                type: String,
                default: null
            },
            headerBorderVariant: {
                type: String,
                default: null
            },
            headerTextVariant: {
                type: String,
                default: null
            },
            bodyBgVariant: {
                type: String,
                default: null
            },
            bodyTextVariant: {
                type: String,
                default: null
            },
            footerBgVariant: {
                type: String,
                default: null
            },
            footerBorderVariant: {
                type: String,
                default: null
            },
            footerTextVariant: {
                type: String,
                default: null
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
            hideBackdrop: {
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
            cancelTitle: {
                type: String,
                default: 'Cancel'
            },
            okTitle: {
                type: String,
                default: 'OK'
            },
            cancelVariant: {
                type: String,
                default: 'secondary'
            },
            okVariant: {
                type: String,
                default: 'primary'
            },
            lazy: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            modalClasses() {
                return [
                    'modal',
                    {
                        fade: !this.noFade,
                        show: this.is_show,
                        'd-block': this.is_block
                    }
                ];
            },
            dialogClasses() {
                return [
                    'modal-dialog',
                    {
                        [`modal-${this.size}`]: Boolean(this.size)
                    }
                ];
            },
            backdropClasses() {
                return [
                    'modal-backdrop',
                    {
                        fade: !this.noFade,
                        show: this.is_show || this.noFade,
                    }
                ];
            },
            headerClasses() {
                return [
                    'modal-header',
                    // Rounding is needed to fix a bug in bootstrap V4.beta.1 CSS
                    {
                        'rounded-top': Boolean(this.headerBgVariant),
                        [`bg-${this.headerBgVariant}`]: Boolean(this.headerBgVariant),
                        [`text-${this.headerTextVariant}`]: Boolean(this.headerTextVariant),
                        [`border-${this.headerBorderVariant}`]: Boolean(this.headerBorderVariant)
                    }
                ];
            },
            bodyClasses() {
                return [
                    'modal-body',
                    {
                        [`bg-${this.bodyBgVariant}`]: Boolean(this.bodyBgVariant),
                        [`text-${this.bodyTextVariant}`]: Boolean(this.bodyTextVariant)
                    }
                ];
            },
            footerClasses() {
                return [
                    'modal-footer',
                    // Rounding is needed to fix a bug in bootstrap V4.beta.1 CSS
                    {
                        'rounded-bottom': Boolean(this.footerBgVariant),
                        [`bg-${this.footerBgVariant}`]: Boolean(this.footerBgVariant),
                        [`text-${this.footerTextVariant}`]: Boolean(this.footerTextVariant),
                        [`border-${this.footerBorderVariant}`]: Boolean(this.footerBorderVariant)
                    }
                ];
            }
        },
        watch: {
            visible(new_val, old_val) {
                if (new_val === old_val) {
                    return;
                }
                this[new_val ? 'show' : 'hide']();
            }
        },
        methods: {
            // Public Methods
            show() {
                if (this.is_visible) {
                    return;
                }
                const showEvt = new BvEvent('show', {
                    cancelable: true,
                    vueTarget: this,
                    target: this.$refs.modal,
                    relatedTarget: null
                });
                this.emitEvent(showEvt);
                // Show if not canceled
                if (showEvt.defaultPrevented || this.is_visible) {
                    return;
                }
                this.is_hidden = false;
                this.$nextTick(() => {
                    // We do this in nextTick to ensure hte modal is in DOM first before we show it
                    this.is_visible = true;
                    this.$emit('change', true);
                    // Observe changes in modal content and adjust if necessary
                    this._observer = observeDom(this.$refs.content, this.adjustDialog.bind(this), OBSERVER_CONFIG);
                });
            },
            hide(trigger) {
                if (!this.is_visible) {
                    return;
                }
                const hideEvt = new BvEvent('hide', {
                    cancelable: true,
                    vueTarget: this,
                    target: this.$refs.modal,
                    relatedTarget: null, // this could be the trigger element/component reference
                    isOK: trigger || null,
                    trigger: trigger || null,
                    cancel() {
                        // Backwards compatibility
                        warn('b-modal: evt.cancel() is deprecated. Please use evt.preventDefault().');
                        this.preventDefault();
                    }
                });
                if (trigger === 'ok') {
                    this.$emit('ok', hideEvt);
                } else if (trigger === 'cancel') {
                    this.$emit('cancel', hideEvt);
                }
                this.emitEvent(hideEvt);
                // Hide if not canceled
                if (hideEvt.defaultPrevented || !this.is_visible) {
                    return;
                }
                // stop observing for content changes
                if (this._observer) {
                    this._observer.disconnect();
                    this._observer = null;
                }
                this.is_visible = false;
                this.$emit('change', false);
            },
            // Transition Handlers
            onBeforeEnter() {
                this.is_transitioning = true;
                this.checkScrollbar();
                this.setScrollbar();
                addClass(document.body, 'modal-open');
                this.setResizeEvent(true);
            },
            onEnter() {
                this.is_block = true;
                this.$refs.modal.scrollTop = 0;
            },
            onAfterEnter() {
                this.is_show = true;
                this.is_transitioning = false;
                this.$nextTick(() => {
                    this.focusFirst();
                    const shownEvt = new BvEvent('shown', {
                        cancelable: false,
                        vueTarget: this,
                        target: this.$refs.modal,
                        relatedTarget: null
                    });
                    this.emitEvent(shownEvt);
                });
            },
            onBeforeLeave() {
                this.is_transitioning = true;
                this.setResizeEvent(false);
            },
            onLeave() {
                // Remove the 'show' class
                this.is_show = false;
            },
            onAfterLeave() {
                removeClass(document.body, 'modal-open');
                this.is_block = false;
                this.resetAdjustments();
                this.resetScrollbar();
                this.is_transitioning = false;
                this.$nextTick(() => {
                    this.is_hidden = this.lazy || false;
                    this.returnFocusTo();
                    const hiddenEvt = new BvEvent('hidden', {
                        cancelable: false,
                        vueTarget: this,
                        target: this.lazy ? null : this.$refs.modal,
                        relatedTarget: null
                    });
                    this.emitEvent(hiddenEvt);
                });
            },
            // Event emitter
            emitEvent(bvEvt) {
                const type = bvEvt.type;
                this.$emit(type, bvEvt);
                this.$root.$emit(`bv::modal::${type}`, bvEvt);
            },
            // UI Event Handlers
            onClickOut() {
                // If backdrop clicked, hide modal
                if (this.is_visible && !this.noCloseOnBackdrop) {
                    this.hide('backdrop');
                }
            },
            onEsc() {
                // If ESC pressed, hide modal
                if (this.is_visible && !this.noCloseOnEsc) {
                    this.hide('esc');
                }
            },
            onFocusout(evt) {
                // If focus leaves modal, bring it back
                // 'focusout' Event Listener bound on content
                const content = this.$refs.content;
                if (!this.noEnforceFocus &&
                    this.is_visible &&
                    content &&
                    !content.contains(evt.relatedTarget)) {
                    content.focus();
                }
            },
            // Resize Listener
            setResizeEvent(on) {
                ['resize', 'orientationchange'].forEach(evtName => {
                    if (on) {
                        eventOn(window, evtName, this.adjustDialog);
                    } else {
                        eventOff(window, evtName, this.adjustDialog);
                    }
                });
            },
            // Root Listener handlers
            showHandler(id, triggerEl) {
                if (id === this.id) {
                    this.return_focus = triggerEl || null;
                    this.show();
                }
            },
            hideHandler(id) {
                if (id === this.id) {
                    this.hide();
                }
            },
            modalListener(bvEvt) {
                // If another modal opens, close this one
                if (bvEvt.vueTarget !== this) {
                    this.hide();
                }
            },
            // Focus control handlers
            focusFirst() {
                // Don't try and focus if we are SSR
                if (typeof document === 'undefined') {
                    return;
                }
                const content = this.$refs.content;
                const activeElement = document.activeElement;
                if (activeElement && content && content.contains(activeElement)) {
                    // If activeElement is child of content, no need to change focus
                    return;
                } else if (content) {
                    // Focus the modal content wrapper
                    content.focus();
                }
            },
            returnFocusTo() {
                // Prefer returnFocus prop over event specified return_focus value
                let el = this.returnFocus || this.return_focus || null;
                if (typeof el === 'string') {
                    // CSS Selector
                    el = select(el);
                }
                if (el) {
                    el = el.$el || el;
                    if (isVisible(el)) {
                        el.focus();
                    }
                }
            },
            // Utility methods
            getScrollbarWidth() {
                const scrollDiv = document.createElement('div');
                scrollDiv.className = 'modal-scrollbar-measure';
                document.body.appendChild(scrollDiv);
                this.scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
                document.body.removeChild(scrollDiv);
            },
            adjustDialog() {
                if (!this.is_visible) {
                    return;
                }
                const modal = this.$refs.modal;
                const isModalOverflowing = modal.scrollHeight > document.documentElement.clientHeight;

                if (!this.isBodyOverflowing && isModalOverflowing) {
                    modal.style.paddingLeft = `${this.scrollbarWidth}px`;
                }

                if (this.isBodyOverflowing && !isModalOverflowing) {
                    modal.style.paddingRight = `${this.scrollbarWidth}px`;
                }
            },
            resetAdjustments() {
                const modal = this.$refs.modal;
                modal.style.paddingLeft = '';
                modal.style.paddingRight = '';
            },
            checkScrollbar() {
              const rect = getBCR(document.body);
              this.isBodyOverflowing = rect.left + rect.right < window.innerWidth;
            },
            setScrollbar() {
                if (this.isBodyOverflowing) {
                    // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
                    //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set

                    const computedStyle = window.getComputedStyle;
                    const body = document.body;
                    const scrollbarWidth = this.scrollbarWidth;

                    // Adjust fixed content padding
                    selectAll(Selector.FIXED_CONTENT).forEach(el => {
                      const actualPadding = el.style.paddingRight;
                      const calculatedPadding = computedStyle(el).paddingRight || 0;
                      setAttr(el,'data-padding-right', actualPadding);
                      el.style.paddingRight = `${parseFloat(calculatedPadding) + this.scrollbarWidth}px`;
                    });

                    // Adjust sticky content margin
                    selectAll(Selector.STICKY_CONTENT).forEach(el => {
                      const actualMargin = el.style.marginRight;
                      const calculatedMargin = computedStyle(el).marginRight || 0;
                      setAttr(el, 'data-margin-right', actualMargin);
                      el.style.marginRight = `${parseFloat(calculatedMargin) - this.scrollbarWidth}px`;
                    });

                    // Adjust navbar-toggler margin
                    selectAll(Selector.NAVBAR_TOGGLER).forEach(el => {
                      const actualMargin = el.style.marginRight;
                      const calculatedMargin = computedStyle(el).marginRight || 0;
                      setAttr(el, 'data-margin-right', actualMargin);
                      el.style.marginRight = `${parseFloat(calculatedMargin) + this.scrollbarWidth}px`;
                    });

                    // Adjust body padding
                    const actualPadding = body.style.paddingRight;
                    const calculatedPadding = computedStyle(body).paddingRight;
                    setAttr(body, 'data-padding-right', actualPadding);
                    body.style.paddingRight = `${parseFloat(calculatedPadding) + this.scrollbarWidth}px`;
                }
            },
            resetScrollbar() {
                // Restore fixed content padding
                selectAll(Selector.FIXED_CONTENT).forEach(el => {
                    el.style.paddingRight = getAttr(el, 'data-padding-right') || '';
                    removeAttr(el,'data-padding-right');
                });

                // Restore sticky content and navbar-toggler margin
                selectAll(`${Selector.STICKY_CONTENT}, ${Selector.NAVBAR_TOGGLER}`).forEach(el => {
                    el.style.marginRight = getAttr(el, 'data-margin-right') || '';
                    removeAttr(el, 'data-margin-right');
                });

                // Restore body padding
                const body = document.body;
                body.style.paddingRight = getAttr(body, 'data-padding-right') || '';
                removeAttr(body, 'data-padding-right');
            }

        },
        created() {
           // create non-reactive property
           this._observer = null;
        },
        mounted() {
            // Measure scrollbar
            this.getScrollbarWidth();
            // Listen for events from others to either open or close ourselves
            this.listenOnRoot('bv::show::modal', this.showHandler);
            this.listenOnRoot('bv::hide::modal', this.hideHandler);
            // Listen for bv:modal::show events, and close ourselves if the opening modal not us
            this.listenOnRoot('bv::modal::show', this.modalListener);
            // Initially show modal?
            if (this.visible === true) {
                this.show();
            }
        },
        beforeDestroy() {
            if (this._observer) {
                this._observer.disconnect();
                this._observer = null;
            }
            this.setResizeEvent(false);
        }
    };
</script>
