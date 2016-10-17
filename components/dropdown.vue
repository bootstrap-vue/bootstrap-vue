<template>
  <div :class="{ open: show, dropdown: !dropup, dropup: dropup, 'dropdown-arrow': arrow}"
       @click="toggle($event)">
    <div class="btn-action">
      <button
        id="dLabel"
        :class="['btn',dropdownToggle,btnVariant,btnSize]"
        aria-haspopup="true"
        :aria-expanded="show"
        :disabled="disabled"
        v-if="text">
        <span v-html="text"> </span>
        <span class="caret"> </span>
      </button>
      <div class="button-wrapper">
        <slot name="button" v-if="!text"></slot>
      </div>
    </div>
    <span role="button"><slot> </slot></span>
  </div>
</template>


<script>

  // import dependencies

  // export component object
  export default {
    replace: true,
    data() {
      return {
        show: false
      }
    },
    computed: {
      btnVariant() {
        return !this.variant || this.variant === `default` ? `btn-secondary` : `btn-${this.variant}`
      },
      btnSize() {
        return !this.size || this.size === `default` ? `` : `btn-${this.size}`
      },
      dropdownToggle() {
        return this.caret ? 'dropdown-toggle' : ''
      },
    },
    props: {
      caret: {
        type: Boolean,
        default: true
      },
      arrow: {
        type: Boolean,
        default: false
      },
      text: {
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: 'default'
      },
      variant: {
        type: String,
        default: 'default'
      },
      dropup: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
    },
    methods: {
      toggle(e) {
        // hide an alert
        this.show = !this.show;
        // Dispatch an event from the current vm that propagates all the way up to its $root
        if (this.show) {
          this.$root.$emit('shown::dropdown');
          e.stopPropagation()
        } else {
          this.$root.$emit('hidden::dropdown');
        }
      }
    },
    created: function () {
      const hub = this.$root;
      hub.$on('hide::dropdown', function () {
        this.show = false
      });
    },
  }

</script>
