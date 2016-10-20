<template>
  <li class="nav-item">
    <a href="#"
       @click.stop.prevent="onclick()"
       :class="['nav-link',active ? 'active' : '',disabled ? 'disabled' : '']">
      <slot></slot>
    </a></li>
</template>

<script>
export default {
    replace: true,
    props: {
      link: {
        type: String,
        default: '',
      },
      active: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      onclick: function () {
        this.$emit('click',this.link);
      },
    },
  }
</script>
