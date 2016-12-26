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
                localShow: this.show
            }
        },
        props: {
            show: {
                type: Boolean,
                default: false
            },
            state: {
                type: String,
                default: 'info'
            },
            dismissible: {
                type: Boolean,
                default: false
            },
            dismissAfterSeconds: {
                type: Number,
                default: null
            },
        },
        computed: {
            classObject() {
                return ['alert', this.alertState, this.dismissible ? 'alert-dismissible' : '', 'fade', 'in']
            },
            alertState() {
                return !this.state || this.state === `default` ? `alert-success` : `alert-${this.state}`
            },
            show: {
                get: function () {
                    return this.localShow;
                },
                set: function (value) {
                    this.localShow = value;
                }
            },
        },
        watch: {
            show: function (newValue, oldValue) {
                if (this.dismissAfterSeconds && newValue == true && oldValue == false) {
                    this.dismissCounter();
                }
            }
        },
        mounted(){
            if (this.dismissAfterSeconds) {
                this.dismissCounter();
            }
        },
        methods: {
            dismiss() {
                this.localShow = false;
                this.$root.$emit('dismissed')
            },
            dismissCounter(){
                let dismissCountDown = this.dismissAfterSeconds;
                this.$emit('dismiss-count-down', dismissCountDown);
                let intId = setInterval(() => {
                    if (dismissCountDown < 2 || !this.show) {
                        if (this.show) this.dismiss();
                        clearInterval(intId);
                    } else {
                        dismissCountDown--;
                        this.$emit('dismiss-count-down', dismissCountDown);
                    }
                }, 1000);
            }
        }
    }
</script>
