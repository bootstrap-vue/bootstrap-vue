<template>
    <div :class="classObject" role="alert" v-if="localShow">
        <button type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close"
                v-if="dismissible"
                @click.stop.prevent="dismiss"
        >
            <span aria-hidden="true">&times;</span>
        </button>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                countDownTimerId: null,
                dismissed: false
            };
        },
        computed: {
            classObject() {
                return ['alert', this.alertState, this.dismissible ? 'alert-dismissible' : ''];
            },
            alertState() {
                return !this.state || this.state === `default` ? `alert-success` : `alert-${this.state}`;
            },
            localShow() {
                return !this.dismissed && (this.countDownTimerId || this.show);
            }
        },
        props: {
            state: {
                type: String,
                default: 'info'
            },
            dismissible: {
                type: Boolean,
                default: false
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
        methods: {
            dismiss() {
                this.dismissed = true;
                this.$emit('dismissed');
                this.clearCounter();
            },
            clearCounter() {
                if (this.countDownTimerId) {
                    clearInterval(this.countDownTimerId);
                }
            },
            showChanged() {
                // Reset dismiss status
                this.dismissed = false;

                // No timer for boolean values
                if (this.show === true || this.show === false || this.show === null || this.show === 0) {
                    return;
                }

                let dismissCountDown = this.show;
                this.$emit('dismiss-count-down', dismissCountDown);

                // Start counter
                this.clearCounter();
                this.countDownTimerId = setInterval(() => {
                    if (dismissCountDown < 2) {
                        return this.dismiss();
                    }
                    dismissCountDown--;
                    this.$emit('dismiss-count-down', dismissCountDown);
                }, 1000);
            }
        }
    };
</script>
