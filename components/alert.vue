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
                dismissed: false,
            }
        },
        computed: {
            classObject() {
                return ['alert', this.alertState, this.dismissible ? 'alert-dismissible' : '']
            },
            alertState() {
                return !this.state || this.state === `default` ? `alert-success` : `alert-${this.state}`
            },
            localShow(){
                return !this.dismissed && (this.show || this.countDownTimerId);
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
            dismissAfterSeconds: {
                type: Number,
                default: null
            },
            show: {
                type: Boolean,
                default: false
            },
        },
        watch: {
            show(){
                this.dismissed = false;
            },
            dismissAfterSeconds(){
                this.dismissed = false;
                this.dismissCounter();
            },
        },
        mounted(){
            if (this.dismissAfterSeconds)
                this.dismissCounter();
        },
        methods: {
            clearCounter(){
                if (this.countDownTimerId)
                    clearInterval(this.countDownTimerId);
            },
            dismiss() {
                this.dismissed = true;
                this.$emit('dismissed');
                this.clearCounter();
            },
            dismissCounter(){
                this.clearCounter();

                let dismissCountDown = this.dismissAfterSeconds;
                this.$emit('dismiss-count-down', dismissCountDown);

                this.countDownTimerId = setInterval(() => {
                    if (dismissCountDown < 2) return this.dismiss();
                    dismissCountDown--;
                    this.$emit('dismiss-count-down', dismissCountDown);
                }, 1000);
            },
        }
    }
</script>
