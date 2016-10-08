<template>
<span :class="['tag',labelVariant,labelType]">
	<slot></slot>
</span>
</template>

<script>
  export default {
    replace: true,
    computed: {
      labelVariant() {
        return !this.variant || this.variant === `default` ? `tag-default` : `tag-${this.variant}`
      },
      labelType() {
        return !this.type ? `` : `tag-${this.type}`
      }
    },
    props: {
      variant: {
        type: String,
        default: 'default'
      },
      type: {
        type: String,
        default: ''
      }
    }
  }
</script>
