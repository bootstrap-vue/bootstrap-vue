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

  const triggerListeners = {
    click: {click: 'toggle'},
    hover: {mouseenter: 'show', mouseleave: 'hide'},
    focus: {focus: 'show', blur: 'hide'}
  };

  export default {
    replace: true,

    props: {
      position: {
        type: String,
        default: 'top',
        validator(value) {
          return ['top', 'bottom', 'left', 'right'].includes(value);
        },
      },
      triggers: {
        type: [String, Array],
        default() {
          return ['click', 'focus']
        },
        validator(value) {
          if (typeof value === 'string') {
            return Object.keys(triggerListeners).includes(value);
          } else if (Array.isArray(value)) {
            let keys = Object.keys(triggerListeners);
            value.forEach(item => {
              if (!keys.includes(item)) return false;
            });
            return true;
          } else return false;
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
        showState: this.show,
        appliedTriggers: []
      }
    },

    computed: {
      popoverAlignment() {
        return !this.position || this.position === `default` ? `popover-top` : `popover-${this.position}`
      },
      positionParameters() {
        switch(this.position) {
          case 'bottom':
            return {
              attachment: 'top center',
              targetAttachment: 'bottom center'
            };
          case 'left':
            return {
              attachment: 'middle right',
              targetAttachment: 'middle left'
            };
          case 'right':
            return {
              attachment: 'middle left',
              targetAttachment: 'middle right'
            };
          default:
            return {
              attachment: 'bottom center',
              targetAttachment: 'top center'
            };
        }
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
        newShowState ? this.showPopover() : this.hidePopover();
      },

      triggers(newTriggers) {
        this.updateListeners(newTriggers);
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
        this.showState = (typeof newState !== 'undefined') ? newState : !this.showState;
      },

      /**
       * Display popover and fire event
       */
      showPopover() {
        // let tether do the magic, after element is shown
        this._popover.style.display = 'block';
        this._tether = new Tether({
          element: this._popover,
          target: this._trigger,
          attachment: this.positionParameters.attachment,
          targetAttachment: this.positionParameters.targetAttachment,
        });
        this.$root.$emit('shown::popover');
      },

      /**
       * Hide popover and fire event
       */
      hidePopover() {
        if (this._tether) {
          this._popover.style.display = 'none';
          this._tether.destroy()
        }
        this.$root.$emit('hidden::popover');
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
        //e.stopPropagation();

        // hide popover
        if (e.type === 'click') {
          this.showState = !this.showState;
        } else {
          if (e.type === 'mouseenter' || e.type === 'focus') {
            this.showState = true;
          } else {
            this.showState = false;
          }
        }
      },

      /**
       * @param {String, Array} triggers
       */
      updateListeners(triggers) {
        let newTriggers = [];
        let removeTriggers = [];

        if(typeof triggers === 'string') {
          triggers = [triggers];
        }

        triggers.forEach(item => {
          if (!this.appliedTriggers.includes(item))
            newTriggers.push(item);
        });

        this.appliedTriggers.forEach(item => {
          if (!triggers.includes(item))
            removeTriggers.push(item);
        });

        newTriggers.forEach(item => this.addListener(item));

        removeTriggers.forEach(item => this.removeListener(item));
      },

      /**
       * @param {String} trigger
       */
      addListener(trigger) {
        for (var item in triggerListeners[trigger]) {
          this._trigger.addEventListener(item.key, e => _this._eventHandler(e));
        };
      },

      /**
       * @param {String} trigger
       */
      removeListener(trigger) {
        for (var item in triggerListeners[trigger]) {
          item => this._trigger.removeEventListener(item.key, e => _this._eventHandler(e));
        };
      },

      removeAllListeners() {
        for (var trigger in this.appliedTriggers) {
          this.removeListener(trigger);
        }
      }
    },

    created() {
      const hub = this.$root;
      hub.$on('hide::popover', ()=> {this.showState = false});
    },

    mounted() {
      // TODO animations

      // configure tether
      this._trigger = this.$refs.trigger.children[0];
      this._popover = this.$refs.popover;
      this._popover.style.display = 'none';
      const _this = this;

      // add listeners for specified triggers and complementary click event
      this.updateListeners(this.triggers);

      // display popover if prop is set on load
      if (this.showState) {
        this.showPopover();
      }
    },

    beforeDestroy() {
      // clean up listeners
      this.removeAllListeners();
    }
  }

</script>
