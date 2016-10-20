<template>
  <div class="tabs">
    <ul class="nav nav-tabs">
      <li class="nav-item" v-for="(item,index) in items" @click="setActive(index)">
                <span :class="['nav-link','btn',btnSize,item.active ? 'active' : '',item.disabled ? 'disabled' : '']">
                    {{item.title}}
                </span>
      </li>
    </ul>
    <div class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import {csstransitions} from '../utils/helpers.js'

  // this is directly linked to the bootstrap animation timing in _tabs.scss
  // for browsers that do not support transitions like IE9 just change slide immediately
  const TRANSITION_DURATION = csstransitions() ? 150 : 0;

  // export component object
  export default {
    replace: true,
    data() {
      return {
        items: []
      }
    },
    computed: {
      btnSize() {
        return !this.size || this.size === 'default' ? '' : `btn-${this.size}`
      },
    },
    props: {
      fade: {
        type: Boolean,
        default: true
      },
      size: {
        type: String,
        default: 'md'
      }
    },
    methods: {

      /**
       * get an index of an active tab
       * @return {Number}
       */
      getActive() {
        let active = -1;
        this.items.forEach((item, index) => {
          if (item.active) {
            active = index
          }
        });
        return active
      },

      /**
       * set active tab on the items collection and the child 'tab' component
       */
      setActive(index) {
        // ignore disabled
        if (this.items[index].disabled) return;

        // deactivate previous active tab
        const activeTab = this.getActive();
        if (activeTab !== -1) {
          // setting animate to false will trigger fade out effect
          this.items[activeTab].active = false;
          this.$children[activeTab].$set('animate', false);
          this.$children[activeTab].$set('active', false)
        }

        // set new active tab and animate (if fade flag is set to true)
        this.$children[index].$set('active', true);
        this._tabAnimation = setTimeout(() => {
          // setting animate to true will trigger fade in effect
          this.items[index].active = true;
          this.$children[index].$set('animate', true);
          this.$root.$emit('changed::tab', this.items[index].id)
        }, this.fade ? TRANSITION_DURATION : 0)
      },
    },
    mounted() {
      // if no active tab, set the first one by default
      if (this.getActive() === -1) {
        this.setActive(0)
      }
    },
    destroyed() {
      clearTimeout(this._tabAnimation)
    }
  };


</script>
