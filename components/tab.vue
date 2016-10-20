<template>
  <div role="tabpanel" class="tab-pane" :class="{active: active, disabled: disabled, fade: fade, in: animate}">
    <slot></slot>
  </div>
</template>

<script>
export default {
 replace: true,
    data() {
      return {
        fade: this.$parent.fade,
        animate: false,
      }
    },
    props: {
      id: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      active: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      const items = this.$parent.$get('items');
      items.push({id: this.id, title: this.title, active: this.active, disabled: this.disabled})
    },
}

</script>
