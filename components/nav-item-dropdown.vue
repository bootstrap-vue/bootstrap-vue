<template>
  <li :class="{'nav-item': true, show: show,
               dropdown: !dropup, dropup: dropup}">
    <a @click.stop.prevent="toggle($event)"
       :class="['nav-link', dropdownToggle]"
       href="" aria-haspopup="true"
       :aria-expanded="show"
       :disabled="disabled">
      <slot>{{ text }}</slot>
    </a>
    <div :class="{'dropdown-menu': true, 'dropdown-menu-right': rightAlignment}">
      <slot name="dropdown-menu">Slot "items"</slot>
    </div>
  </li>
</template>


<script>
  export default {
      data() {
          return {
              show: false
          };
      },
      computed: {
          dropdownToggle() {
              return this.caret ? 'dropdown-toggle' : '';
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
          setShow(state) {
              if (this.show === state) {
                  return;
              } // Avoid duplicated emits
              this.show = state;

              if (this.show) {
                  this.$root.$emit('shown::dropdown');
              } else {
                  this.$root.$emit('hidden::dropdown');
              }
          },
          toggle() {
              this.setShow(!this.show);
          },
          clickOut() {
              this.setShow(false);
          },
      },
      created() {
          const hub = this.$root;
          hub.$on('hide::dropdown', () => {
              this.show = false;
          });
      },
      mounted() {
          if (typeof document !== 'undefined') {
              document.documentElement.addEventListener('click', this.clickOut);
          }
      }
  };
</script>
