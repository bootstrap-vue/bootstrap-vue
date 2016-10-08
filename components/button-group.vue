<template>
  <div role="group" aria-label="" :class="['btn-group',vertical?'btn-group-vertical':'']">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    replace: true,
    computed: {},
    props: {
      vertical: {
        type: Boolean,
        default: false
      },
    },
  }
</script>
