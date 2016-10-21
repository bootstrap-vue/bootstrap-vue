<template>
  <div :class="classObject" role="alert" v-show="localShow">
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
    replace: true,
    props: {
      show: {
        type: Boolean,
        default: false,
        required: true
      },
      state: {
        type: String,
        default: 'success'
      },
      dismissible: {
        type: Boolean,
        default: false
      },
      dismissAfterSeconds: {
        type: Number,
        default: 0
      },
    },
    computed: {
      classObject() {
        return ['alert', this.alertState, this.dismissible ? 'alert-dismissible' : '', 'fade', 'in',]
      },
      alertState() {
        return !this.state || this.state === `default` ? `alert-success` : `alert-${this.state}`
      },
      show: {
        get: function() {
          return this.localShow;
        },
        set: function(value) {
          this.localShow = value;
        },
      },
    },
    data() {
      return {
        localShow: this.show
      }
    },
    watch: {
      show: function(newValue, oldValue) {
        if (newValue == true && oldValue == false && this.dismissAfterSeconds != null) {
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
          }, 1000)
        }
      }
    },
    methods: {
      dismiss: function dismiss() {
        // hide an alert
        this.localShow = false
        // Emit an event from the current vm that propagates all the way up to its $root
        this.$root.$emit('dismissed::alert')
      },
    }
  }
</script>
