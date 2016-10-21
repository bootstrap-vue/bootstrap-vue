<template>
  <div :id="id" class="collapse">
    <slot></slot>
  </div>
</template>

<script>
  import {csstransitions} from '../utils/helpers.js'
  import '../utils/ie9_polyfill.js'

  // for browsers that do not support transitions like IE9 just change immediately
  const TRANSITION_DURATION = csstransitions() ? 350 : 0;

  // export component object
  export default {
    replace: true,
    props: {
      id: {
        type: String,
        default: '',
      },
      group: {
        type: String,
        default: '',
      }
    },
    methods: {
      show() {
        this.$el.classList.remove('collapse');
        const height = this.$el.scrollHeight;
        this.$el.classList.add('collapsing');
        this.$el.offsetWidth;
        this.$el.style.height = height + 'px';
        this._collapseAnimation = setTimeout(()=> {
          this.$el.classList.remove('collapsing');
          this.$el.classList.add('collapse', 'in')
        }, TRANSITION_DURATION)
      },
      hide() {
        this.$el.classList.remove('collapse');
        this.$el.classList.remove('in');
        this.$el.classList.add('collapsing');
        this.$el.offsetWidth;
        this.$el.style.height = '0px';
        this._collapseAnimation = setTimeout(()=> {
          this.$el.classList.remove('collapsing');
          this.$el.classList.add('collapse')
        }, TRANSITION_DURATION)
      },
    },

    created: function () {
      const hub = this.$root;

      hub.$on('toggled::collapse', (data) => {
        if (data.id && data.id === this.id && !data.group || data.group && data.group === this.group && !data.id) {
          if ((this.$el.className + ' ').indexOf(' in ') > -1) {
            this.hide()
          } else {
            this.show()
          }
        }
      });

      hub.$on('toggled::accordion', (data) => {
        // if id and group id is provided it means it is an accordion and takes priority over all
        if (data.id && data.group && data.group === this.group) {
          // for current element
          if (data.id === this.id) {
            // collapse if selected item is already opened
            if ((this.$el.className + ' ').indexOf(' in ') > -1) {
              this.hide()
            } else {
              this.show()
            }
          } else {
            // ignore if non-selected item is already closed
            if ((this.$el.className + ' ').indexOf(' in ') === -1) return;

            // close all items in the group, and open the one selected
            this.hide()
          }
        }
      });
    },
    destroyed() {
      clearTimeout(this._collapseAnimation)
    }
  };




</script>
