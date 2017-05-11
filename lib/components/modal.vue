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
            <div key="modal" :id="id"
                 v-show="is_visible"
                 :class="['modal',{fade: fade, show: is_visible}]"
                 role="dialog"
                 @click="onClickOut($event)"
                 @keyup.esc="onEsc($event)"
            >

                <div :class="['modal-dialog','modal-'+size]">
                    <div class="modal-content"
                         tabindex="-1"
                         role="document"
                         ref="content"
                         :aria-labelledby="(hideHeader || !id) ? null : (id + '_modal_title')"
                         :aria-describedby="id ? (id + '_modal_body') : null"
                         @click.stop
                    >

                        <header class="modal-header" ref="header" v-if="!hideHeader">
                            <slot name="modal-header">
                                <h5 class="modal-title" :id="id ? (id + '_modal_title') : null">
                                    <slot name="modal-title">{{title}}</slot>
                                </h5>
                                <button type="button"
                                        v-if="!hideHeaderClose"
                                        class="close"
                                        :aria-label="closeTitle"
                                        @click="hide"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </slot>
                        </header>

                        <div class="modal-body" ref="body" :id="id ? (id + '_modal_body') : null">
                            <slot></slot>
                        </div>

                        <footer class="modal-footer" ref="footer" v-if="!hideFooter">
                            <slot name="modal-footer">
                                <b-btn variant="secondary" @click="hide(false)" v-if="!okOnly">{{closeTitle}}</b-btn>
                                <b-btn variant="primary" @click="hide(true)">{{okTitle}}</b-btn>
                            </slot>
                        </footer>

                    </div>
                </div>
            </div>

            <div key="modal-backdrop"
                 :class="['modal-backdrop',{fade: fade, show: is_visible}]"
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

    const FOCUS_SELECTOR = [
        'button:not([disabled]):not([style*="display: none"]):not([style*="display:none"])',
        'input:not([disabled]):not([style*="display: none"]):not([style*="display:none"])',
        'select:not([disabled]):not([style*="display: none"]):not([style*="display:none"])',
        'textarea:not([disabled]):not([style*="display: none"]):not([style*="display:none"])',
        'a:not([disabled]):not(.disabled):not([style*="display: none"]):not([style*="display:none"])',
        '[tabindex]:not([disabled]):not(.disabled):not([style*="display: none"]):not([style*="display:none"])'
    ].join(',');

    export default {
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
            fade: {
                type: Boolean,
                default: true
            },
            closeTitle: {
                type: String,
                default: 'Close'
            },
            okTitle: {
                type: String,
                default: 'OK'
            },
            closeOnBackdrop: {
                type: Boolean,
                default: true
            },
            closeOnEsc: {
                type: Boolean,
                default: true
            },
            hideHeader: {
                type: Boolean,
                default: false
            },
            hideFooter: {
                type: Boolean,
                default: false
            },
            okOnly: {
                type: Boolean,
                default: false
            },
            hideHeaderClose: {
                type: Boolean,
                default: false
            },
            returnFocus: {
                default: null
            }
        },
        methods: {
            show() {
                if (this.is_visible) {
                    return;
                }
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
                this.$emit('hidden', e);

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
                    this.body.classList.remove('modal-open');
                }
            },
            onClickOut() {
                // If backdrop clicked, hide modal
                if (this.closeOnBackdrop) {
                    this.hide();
                }
            },
            onEsc() {
                // If ESC pressed, hide modal
                if (this.is_visible && this.closeOnEsc) {
                    this.hide();
                }
            },
            focusFirst() {
                // If activeElement is child of content, no need to change focus
                if (document.activeElement && this.$refs.content.contains(document.activeElement)) {
                    return;
                }

                // Focus the modal's first focusable item, searching footer, then body, then header, else the modal
                let el;
                if (this.$refs.footer) {
                    el = this.$refs.footer.querySelector(FOCUS_SELECTOR);
                }
                if (!el && this.$refs.body) {
                    el = this.$refs.body.querySelector(FOCUS_SELECTOR);
                }
                if (!el && this.$refs.header) {
                    el = this.$refs.header.querySelector(FOCUS_SELECTOR);
                }
                if (!el) {
                    el = this.$refs.content;
                }
                if (el && el.focus) {
                    el.focus();
                }
            },
            returnFocusTo() {
                if (this.return_focus) {
                    const el = (typeof this.return_focus === 'string') ?
                        document.querySelector(this.returnFocus) :
                        this.return_focus;

                    if (el && el.$el && typeof el.$el.focus === 'function') {
                        el.$el.focus();
                    } else if (el && typeof el.focus === 'function') {
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
            }
        },
        created() {
            this.$root.$on('show::modal', (id, triggerEl) => {
                if (id === this.id) {
                    this.return_focus = triggerEl || this.return_focus || this.returnFocus || null;
                    this.show();
                }
            });

            this.$root.$on('hide::modal', id => {
                if (id === this.id) {
                    this.hide();
                }
            });
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
