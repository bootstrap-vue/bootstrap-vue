<template>
  <div>
    <span class="popover-trigger" ref="trigger"><slot></slot></span>

    <div :class="['popover',popoverAlignment]" ref="popover">
      <div class="popover-arrow"></div>
      <h3 class="popover-title" v-if="title">{{title}}</h3>
      <div class="popover-content">
        <span v-html="text" v-if="text"></span>
        <div class="popover-content-wrapper">
          <slot name="content" v-if="!text"></slot>
        </div>
      </div>
    </div>

  </div>
</template>



<script>
  import Tether from 'tether'

  export default {
    replace: true,
    props: {
      position: {
        type: String,
        default: 'top',
      },
      triggers: {
        type: Array,
        default() {
          return ['click', 'focus']
        }
      },
      title: {
        type: String,
        default: '',
      },
      text: {
        type: String,
        default: '',
      },
      show: {
        type: Boolean,
        default: false,
      },
    },
    data() {
        return {
            showState: this.state,
        }
    },
    computed: {
        popoverAlignment() {
            return !this.position || this.position === `default` ? `popover-top` : `popover-${this.position}`
        }
    },
    watch: {
      /**
       * Propogate 'show' property change
       * @param  {Boolean} newShow
       */
      show(newShow) {
        this.showState = newShow;
      },
      /**
       * Affect 'show' state in response to status change
       * @param  {Boolean} newShowState
       */
      showState(newShowState) {
        this.$emit('showChange', newShowState);

        // Dispatch an event from the current vm that propagates all the way up to its $root
        // element is shown
        if (newShowState) {
            let position = null;
            if (this.position === 'bottom') {
                position = {
                    attachment: 'top center',
                    targetAttachment: 'bottom center'
                }
            } else if (this.position === 'left') {
                position = {
                    attachment: 'middle right',
                    targetAttachment: 'middle left'
                }
            } else if (this.position === 'right') {
                position = {
                    attachment: 'middle left',
                    targetAttachment: 'middle right'
                }
            } else {
                position = {
                    attachment: 'bottom center',
                    targetAttachment: 'top center'
                }
            }

            // let tether do the magic, after element is shown
            this._popover.style.display = 'block';
            this._tether = new Tether({
                element: this._popover,
                target: this._trigger,
                attachment: position.attachment,
                targetAttachment: position.targetAttachment,
            });
            this.$root.$emit('shown::popover');

            // element gets hidden
        } else {
            if (this._tether) {
                this._popover.style.display = 'none';
                this._tether.destroy()
            }
            this.$root.$emit('hidden::popover')
        }
      }
    },
    methods: {
      /**
       * Toggle 'show' state
       * @param  {Object} e
       * @param  {Boolean} newState (if set use it's value)
       */
      toggle(e, newState) {
        // change state
        this.show = (typeof newState !== 'undefined') ? newState : !this.show;
      },

      /**
       * Handle multiple event triggers
       * @param  {Object} e
       */
      _eventHandler(e) {
        // if both click and hover are set, on desktop devices click will take precedence
        if ((e.type === 'mouseenter' || e.type === 'mouseleave') && this.triggers.indexOf('click') !== -1) {
          return
        }
        // TODO
        // if both click and focus are set, focus will take precedence
        // if (e.type === 'click' && this.triggers.indexOf('focus') !== -1) {
        //   return
        // }

        // stop propagation to avoid accidental closing on ide::popover event
        e.stopPropagation();

        // hide popover
        if (e.type === 'click') {
          this.toggle(e)
        } else {
          if (e.type === 'mouseenter' || e.type === 'focus') {
            this.toggle(e, true)
          } else {
            this.toggle(e, false)
          }
        }
      }
    },
    created() {
      const hub = this.$root;
      hub.$on('hide::popover', ()=>this.toggle(null, false));
    },
    mounted() {
      // TODO animations

      // configure tether
      this._trigger = this.$refs.trigger.children[0];
      this._popover = this.$refs.popover;
      this._popover.style.display = 'none';
      const _this = this;

      // add listeners for specified triggers anb complementary click event
      this._trigger.addEventListener('click', (e) => _this._eventHandler(e));

      if (this.triggers.indexOf('hover') !== -1) {
        this._trigger.addEventListener('mouseenter', (e) => _this._eventHandler(e));
        this._trigger.addEventListener('mouseleave', (e) => _this._eventHandler(e))
      }
      if (this.triggers.indexOf('focus') !== -1 && this._trigger.tagName.toLowerCase() === 'input') {
        this._trigger.addEventListener('focus', (e) => _this._eventHandler(e));
        this._trigger.addEventListener('blur', (e) => _this._eventHandler(e))
      }
    },
    beforeDestroy() {
      // clean up listeners
      this._trigger.removeEventListener('click', () => _this._eventHandler());
      this._trigger.removeEventListener('mouseenter', () => _this._eventHandler());
      this._trigger.removeEventListener('mouseleave', () => _this._eventHandler());
      this._trigger.removeEventListener('focus', () => _this._eventHandler());
      this._trigger.removeEventListener('blur', () => _this._eventHandler())
    }
  }

</script>
