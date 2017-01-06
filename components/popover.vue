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

  // Controls which events are mapped for each named trigger, and the expected popover behavior for each.
  const triggerListeners = {
    click: {click: 'toggle'},
    hover: {mouseenter: 'show', mouseleave: 'hide'},
    focus: {focus: 'show', blur: 'hide'}
  };

  // Subsequent events within the defined timeframe, in milliseconds, will be ignored. Allows for safe stacking of
  // similar event hooks without the popover flickering.
  const debounceMilliseconds = 200;

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
        appliedTriggers: [],
        lastEvent: null
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
      eventHandler(e) {
        // If this event is right after a previous successful event, ignore it
        if (this.lastEvent != false && e.timeStamp <= this.lastEvent + debounceMilliseconds) return;

        // Look up the expected popover action for the event
        for (let trigger in triggerListeners) {
          for (let event in triggerListeners[trigger]) {
            if (event === e.type) {
              let action = triggerListeners[trigger][event];

              // If the expected event action is the opposite of the current state, allow it
              if (action === 'toggle' || (this.showState && action === 'hide') || action === 'show') {
                this.showState = !this.showState;
                this.lastEvent = e.timeStamp;
              }
              return;
            }
          }
        }
      },

      /**
       * Study the 'triggers' component property and apply all selected triggers
       * @param {String, Array} triggers
       */
      updateListeners(triggers) {
        let newTriggers = [];
        let removeTriggers = [];

        // Type cast for when input is string
        if(typeof triggers === 'string') {
          triggers = [triggers];
        }

        // Look for new events not yet mapped (all of them on first load)
        triggers.forEach(item => {
          if (!this.appliedTriggers.includes(item))
            newTriggers.push(item);
        });

        // Disable any removed event triggers
        this.appliedTriggers.forEach(item => {
          if (!triggers.includes(item))
            removeTriggers.push(item);
        });

        // Apply trigger mapping changes
        newTriggers.forEach(item => this.addListener(item));
        removeTriggers.forEach(item => this.removeListener(item));
      },

      /**
       * Add all event hooks for the given trigger
       * @param {String} trigger
       */
      addListener(trigger) {
        for (let item in triggerListeners[trigger]) {
          this._trigger.addEventListener(item, e => this.eventHandler(e));
        }
      },

      /**
       * Remove all event hooks for the given trigger
       * @param {String} trigger
       */
      removeListener(trigger) {
        for (let item in triggerListeners[trigger]) {
          this._trigger.removeEventListener(item, e => this.eventHandler(e));
        }
      },

      /**
       * Remove all event listeners
       */
      removeAllListeners() {
        for (let trigger in this.appliedTriggers) {
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
