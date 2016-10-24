<template>
  <li :class="{'nav-item': true, open: show, dropdown: !dropup, dropup: dropup}" @click.stop="toggle($event)">
    <a :class="['nav-link', dropdownToggle]" href="" v-on:click.prevent="" aria-haspopup="true" :aria-expanded="show" :disabled="disabled" v-if="text" v-html="text">
    </a>
    <slot name="nav-link" v-if="!text">Slot "nav-link"</slot>
    <div :class="{'dropdown-menu': true, 'dropdown-menu-right': rightAlignment}">
      <slot></slot>
    </div>
  </li>
</template>


<script>
  export default {
    data() {
      return {
        show: false
      }
    },
    computed: {
      dropdownToggle() {
        return this.caret ? 'dropdown-toggle' : ''
      }
    },
    props: {
      caret: {
        type: Boolean,
        default: true
      },
      text: {
        type: String,
        default: ''
      },
      dropup: {
        type: Boolean,
        default: false
      },
      rightAlignment: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      class: ['class']
    },
    methods: {
      toggle(e) {
        // return if disabled
        if (this.disabled) return;
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
      hub.$on('hide::dropdown', () => {
        this.show = false
      });
    },
  }
</script>
