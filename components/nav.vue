<template>
  <ul :class="{'nav': true, 'nav-stacked': vertical, 'nav-pills': type == 'pills', 'navbar-nav': type == 'navbar' }">
    <slot></slot>
  </ul>
</template>


<script>

  export default {
    replace: true,
    computed: {},
    props: {
      vertical: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        default: '',
      },
    },
  };

</script>
