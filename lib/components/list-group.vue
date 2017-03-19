<template>
  <ul :class="{'list-group': true, 'list-group-flush': flush}">
    <slot></slot>
  </ul>
</template>

<script>
export default {
    replace: true,
    props: {
        flush: {
            type: Boolean,
            default: false
        }
    }
};
</script>
