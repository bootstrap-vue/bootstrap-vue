<template>
  <div :class="classObject" role="alert" v-show="show">
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
    computed: {
      classObject() {
        return ['alert', this.alertState, this.dismissible ? 'alert-dismissible' : '', 'fade', 'in',]
      },
      alertState() {
        return !this.state || this.state === `default` ? `alert-success` : `alert-${this.state}`
      },
    },
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
    },
    methods: {
      dismiss: function dismiss() {
        // hide an alert
        this.show = false;
        // Emit an event from the current vm that propagates all the way up to its $root
        this.$root.$emit('dismissed::alert')
      },
    }
  }
</script>
