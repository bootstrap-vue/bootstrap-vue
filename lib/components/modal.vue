<template>
    <div>
        <transition-group enter-class="hidden"
                          enter-to-class=""
                          enter-active-class=""
                          @after-enter="focusFirst"
                          leave-class="show"
                          leave-active-class=""
                          leave-to-class="hidden"
        >
            <div :class="['modal',{fade: !noFade, show: is_visible}]"
                 :id="id || null"
                 role="dialog"
                 ref="modal"
                 key="modal"
                 v-show="is_visible"
                 @click="onClickOut()"
                 @keyup.esc="onEsc()"
            >

                <div :class="['modal-dialog','modal-'+size]">
                    <div class="modal-content"
                         tabindex="-1"
                         role="document"
                         ref="content"
                         :aria-labelledby="(hideHeader || !id) ? null : (id + '__BV_title_')"
                         :aria-describedby="id ? (id + '__BV_body_') : null"
                         @click.stop
                    >

                        <header class="modal-header" ref="header" v-if="!hideHeader">
                            <slot name="modal-header">
                                <h5 class="modal-title" :id="id ? (id + '__BV_title_') : null">
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

            <div key="modal-backdrop"
                 :class="['modal-backdrop',{fade: !noFade, show: is_visible}]"
                 v-if="is_visible"
            ></div>
        </transition-group>
    </div>
</template>

<style scoped>
    .hidden {
        opacity: 0 !important;
    }

    /* Make modal display as block instead of inline style, and because Vue's v-show deletes inline "display" style */
    .modal {
        display: block;
    }
</style>

<script>
    import bBtn from './button.vue';
    import listenOnRoot from '../mixins/listen-on-root';

    const FOCUS_SELECTOR = [
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'a:not([disabled]):not(.disabled)',
        '[tabindex]:not([disabled]):not(.disabled)'
    ].join(',');

    // Determine if an HTML element is visible - Faster than CSS check
    function isVisible(el) {
        return el && (el.offsetWidth > 0 || el.offsetHeight > 0);
    }
    
    // Find the first visible element contained in a given root element
    function findFirstVisible(root, selector) {
        if (!root || !root.querySelectorAll || !selector) {
            return null;
        }
        let els = Array.prototype.slice.call(root.querySelectorAll(selector));

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
        mixins: [listenOnRoot],
        components: {bBtn},
        data() {
            return {
                is_visible: false,
                return_focus: this.returnFocus || null
            };
        },
        model: {
            prop: 'visible',
            event: 'change'
        },
        computed: {
            body() {
                if (typeof document !== 'undefined') {
                    return document.querySelector('body');
                }
            }
        },
        watch: {
            visible(new_val, old_val) {
                if (new_val === old_val) {
                    return;
                }

                if (new_val) {
                    this.show();
                } else {
                    this.hide();
                }
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
            size: {
                type: String,
                default: 'md'
            },
            buttonSize: {
                type: String,
                default: 'md'
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
                if (this.is_visible) {
                    return;
                }
                this.$emit('show');
                this.is_visible = true;
                this.$root.$emit('shown::modal', this.id);
                this.body.classList.add('modal-open');
                this.$emit('shown');
                this.$emit('change', true);
                if (typeof document !== 'undefined') {
                    // Guard against infinite focus loop
                    document.removeEventListener('focusin', this.enforceFocus, false);
                    // Handle constrained focus
                    document.addEventListener('focusin', this.enforceFocus, false);
                }
            },
            hide(isOK) {
                if (!this.is_visible) {
                    return;
                }

                // Create event object
                let canceled = false;
                const e = {
                    isOK,
                    cancel() {
                        canceled = true;
                    }
                };

                // Emit events
                this.$emit('change', false);
                this.$emit('hide', e);

                if (isOK === true) {
                    this.$emit('ok', e);
                } else if (isOK === false) {
                    this.$emit('cancel', e);
                }

                // Hide if not canceled
                if (!canceled) {
                    if (typeof document !== 'undefined') {
                        // Remove focus handler
                        document.removeEventListener('focusin', this.enforceFocus, false);
                        // Return focus to original button/trigger element if provided
                        this.returnFocusTo();
                    }
                    this.is_visible = false;
                    this.$root.$emit('hidden::modal', this.id);
                    this.$emit('hidden', e);
                    this.body.classList.remove('modal-open');
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
                    }
                    if (el && el.focus) {
                        el.focus();
                    }
                });
            },
            returnFocusTo() {
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
            enforceFocus(e) {
                // If focus leaves modal, bring it back
                // Event Listener bound on document
                if (this.is_visible &&
                    document !== e.target &&
                    this.$refs.content &&
                    this.$refs.content !== e.target &&
                    !this.$refs.content.contains(e.target)) {
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
            this.listenOnRoot('show::modal', this.showHandler);
            this.listenOnRoot('hide::modal', this.hideHandler);
        },
        mounted() {
            if (this.visible === true) {
                this.show();
            }
        },
        destroyed() {
            // Make sure event listener is rmoved
            if (typeof document !== 'undefined') {
                document.removeEventListener('focusin', this.enforceFocus, false);
            }
        }
    };

</script>
