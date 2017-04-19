<template>
    <div>
        <transition-group enter-class="hidden"
                          enter-to-class="show"
                          enter-active-class=""
                          leave-class="show"
                          leave-active-class=""
                          leave-to-class="hidden"
                          v-on:after-enter="afterEnter"
        >
            <div key="modal" :id="id"
                 v-show="visible"
                 :class="['modal',{fade :fade}]"
                 role="dialog"
                 @click="onClickOut($event)"
                 @keyup.esc="onEsc($event)"
            >

                <div :class="['modal-dialog','modal-'+size]">
                    <div class="modal-content"
                            tabindex="-1"
                            role="document"
                            ref="content"
                            :aria-labeledby="hideHeader ? '' : (id + '_modal_title')"
                            :aria-describedby="id + '_modal_body'"
                            @click.stop
                    >

                        <header class="modal-header" v-if="!hideHeader">
                            <slot name="modal-header">
                                <h5 class="modal-title" :id="id + '_modal_title'">
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

                        <div class="modal-body" :id="id + '_modal_body'">
                            <slot></slot>
                        </div>

                        <footer class="modal-footer" v-if="!hideFooter">
                            <slot name="modal-footer">
                                <b-btn variant="secondary" @click="hide(false)">{{closeTitle}}</b-btn>
                                <b-btn variant="primary" @click="hide(true)">{{okTitle}}</b-btn>
                            </slot>
                        </footer>

                    </div>
                </div>
            </div>

            <div key="modal-backdrop"
                 :class="['modal-backdrop',{fade: fade}]"
                 v-if="visible"
            ></div>
        </transition-group>
    </div>
</template>

<style scoped>
    .hidden {
        opacity: 0 !important;
    }

    /* Make modal display as block instead of inline style, and because Vue's v-show deletes inline "display" style*/
    .modal {
        display: block;
    }
</style>

<script>
    import bBtn from './button.vue';

    export default {
        components: {bBtn},
        data() {
            return {
                visible: false
            };
        },
        computed: {
            body() {
                if (typeof document !== 'undefined') {
                    return document.querySelector('body');
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
            hideHeaderClose: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            show() {
                if (this.visible) {
                    return;
                }
                this.visible = true;
                this.$root.$emit('shown::modal', this.id);
                this.body.classList.add('modal-open');
                this.$emit('shown');
            },
            hide(isOK) {
                if (!this.visible) {
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
                this.$emit('hidden', e);

                if (isOK === true) {
                    this.$emit('ok', e);
                } else if (isOK === false) {
                    this.$emit('cancel', e);
                }

                // Hide if not canceled
                if (!canceled) {
                    this.visible = false;
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
                // If ESC presses, hide modal
                if (this.visible && this.closeOnEsc) {
                    this.hide();
                }
            },
            afterEnter(el) {
                // Add show class to keep el showed just after transition is ended,
                // Because transition removes all used classes
                el.classList.add('show');
            },
            enforceFocus(e) {
                // If focus leaves modal, bring it back
                // eventListener bound on document
                if (this.visible &&
                        document !== e.target &&
                        this.$refs.content &&
                        this.$refs.content !== e.target &&
                        !this.$refs.content.contains(e.target)) {
                    this.$refs.content.focus();
                }
            }
        },
        created() {
            this.$root.$on('show::modal', id => {
                if (id === this.id) {
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
            if (typeof document !== 'undefined') {
                document.addEventListener('focus', this.enforceFocus);
            }
        },
        destroyed() {
            if (typeof document !== 'undefined') {
                document.removeEventListener('focus', this.enforceFocus);
            }
        }
    };

</script>
