<template>
    <div v-if="localShow"
         :class="classObject"
         role="alert"
         aria-live="polite"
         aria-atomic="true"
    >
        <b-btn-close v-if="dismissible" :aria-label="dismissLabel" @click="dismiss">
          <slot name="dismiss"></slot>
        </b-btn-close>
        <slot></slot>
    </div>
</template>

<script>
    import {warn} from '../utils';
    import bBtnClose from "./button-close";

    export default {
        components: {bBtnClose},
        model: {
            prop: 'show',
            event: 'input'
        },
        data() {
            return {
                countDownTimerId: null,
                dismissed: false
            };
        },
        computed: {
            classObject() {
                return ['alert', this.alertVariant, this.dismissible ? 'alert-dismissible' : ''];
            },
            alertVariant() {
                const variant = this.variant;
                return `alert-${variant}`;
            },
            localShow() {
                return !this.dismissed && (this.countDownTimerId || this.show);
            }
        },
        props: {
            variant: {
                type: String,
                default: 'info'
            },
            dismissible: {
                type: Boolean,
                default: false
            },
            dismissLabel: {
                type: String,
                default: 'Close'
            },
            show: {
                type: [Boolean, Number],
                default: false
            }
        },
        watch: {
            show() {
                this.showChanged();
            }
        },
        mounted() {
            this.showChanged();
        },
        destroyed() {
            this.clearCounter();
        },
        methods: {
            dismiss() {
                this.clearCounter();
                this.dismissed = true;
                this.$emit('dismissed');
                this.$emit('input', false);
                if (typeof this.show === 'number') {
                    this.$emit('dismiss-count-down', 0);
                    this.$emit('input', 0);
                } else {
                    this.$emit('input', false);
                }

            },
            clearCounter() {
                if (this.countDownTimerId) {
                    clearInterval(this.countDownTimerId);
                    this.countDownTimerId = null;
                }
            },
            showChanged() {
                // Reset counter status
                this.clearCounter();
                // Reset dismiss status
                this.dismissed = false;

                // No timer for boolean values
                if (this.show === true || this.show === false || this.show === null || this.show === 0) {
                    return;
                }

                // Start counter
                let dismissCountDown = this.show;
                this.countDownTimerId = setInterval(() => {
                    if (dismissCountDown < 1) {
                        this.dismiss();
                        return;
                    }
                    dismissCountDown--;
                    this.$emit('dismiss-count-down', dismissCountDown);
                    this.$emit('input', dismissCountDown);
                 }, 1000);
            }
        }
    };
</script>
