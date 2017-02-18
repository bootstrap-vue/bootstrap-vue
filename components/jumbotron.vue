<template>
  <div class="jumbotron" :class="{ 'jumbotron-fluid': fluid }">
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
      replace: true,
      computed: {},
      props: {
          fluid: {
              type: Boolean,
              default: false
          }
      }
  };
</script>
