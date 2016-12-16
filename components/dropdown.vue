<template>
  <div v-if="text" :class="['btn-group', {'dropup' : dropup}]"
       @click="toggle($event)">
        <button type="button" :class="['btn', btnVariant, btnSize, dropdownToggle]" 
        data-toggle="dropdown" 
        aria-haspopup="true" 
        :disabled="disabled" 
        :aria-expanded="show">
          <span v-html="text"></span>
        </button>
        <div :class="['dropdown-menu', {'d-block' : show}]">
          <slot></slot>
        </div>
  </div>
</template>

<script>
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
        this.show = !this.show;
      }
    },
  }
</script>
