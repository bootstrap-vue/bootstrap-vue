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
                 @click="onClickOut($event)"
            >

                <div :class="['modal-dialog','modal-'+size]">
                    <div class="modal-content" @click.stop>

                        <div class="modal-header" v-if="!hideHeader">
                            <slot name="modal-header">
                                <h5 class="modal-title">
                                    <slot name="modal-title">{{title}}</slot>
                                </h5>
                                <button type="button" class="close" aria-label="Close" @click="hide">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </slot>
                        </div>

                        <div class="modal-body">
                            <slot></slot>
                        </div>

                        <div class="modal-footer" v-if="!hideFooter">
                            <slot name="modal-footer">
                                <b-btn variant="secondary" @click="hide(false)">{{closeTitle}}</b-btn>
                                <b-btn variant="primary" @click="hide(true)">{{okTitle}}</b-btn>
                            </slot>
                        </div>

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
            hideHeader: {
                type: Boolean,
                default: false
            },
            hideFooter: {
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
            pressedButton(e) {
                // If not visible don't do anything
                if (!this.visible) {
                    return;
                }

                // Support for esc key press
                const key = e.which || e.keyCode;
                if (key === 27) { // 27 is esc
                    this.hide();
                }
            },
            afterEnter(el) {
                // Add show class to keep el showed just after transition is ended,
                // Because transition removes all used classes
                el.classList.add('show');
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
                document.addEventListener('keydown', this.pressedButton);
            }
        },
        destroyed() {
            if (typeof document !== 'undefined') {
                document.removeEventListener('keydown', this.pressedButton);
            }
        }
    };

</script>
