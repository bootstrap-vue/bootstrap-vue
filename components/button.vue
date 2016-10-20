<template>
  <div :class="['btn',btnVariant,btnSize,btnBlock,btnDisabled,inactive?'btn-inactive':'']"
       @click.stop.prevent="onclick"
  >
    <slot></slot>
  </div>
</template>


<script>

  export default {
    replace: true,
    computed: {
      btnBlock() {
        return this.block ? `btn-block` : ``
      },
      btnVariant() {
        return !this.variant || this.variant === `default` ? `btn-secondary` : `btn-${this.variant}`
      },
      btnSize() {
        return !this.size || this.size === `default` ? `` : `btn-${this.size}`
      },
      btnDisabled() {
        return this.disabled ? 'disabled' : ''
      }
    },
    props: {
      block: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      inactive: {
        type: Boolean,
        default: false
      },
      link: {
        type: String,
        default: ''
      },
      role: {
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: 'md'
      },
      variant: {
        type: String,
        default: 'default'
      },
    },
    methods: {
      onclick: function () {
        this.$emit('click',this.link);
      },
    },
  }
</script>
