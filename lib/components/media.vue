<template>
  <div class="media">
    <div :class="[mediaHorizontalAlign,mediaVerticalAlign]" v-if="mediaHorizontalAlign == 'media-left'">
      <slot name="aside"></slot>
    </div>
    <div class="media-body">
      <slot name="body"></slot>
    </div>
    <div :class="[mediaHorizontalAlign,mediaVerticalAlign]" v-if="mediaHorizontalAlign == 'media-right'">
      <slot name="aside"></slot>
    </div>
  </div>
</template>

<script>
  export default {
      replace: true,
      computed: {
          align() {
              return this.position.split(' ');
          },
          mediaVerticalAlign() {
              const verticalAlign = this.align[0];
              return `media-${verticalAlign}`;
          },
          mediaHorizontalAlign() {
              const horizontalAlign = this.align[1];
              return `media-${horizontalAlign}`;
          }
      },
      props: {
          position: {
              type: String,
              default: 'top left'
          }
      }
  };
</script>
