<template>
    <div>
        <transition enter-class=""
                    enter-to-class=""
                    enter-active-class=""
                    leave-class=""
                    leave-active-class=""
                    leave-to-class=""
                    @before-enter="onBeforeEnter"
                    @enter="onEnter"
                    @after-enter="focusFirst"
                    @before-leave="onBeforeLeave"
                    @leave="onLeave"
                    @after-leave="onAfterLeave"
        >
            <div :class="modalClasses"
                 :id="safeId()"
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
                         :aria-labelledby="hideHeader ? null : safeId('__BV_header_')"
                         :aria-describedby="safeid('__BV_body_')"
                         @focusout="enforceFocus"
                         @click.stop
                    >

                        <header class="modal-header"
                                ref="header"
                                :id="id ? (id + '__BV_header_') : null"
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

                        <div class="modal-body" ref="body" :id="id ? (id + '__BV_body_') : null">
                            <slot></slot>
                        </div>

                        <footer class="modal-footer" ref="footer" v-if="!hideFooter">
                            <slot name="modal-footer">
                                <b-btn v-if="!okOnly"
                                       :variant="closeVariant"
                                       :size="buttonSize"
                                       @click="hide(false)"
                                ><slot name="modal-cancel">{{ closeTitle }}</slot></b-btn>
                                <b-btn :variant="okVariant"
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
             :class="['modal-backdrop', noFade ? '' : 'fade', is_show ? 'show' : '']"
             v-if="is_visible"
        ></div>
    </div>
</template>

<script>
    import bBtn from './button';
    import { idMixin, listenOnRootMixin } from '../mixins';
    import { from as arrayFrom, arrayFind } from '../utils/array';
    import { isElement, isVisible, selectAll, select } from '../utils/dom';
    import { observeDom } from '../utils';
    import { BvEvent } from '../classes';

    const FOCUS_SELECTOR = [
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'a:not([disabled]):not(.disabled)',
        '[tabindex]:not([disabled]):not(.disabled)'
    ].join(',');

    // Find the first visible element contained in a given root element
    function findFirstVisible(root, selector) {
        if (!isElement(root) || !selector) {
            return null;
        }
        return arrayFind(selectAll(selector, root), isVisible) || null;
    }

    export default {
        mixins: [idMixin, listenOnRootMixin],
        components: {bBtn},
        data() {
            return {
                is_visible: false,
                is_transitioning: false,
                is_show: false,
                is_block: false,
                scrollbarWidth: 0,
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
            hideHeader: {
                type: Boolean,
                default: false
            },
            hideFooter: {
                type: Boolean,
                default: false
            },
            hideBackdrop: {
                type: Boolean,
                default: false
            },
            hideHeaderClose: {
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
            },
            closeVariant: {
                type: String,
                default: 'secondary'
            },
            okVariant: {
                type: String,
                default: 'primary'
            }
        },
        computed: {
            modalClasses() {
                return [
                    'modal',
                    this.noFade ? '' : 'fade',
                    this.is_show ? 'show' : '',
                    this.is_block ? 'd-block' : ''
                ];
            },
            dialogClasses() {
                return [
                    'modal-dialog',
                    Boolean(this.size) ? `modal-${this.size}` : ''
                ];
            }

        },
        watch: {
            visible(new_val, old_val) {
                if (new_val === old_val) {
                    return;
                }
                this[newVal ? 'show', 'hide']();
            }
        },
        methods: {
            // Transition Handlers
            onBeforeEnter() {
                this.is_transitioning = true;
                document.body.classList.add('modal-open');
            },
            onEnter() {
                this.is_block = true;
            },
            onAfterEnter() {
                this.is_show = true;
                this.is_transitioning = false;
                this.$nextTick(() => {
                    this.focusFirst();
                    // @TODO: Add BvEvent
                    this.$emit('shown');
                    this.$root.$emit('bv:modal:shown');
                });
            },
            onBeforeLeave() {
                this.is_transitioning = true;
            },
            onLeave() {
                this.is_show = false;
            },
            onAfterLeave() {
                document.body.classList.remove('modal-open');
                this.is_block = false;
                this.is_transitioning = false;
                this.$nextTick(() => {
                    this.returnFocusTo();
                    // @TODO: Add BvEvent
                    this.$emit('hidden');
                    this.$root.$emit('bv:modal:hidden');
                });
            },
            // Public Methods
            show() {
                if (this.is_visible) {
                    return;
                }
                // @TODO: Add cancellable BvEvent
                this.$emit('show');
                this.$root.$emit('bv:modal:show');
                this.is_visible = true;
                this.$emit('change', this.is_visible);
            },
            hide(isOK) {
                if (!this.is_visible) {
                    return;
                }

                // @TODO: Add cancellable BvEvent
                // Create event object
                let canceled = false;
                const e = {
                    isOK,
                    cancel() {
                        canceled = true;
                    }
                };

                // Emit events
                this.$emit('hide', e);

                if (isOK === true) {
                    this.$emit('ok', e);
                } else if (isOK === false) {
                    this.$emit('cancel', e);
                }

                // Hide if not canceled
                if (!canceled) {
                    this.is_visible = false;
                    this.$emit('change', this.is_visible);
                }
            },
            onClickOut() {
                // If backdrop clicked, hide modal
                if (this.is_visible && !this.noCloseOnBackdrop) {
                    this.hide();
                }
            },
            onEsc() {
                // If ESC pressed, hide modal
                if (this.is_visible && !this.noCloseOnEsc) {
                    this.hide();
                }
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

                    // Focus the modal content wrapper
                    this.$refs.content.focus();
                });
            },
            returnFocusTo() {
                // Preffer returnFocus prop over event specified return_focus value
                let el = this.returnFocus || this.return_focus || null;

                if (el) {
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
                }
            },
            enforceFocus(evt) {
                // If focus leaves modal, bring it back
                // 'focusout' Event Listener bound on content
                if (!this.noEnforceFocus &&
                    this.is_visible &&
                    this.$refs.content &&
                    !this.$refs.content.contains(evt.relatedTarget)) {
                    this.$refs.content.focus();
                }
            },
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
            }
        },
        created() {
            // Listen for events from others to either open or close ourselves
            // @TODO: Should this be in mounted()?
            this.listenOnRoot('bv::show::modal', this.showHandler);
            this.listenOnRoot('bv::hide::modal', this.hideHandler);
            // @TODO: Listen for bv:modal::show events, and close ourselves if the event is not ourselves
        },
        activated() {
        },
        deactivated() {
            // TODO: IF taken out of document, we should hide ourselves.
        },
        mounted() {
            // TODO: Measure scrollbar
            if (this.visible === true) {
                this.show();
            }
        }
    };

</script>
